'use client'

import { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react'
import type { WriteContractReturnType } from 'viem'
import { useCart } from './cart-context'

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
  execute: () => Promise<WriteContractReturnType>
  /* If the action is pending confirmation */
  isPendingConfirmation: boolean
  /* If the action triggered error */
  isConfirmationError?: boolean
}

type ActionsContextType = {
  actions: Action[]
  currentAction: Action | undefined
  currentActionIndex: number
  addActions: (newActions: Action[]) => void
  executeCurrentAction: () => void
  moveToNextAction: () => void
  resetActions: () => void
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined)

/**
 * @description Provider for handling bundled actions in the app such as creating and/or updating EFP lists
 */
export const ActionsProvider = ({ children }: { children: ReactNode }) => {
  const { totalCartItems } = useCart()
  const [actions, setActions] = useState<Action[]>([])
  const [currentActionIndex, setCurrentActionIndex] = useState(-1)
  const currentAction = actions[currentActionIndex]

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

  /* Moves to the next action to be able to call execute on that action */
  const moveToNextAction = useCallback(() => {
    // Move to next action
    if (currentActionIndex < actions.length - 1) {
      setCurrentActionIndex(currentActionIndex + 1)
      return
    }

    // Reset or handle completion of all actions
    setActions([])
    setCurrentActionIndex(-1)
  }, [currentActionIndex, actions.length])

  /* Executes the current action */
  const executeCurrentAction = useCallback(async () => {
    // Check if the current action index is valid
    if (currentActionIndex < 0 || currentActionIndex >= actions.length) return

    if (!currentAction) {
      console.error('No action found for index', currentActionIndex)
      return
    }

    // Set the current action to pending confirmation
    updateAction({ ...currentAction, isPendingConfirmation: true })

    try {
      const hash = await currentAction.execute()
      updateAction({ ...currentAction, isPendingConfirmation: false, txHash: hash })
    } catch (error) {
      console.error('Execution error for action', currentActionIndex, error)
      // Handle action failure here
    }
  }, [currentAction, actions.length, currentActionIndex, updateAction])

  const resetActions = useCallback(() => {
    setActions([])
    setCurrentActionIndex(0) // Reset to initial state
  }, [])

  // Clear the actions if nothing in cart
  useEffect(() => {
    if (totalCartItems === 0) {
      resetActions()
    }
  }, [totalCartItems, resetActions])

  const value = {
    actions,
    currentAction,
    currentActionIndex,
    addActions,
    executeCurrentAction,
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
