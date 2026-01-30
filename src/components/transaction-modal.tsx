import React from 'react'
import { useRouter } from 'next/navigation'
import { useTransactions, TransactionModal as TransactionModalComponent } from 'ethereum-identity-kit'

const TransactionModal = () => {
  const router = useRouter()
  const { setTxModalOpen } = useTransactions()

  return (
    <TransactionModalComponent
      showPoapClaim={false}
      onCartProfileClick={(address) => {
        router.push(`/${address}?ssr=false`)
        setTxModalOpen(false)
      }}
    />
  )
}

export default TransactionModal
