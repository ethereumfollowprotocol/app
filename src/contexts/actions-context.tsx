'use client'

import type { WriteContractReturnType } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'
import { createContext, useContext, useState, type ReactNode, useCallback, useMemo } from 'react'

export enum EFPActionType {
  CreateEFPList = 'CreateEFPList',
  UpdateEFPList = 'UpdateEFPList'
}

export type Action = {
  id: string
  type: EFPActionType
  /* The label of the action */
  label: string
  /* The chain id associated with the action */
  chainId: number
  /* The transaction hash associated with the action */
  txHash?: `0x${string}`
  /* The action to be executed */
  execute: () => Promise<WriteContractReturnType | undefined>
  /* If the action is pending confirmation */
  isPendingConfirmation: boolean
  /* If the action triggered error */
  isConfirmationError?: boolean
}

type ActionsContextType = {
  actions: Action[]
  addActions: (newActions: Action[]) => void
  allActionsSuccessful: boolean // If all actions' transactions are successful
  currentAction: Action | undefined
  currentActionIndex: number
  executeActionByIndex: (index: number) => void
  moveToNextAction: () => number
  resetActions: () => void
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined)

/**
 * @description Provider for handling bundled actions in the app such as creating and/or updating EFP lists
 */
export const ActionsProvider = ({ children }: { children: ReactNode }) => {
  const [actions, setActions] = useState<Action[]>([])
  const [currentActionIndex, setCurrentActionIndex] = useState(-1)
  const currentAction = actions[currentActionIndex]

  const { isSuccess: currentActionTxIsSuccess } = useWaitForTransactionReceipt({
    hash: currentAction?.txHash,
    chainId: currentAction?.chainId
  })

  const allActionsSuccessful = useMemo(() => {
    return currentActionIndex === actions.length - 1 && currentActionTxIsSuccess
  }, [currentActionIndex, actions.length, currentActionTxIsSuccess])

  /* Adds actions to the context */
  const addActions = useCallback((newActions: Action[]) => {
    setActions(newActions)
    setCurrentActionIndex(0)
  }, [])

  /* Updates an action */
  const updateAction = useCallback(
    (updatedAction: Action) => {
      // Find the index of the action to update
      const index = actions.findIndex(action => action.id === updatedAction.id)
      if (index < 0) return

      // Update the action
      const updatedActions = [...actions]
      updatedActions[index] = updatedAction
      setActions(updatedActions)
    },
    [actions]
  )

  // Moves to the next action to be able to call execute on that action
  const moveToNextAction = useCallback(() => {
    // Calculate the next index
    const nextIndex = currentActionIndex + 1 < actions.length ? currentActionIndex + 1 : -1

    // Update the state based on the calculated next index
    if (nextIndex !== -1) {
      setCurrentActionIndex(nextIndex) // Move to the next action index
    } else {
      setActions([]) // Reset actions if we've reached the end
      setCurrentActionIndex(-1) // Reset the index as well
    }

    // Return the next index for use
    return nextIndex
  }, [currentActionIndex, actions.length])

  // Executes the action based on the index to be able to handle async execution with synchronous state updates
  const executeActionByIndex = useCallback(
    async (index: number) => {
      // Validate the index
      if (index < 0 || index >= actions.length)
        throw new Error(`Action index out of bounds: ${index}`)

      // Get the action to execute
      const actionToExecute = actions[index]
      if (!actionToExecute) throw new Error(`No action found at index: ${index}`)

      // Set the action to pending confirmation
      updateAction({ ...actionToExecute, isPendingConfirmation: true, isConfirmationError: false })

      try {
        const hash = await actionToExecute.execute()
        updateAction({
          ...actionToExecute,
          isPendingConfirmation: false,
          txHash: hash,
          isConfirmationError: false
        })
      } catch (error: any) {
        updateAction({
          ...actionToExecute,
          isPendingConfirmation: false,
          isConfirmationError: true
        })
      }
    },
    [actions, updateAction]
  )

  const resetActions = useCallback(() => {
    setActions([])
    setCurrentActionIndex(0) // Reset to initial state
  }, [])

  const value = {
    actions,
    addActions,
    allActionsSuccessful,
    currentAction,
    currentActionIndex,
    executeActionByIndex,
    moveToNextAction,
    resetActions
  }

  return <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
}

export const useActions = (): ActionsContextType => {
  const context = useContext(ActionsContext)
  if (!context) {
    throw new Error('useActions must be used within an ActionsProvider')
  }
  return context
}
