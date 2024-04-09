import type { ChainWithDetails } from '#/lib/wagmi'
import { createContext, useContext, useState, type ReactNode, useCallback } from 'react'
import type { WriteContractReturnType } from 'viem'

export enum EFPActionType {
  CreateEFPList = 'CreateEFPList',
  UpdateEFPList = 'UpdateEFPList'
}

export type Action = {
  id: string
  type: EFPActionType
  /* The label of the action */
  label: string
  /* The chain associated with the action */
  chain: ChainWithDetails | null
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
  addOrUpdateAction: (action: Action) => void
  executeAction: (actionId: string) => Promise<void>
  setNextAction: () => void // Function to move to the next action
}

const ActionsContext = createContext<ActionsContextType | undefined>(undefined)

/**
 * @description Provider for handling bundled actions in the app such as creating and/or updating EFP lists
 */
export const ActionsProvider = ({ children }: { children: ReactNode }) => {
  const [actions, setActions] = useState<Action[]>([])
  const [currentActionIndex, setCurrentActionIndex] = useState(0)

  const addOrUpdateAction = (newAction: Action) => {
    setActions(prevActions => {
      const index = prevActions.findIndex(action => action.id === newAction.id)
      if (index > -1) {
        // Update existing action
        const updatedActions = [...prevActions]
        updatedActions[index] = newAction
        return updatedActions
      }

      // Add new action
      return [...prevActions, newAction]
    })
  }

  const executeAction = async (actionId: string) => {
    const action = actions.find(action => action.id === actionId)
    if (!action) {
      console.error('Action not found')
      return
    }

    // Mark action as pending confirmation if isn't already
    addOrUpdateAction({ ...action, isPendingConfirmation: true })

    try {
      const hash = await action.execute()
      addOrUpdateAction({ ...action, txHash: hash })
    } catch (error) {
      console.error('Action execution failed', error)
      addOrUpdateAction({ ...action, isConfirmationError: true })
    } finally {
      // Mark action as not pending anymore
      addOrUpdateAction({ ...action, isPendingConfirmation: false })
    }
  }

  const setNextAction = useCallback(() => {
    setCurrentActionIndex(prevIndex => Math.min(prevIndex + 1, actions.length - 1))
  }, [actions.length])

  const currentAction = actions[currentActionIndex]

  const value = {
    actions,
    currentAction,
    currentActionIndex,
    addOrUpdateAction,
    executeAction,
    setNextAction
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
