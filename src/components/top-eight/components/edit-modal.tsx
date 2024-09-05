import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import TopEightProfile from './top-eight-profile'
import { useEditTopEight } from '../hooks/use-edit-top-eight'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import { cn } from '#/lib/utilities'
import CancelButton from '#/components/buttons/cancel-button'
import { PrimaryButton } from '#/components/buttons/primary-button'
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

interface EditModalProps {
  profiles: TopEightProfileType[]
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ profiles, onClose }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { editedProfiles, addProfileSearch, setAddProfileSearch, onSubmit, validTopEightsLength } =
    useEditTopEight(profiles)

  return (
    <Modal onCancel={onClose}>
      <div className='w-[696px] p-2 flex items-center flex-col gap-6'>
        <h2 className='text-2xl font-bold'>{t('top eight title')}</h2>
        <div className='relative flex items-center gap-4 w-full'>
          <input
            type='text'
            id='search'
            name='search'
            spellCheck={false}
            autoComplete='off'
            value={addProfileSearch}
            onSubmit={onSubmit}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSubmit()
              }
            }}
            placeholder={t('search placeholder')}
            onChange={e => setAddProfileSearch(e.target.value)}
            className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-[3px] 3 dark:border-zinc-500 pl-4 sm:text-sm bg-white/70 dark:bg-darkGrey/50'
          />
          <div className='absolute w-8 rounded-lg right-[126px] top-2 h-8 flex justify-center items-center bg-zinc-300 dark:bg-zinc-500'>
            <FiSearch />
          </div>
          <PrimaryButton onClick={onSubmit} label={t('add')} className='h-12' />
        </div>
        <p className='dark:text-zinc-400 text-zinc-500 font-semibold'>
          {t(validTopEightsLength >= 8 ? 'top eight limit' : 'top eight description')}
        </p>
        <div
          className={cn(
            'flex items-start bg-white/75 min-h-[418px] dark:bg-darkGrey rounded-xl p-6 flex-wrap w-full gap-3'
          )}
        >
          {editedProfiles.map((profile, index) => (
            <TopEightProfile profile={profile} isEditing={true} key={index} />
          ))}
          {editedProfiles.length === 0 && (
            <p className='italic dark:text-zinc-400 text-zinc-500 font-semibold'>
              {t('no top eight')}
            </p>
          )}
        </div>
        <div className='w-full mt-4 flex justify-between items-center'>
          <CancelButton onClick={onClose} />
          <PrimaryButton
            disabled={validTopEightsLength > 8}
            onClick={() => {
              router.push('/cart')
              onClose()
            }}
            label={t('confirm')}
          />
        </div>
      </div>
    </Modal>
  )
}

export default EditModal
