'use client'

import * as React from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { useEnsProfile } from '#/hooks/use-ens-profile'
import { useConnect, useAccountEffect, useAccount, useDisconnect } from 'wagmi'
import { truncateAddress } from '#/lib/utilities'

export function Connect() {
  const [showDialog, setShowDialog] = React.useState(false)

  const { disconnect } = useDisconnect()
  const { connect, connectAsync, connectors, status: connectStatus } = useConnect()
  const { address, connector: currentConnector, status: accountStatus } = useAccount()
  const { data: ensData, status: ensStatus, error: ensError } = useEnsProfile(address)

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
    <React.Fragment>
      <Button
        className='bg-white text-gray-800 tabular-nums shadow-sm text-[16px] font-bold antialiased justify-around px-3'
        variant='solid'
        radius='large'
        size='3'
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
      </Button>
      <WalletMenu
        open={showDialog}
        setOpen={setShowDialog}
        content={
          <Button
            size='3'
            className='mx-auto font-bold bg-salmon-400'
            variant='solid'
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        }
      />
    </React.Fragment>
  )
}

function WalletMenu({
  open,
  setOpen,
  content
}: {
  open: boolean
  setOpen: any
  content: React.ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className='bg-black text-white' hidden />
      <Dialog.Content size='1' className='max-w-36 mx-auto justify-center items-center'>
        {content}
      </Dialog.Content>
    </Dialog.Root>
  )
}
