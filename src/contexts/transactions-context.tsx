// 'use client'

// import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
// import { createContext, useCallback, useContext, useState } from 'react'

// type Transaction = {
//   hash: `0x${string}`
//   chainId: number
//   description: string
// }

// type TransactionsContextType = {
//   transactions: Transaction[]
//   addTransaction: (transaction: Transaction) => void
// }

// // const TransactionsLocalStorageKey = 'efp-transactions'
// const MAX_TRANSACTIONS_STORED = 100

// const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

// export const TransactionsProvider = ({
//   children
// }: {
//   children: React.ReactNode
// }) => {
//   const addRecentTransaction = useAddRecentTransaction()

//   const [transactions, setTransactions] = useState<Transaction[]>([])

//   // Populate transactions from localStorage when component mounts
//   // useEffect(() => {
//   //   if (window === undefined) return

//   //   const storedTransactions = window.localStorage.getItem(TransactionsLocalStorageKey)
//   //   if (storedTransactions) {
//   //     setTransactions(JSON.parse(storedTransactions) as Transaction[])
//   //   }
//   // }, [])

//   const addTransaction = useCallback(
//     (transaction: Transaction) => {
//       setTransactions(prevTransactions => {
//         const exists = prevTransactions.some(tx => tx.hash === transaction.hash)
//         if (exists) return prevTransactions

//         // Add the new transaction and ensure the list does not exceed `MAX_TRANSACTIONS_STORED`
//         const updatedTransactions = [...prevTransactions, transaction].slice(
//           -MAX_TRANSACTIONS_STORED
//         )

//         // Add the transaction to Rainbow
//         addRecentTransaction({
//           hash: transaction.hash,
//           description: transaction.description
//         })

//         return updatedTransactions
//       })
//     },
//     [addRecentTransaction]
//   )

//   // Synchronize the transactions state with local storage on changes,
//   // ensuring that only the most recent transactions are stored.
//   // useEffect(() => {
//   //   if (window === undefined) return
//   //   const recentTransactions = transactions.slice(-MAX_TRANSACTIONS_STORED)
//   //   window.localStorage.setItem(TransactionsLocalStorageKey, JSON.stringify(recentTransactions))
//   // }, [transactions])

//   return (
//     <TransactionsContext.Provider value={{ transactions, addTransaction }}>
//       {children}
//     </TransactionsContext.Provider>
//   )
// }

// export const useTransactions = (): TransactionsContextType => {
//   const context = useContext(TransactionsContext)
//   if (!context) {
//     throw new Error('useTransactions must be used within a TransactionsProvider')
//   }
//   return context
// }
