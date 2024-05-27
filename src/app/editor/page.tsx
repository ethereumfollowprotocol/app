'use client'

import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import { Legend } from './legend'
import { Search } from '#/components/search'
import { useCart } from '#/contexts/cart-context'
import { listOpAddListRecord } from '#/types/list-op'
import { UnconfirmedChanges } from './unconfirmed-changes'
import { Recommendations } from '#/components/recommendations'

export default function EditorPage() {
  const { addCartItem } = useCart()
  const { t } = useTranslation('editor')

  const handleAddFollow = (address: Address) => {
    addCartItem({ listOp: listOpAddListRecord(address) })
  }

  return (
    <main className='flex min-h-full h-full w-full text-center pt-10 xl:gap-6 mt-32 md:mt-40 lg:mt-48 px-4 lg:px-8'>
      <div className='flex flex-col glass-card gap-6 p-6 rounded-2xl border-2 border-gray-200 max-w-116 w-1/3'>
        <h1 className='text-left text-3xl font-bold'>{t('editor')}</h1>
        <div className='flex gap-2'>
          <Search />
          <button
            className='bg-gradient-to-b py-3 px-6 from-kournikova-300 rounded-full to-salmon-400 text-black h-auto'
            onClick={() => handleAddFollow('0x')}
          >
            Add
          </button>
        </div>
        <Recommendations header={t('recommendations')} />
      </div>
      <div className='flex flex-col glass-card rounded-2xl border-2 border-gray-200 gap-4 py-6 px-4 w-2/3'>
        <div className='flex justify-between items-center px-4'>
          <h3 className='font-bold text-2xl'>{t('unc-changes')}</h3>
          <Legend />
        </div>
        <UnconfirmedChanges />
      </div>
    </main>
  )
}
