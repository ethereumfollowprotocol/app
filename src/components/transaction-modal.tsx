import React from 'react'
import { useRouter } from 'next/navigation'
import { useTransactions, TransactionModal as TransactionModalComponent } from '@encrypteddegen/identity-kit'

const TransactionModal = () => {
  const router = useRouter()
  const { setTxModalOpen } = useTransactions()

  return (
    <TransactionModalComponent
      onCartProfileClick={(address) => {
        router.push(`/${address}?ssr=false`)
        setTxModalOpen(false)
      }}
    />
  )
}

export default TransactionModal
