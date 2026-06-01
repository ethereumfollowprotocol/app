'use client'

import { useTheme } from 'next-themes'
import type React from 'react'
import { ENSRecords } from 'ethereum-identity-kit'
import { sha256 } from 'viem'
import { useAccount, useSignTypedData } from 'wagmi'

interface ENSRecordsModalProps {
  name?: string | null
  onClose: () => void
}

const dataURLToBytes = (dataUrl: string): Uint8Array => {
  const base64 = dataUrl.split(',')[1]
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes
}

const ENSRecordsModal: React.FC<ENSRecordsModalProps> = ({ name, onClose }) => {
  const { resolvedTheme } = useTheme()
  const { address: connectedAddress } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()

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

    const result = await response.json()

    return result.url || `https://euc.li/${encodeURIComponent(name)}${type === 'header' ? '/h' : ''}`
  }

  return (
    <ENSRecords
      name={name}
      defaultTab='records'
      darkMode={resolvedTheme === 'dark' || resolvedTheme === 'halloween'}
      onClose={onClose}
      onImageUpload={uploadImage}
    />
  )
}

export default ENSRecordsModal
