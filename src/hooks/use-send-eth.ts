import { useCallback } from 'react'
import { useChainId, useSendTransaction, useSwitchChain } from 'wagmi'

const useSendEth = ({
  chainId,
  value,
  to
}: { chainId: number | undefined; value: bigint; to: `0x${string}` | undefined }) => {
  const currentChainId = useChainId()
  const { sendTransactionAsync } = useSendTransaction()
  const { switchChainAsync } = useSwitchChain()

  const sendEth = useCallback(async () => {
    if (!to) throw new Error('No to found')
    if (!chainId) throw new Error('No chain selected')

    if (chainId !== currentChainId) {
      await switchChainAsync({ chainId })
    }

    return await sendTransactionAsync({
      chainId,
      value,
      to
    })
  }, [chainId, currentChainId, switchChainAsync, sendTransactionAsync, to, value])

  return sendEth
}

export default useSendEth
