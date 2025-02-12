import useChain from '#/hooks/use-chain'
import { ChainIcon } from '#/components/chain-icon'

const RequiredTransaction = ({ chainId, transactions = 1 }: { chainId: number; transactions?: number }) => {
  const { getChain } = useChain()
  const chain = getChain(chainId)

  if (!chain) return null

  return (
    <div className='grid grid-cols-2 gap-2'>
      <div className='flex items-center gap-2 justify-self-end'>
        <p className='font-bold'>{transactions} tx</p>
        <ChainIcon chain={chain} className='h-[30px] w-[30px]' />
      </div>
      <p className='justify-self-start'>{chain.name}</p>
    </div>
  )
}

export default RequiredTransaction
