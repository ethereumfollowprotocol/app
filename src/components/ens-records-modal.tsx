'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { sha256 } from 'viem'
import { useTheme } from 'next-themes'
import { ENSRecords } from 'ethereum-identity-kit'
import { useAccount, useSignTypedData } from 'wagmi'
import type { SetStateAction, Dispatch } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface ENSRecordsModalProps {
  name?: string | null
  onClose: () => void
  setFetchFreshProfile?: Dispatch<SetStateAction<boolean>> | ((state: boolean) => void)
}

const dataURLToBytes = (dataUrl: string): Uint8Array => {
  const base64 = dataUrl.split(',')[1]
  const binary = atob(base64 || '')
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

const forceRefetchImage = (rawUrl: string) => {
  if (typeof window === 'undefined' || !rawUrl) return

  let target: URL
  try {
    target = new URL(rawUrl, window.location.href)
  } catch {
    return
  }

  const targetKey = `${target.origin}${target.pathname}`
  void fetch(target.toString(), { cache: 'reload', mode: 'no-cors' }).catch(() => {})

  const cacheBust = Date.now().toString()
  for (const img of Array.from(document.images)) {
    const current = img.currentSrc || img.src
    if (!current) continue

    let candidate: URL
    try {
      candidate = new URL(current, window.location.href)
    } catch {
      continue
    }

    if (`${candidate.origin}${candidate.pathname}` !== targetKey) continue

    const refreshed = new URL(target.toString())
    refreshed.searchParams.set('_cb', cacheBust)
    img.src = refreshed.toString()
  }
}

const ENSRecordsModal: React.FC<ENSRecordsModalProps> = ({ name, onClose, setFetchFreshProfile }) => {
  const { resolvedTheme } = useTheme()
  const { address: connectedAddress } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()
  const queryClient = useQueryClient()

  if (!name) return null

  const uploadImage = async (dataURL: string, type: 'avatar' | 'header') => {
    if (!connectedAddress) throw new Error('Connect a wallet to upload ENS profile images')

    const urlHash = sha256(dataURLToBytes(dataURL))
    const expiry = `${Date.now() + 1000 * 60 * 60 * 24 * 7}`
    const sig = await signTypedDataAsync({
      primaryType: 'Upload',
      domain: { name: 'Ethereum Name Service', version: '1' },
      types: {
        Upload: [
          { name: 'upload', type: 'string' },
          { name: 'expiry', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'hash', type: 'string' },
        ],
      },
      message: {
        upload: type,
        expiry,
        name,
        hash: urlHash,
      },
    })

    const response = await fetch(`https://eidk.me/${encodeURIComponent(name)}${type === 'header' ? '/h' : ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expiry,
        dataURL,
        sig,
        unverifiedAddress: connectedAddress,
      }),
    })

    if (!response.ok) {
      if (response.status === 413) throw new Error('File size is too large (max 500KB)')
      if (response.status === 415) throw new Error('Unsupported file type. Use JPG/JPEG.')
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for image to be uploaded to euc.li

    const result = (await response.json()) as { url?: string }
    const finalUrl = result.url || `https://euc.li/${encodeURIComponent(name)}${type === 'header' ? '/h' : ''}`

    forceRefetchImage(finalUrl)

    return finalUrl
  }

  const onSuccess = () => {
    queryClient.refetchQueries({ queryKey: ['profile', name, true] })
    setFetchFreshProfile?.(true)
  }

  const modalRoot = typeof document === 'undefined' ? null : document.getElementById('modal-root')
  if (!modalRoot) return null

  // EFP owns the modal chrome (overlay + backdrop + click-outside-to-close).
  // The ENSRecords component from ethereum-identity-kit renders only its own card
  // content — it deliberately does not provide a fixed overlay of its own.
  return createPortal(
    <div
      className='fixed top-0 left-0 z-100 flex h-screen w-screen justify-center overflow-scroll bg-black/40 px-2 py-12 sm:px-4'
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-neutral mt-12 h-fit min-w-[min(32rem,100%)] overflow-hidden rounded-md'
      >
        <ENSRecords
          name={name}
          defaultTab='records'
          darkMode={resolvedTheme === 'dark' || resolvedTheme === 'halloween'}
          onClose={onClose}
          onImageUpload={uploadImage}
          onSuccess={onSuccess}
        />
      </div>
    </div>,
    modalRoot
  )
}

export default ENSRecordsModal
