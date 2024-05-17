'use client'

import { Search } from '#/components/search'
import { Recommendations } from '#/app/editor/recommendations'
import { UnconfirmedChanges } from './unconfirmed-changes'
import { Legend } from './legend'

export default function EditorPage() {
  const handleAddFollow = () => {
    console.log('Adding to follow in editor')
  }

  return (
    <main className='flex min-h-full h-full w-full flex-col items-center text-center px-28 pt-10'>
      <div className='flex gap-9 w-full'>
        <div className='flex flex-col gap-4 w-1/3'>
          <h1 className='text-left mb-4 text-3xl font-bold'>Editor</h1>
          <div className='flex g-2'>
            <Search />
            <button
              className='bg-gradient-to-b p-3 from-kournikova-300 rounded-full to-salmon-400 text-black h-auto'
              onClick={handleAddFollow}
            >
              Add
            </button>
          </div>
          <div className='px-6'>
            <Recommendations header='Recommendations' />
          </div>
        </div>
        <div className='flex flex-col gap-4 w-2/3'>
          <div className='flex justify-between items-center mx-5'>
            <h2 className='font-bold'>Unconfirmed Changes</h2>
            <Legend />
          </div>
          <UnconfirmedChanges />
        </div>
      </div>
    </main>
  )
}
