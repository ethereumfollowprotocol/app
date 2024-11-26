import type { ChainWithDetails } from '#/lib/wagmi'
import { useCallback, useEffect, useState } from 'react'
import { useChainId, useChains, useSwitchChain, useWalletClient } from 'wagmi'

const useChain = () => {
  const { switchChain } = useSwitchChain()
  const initialCurrentChainId = useChainId()
  const { data: walletClient } = useWalletClient()

  const [currentChainId, setCurrentChainId] = useState(initialCurrentChainId)
  const getCurrentChain = useCallback(async () => {
    if (!walletClient) return

    const chainId = await walletClient.getChainId()
    setCurrentChainId(chainId)
  }, [walletClient])

  useEffect(() => {
    getCurrentChain()
  }, [walletClient])

  const checkChain = useCallback(
    async ({
      chainId,
      onSuccess,
      onError
    }: {
      chainId?: number
      onSuccess?: () => void
      onError?: () => void
    }) => {
      if (!chainId) return false
      if (currentChainId === chainId) return true

      await new Promise(resolve =>
        switchChain({ chainId }, { onSuccess, onError, onSettled: resolve })
      )
      return false
    },
    [currentChainId, switchChain]
  )

  const chains = useChains() as unknown as ChainWithDetails[] // TODO: Fix this type issue
  const getChain = (chainId: number | undefined) => chains.find(chain => chain.id === chainId)

  return {
    getChain,
    checkChain,
    currentChainId,
    setCurrentChainId
  }
}

export default useChain
