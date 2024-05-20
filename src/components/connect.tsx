'use client'

import { useState } from 'react'
import { useAccount, useAccountEffect, useConnect, useDisconnect } from 'wagmi'

import { truncateAddress } from '#/lib/utilities'
import { useEnsProfile } from '#/hooks/use-ens-profile'

export function Connect() {
  const [showDialog, setShowDialog] = useState(false)

  const { disconnect } = useDisconnect()
  const { connectAsync, connectors } = useConnect()
  const { address, connector: currentConnector, status: accountStatus } = useAccount()
  const { data: ensData } = useEnsProfile(address)

  useAccountEffect({
    onDisconnect: () => setShowDialog(false)
  })

  const displayText =
    accountStatus !== 'connected' ? 'Connect' : ensData?.name || truncateAddress(address)

  async function onButtonClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (accountStatus === 'connected') return setShowDialog(true)
    if (accountStatus === 'disconnected') {
      await connectAsync({
        // @ts-expect-error
        connector: currentConnector || connectors.filter(c => c.isAuthorized())[0]
      })
    }
  }

  return (
    <>
      <button
        className='bg-white text-gray-800 tabular-nums p-4 shadow-sm text-[16px] font-bold antialiased justify-around px-3'
        disabled={accountStatus === 'connecting'}
        onClick={onButtonClick}
      >
        <img
          hidden={accountStatus !== 'connected' || !ensData?.avatar}
          src={ensData?.avatar}
          className='w-6 h-6 rounded-full -mr-1'
          alt='ENS avatar'
        />
        {displayText}
        <img
          hidden={accountStatus !== 'connected'}
          className='w-6 h-6 mx-0 -mr-1.5 -ml-2.5'
          src='/assets/arrow-down.svg'
          alt='arrow down'
        />
      </button>
      <WalletMenu
        open={showDialog}
        setOpen={setShowDialog}
        content={
          <button className='mx-auto p-4 font-bold bg-salmon-400' onClick={() => disconnect()}>
            Disconnect
          </button>
        }
      />
    </>
  )
}

function WalletMenu({
  open,
  setOpen,
  content
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: React.ReactNode
}) {
  return (
    <div className='relative'>
      <div onClick={() => setOpen(!open)} className=' flex flex-col items-center justify-center'>
        <div className='bg-black w-4 h-1 rounded-xl'></div>
        <div className='bg-black w-4 h-1 rounded-xl'></div>
        <div className='bg-black w-4 h-1 rounded-xl'></div>
      </div>
      <div className='max-w-36 mx-auto mt-1 top-full left-0 absolute justify-center items-center'>
        {content}
      </div>
    </div>
  )
}
