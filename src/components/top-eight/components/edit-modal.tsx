import { HiPlus } from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import Modal from '#/components/modal'
import TopEightProfile from './top-eight-profile'
import LoadingCell from '#/components/loaders/loading-cell'
import CancelButton from '#/components/buttons/cancel-button'
import { useEditTopEight } from '../hooks/use-edit-top-eight'
import PrimaryButton from '#/components/buttons/primary-button'
import type { TopEightProfileType } from '../hooks/use-top-eight'

interface EditModalProps {
  profiles: TopEightProfileType[]
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ profiles, onClose }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { editedProfiles, addProfileSearch, setAddProfileSearch, onSubmit, isTopEightFull, loadingItems } =
    useEditTopEight(profiles)

  return (
    <Modal onCancel={onClose} className='items-start md:pt-[12.5vh]'>
      <div className='flex w-full flex-col items-center gap-4 p-2 md:w-[650px] md:gap-6'>
        <h2 className='text-2xl font-bold'>{t('top eight title')}</h2>
        <div className='flex w-full flex-col items-center gap-4 sm:flex-row'>
          <div className='relative w-full'>
            <input
              type='text'
              id='search'
              name='search'
              spellCheck={false}
              autoComplete='off'
              value={addProfileSearch}
              onSubmit={onSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onSubmit()
                }
              }}
              placeholder={t('search placeholder')}
              onChange={(e) => setAddProfileSearch(e.target.value.trim().toLowerCase())}
              className='border-grey bg-neutral/90 block h-12 w-full truncate rounded-xl border-[3px] pr-12 pl-4 font-medium sm:text-sm'
            />
            <div className='bg-grey absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-sm'>
              <FiSearch />
            </div>
          </div>
          <PrimaryButton onClick={onSubmit} label={t('add')} className='h-12 w-full sm:w-32' />
        </div>
        <p className={cn('text-center font-semibold', isTopEightFull ? 'text-red-400' : 'text-text/40')}>
          {t(isTopEightFull ? 'top eight limit' : 'top eight description')}
        </p>
        <div className='bg-neutral/90 3xs:gap-x-1 flex min-h-[430px] w-full flex-wrap items-start justify-evenly rounded-xl p-2 sm:justify-start md:gap-x-2 md:p-4'>
          {editedProfiles.map((profile, index) => (
            <TopEightProfile profile={profile} isEditing={true} key={index} />
          ))}
          {new Array(loadingItems).fill(1).map((_, i) => (
            <div
              key={`loading ${i}`}
              className='border-grey relative flex h-[186px] w-[144px] flex-col items-center gap-2 rounded-xl border-[3px] border-green-500/50 p-4'
            >
              <LoadingCell className='h-[50px] w-[50px] rounded-full' />
              <LoadingCell className='h-7 w-24 rounded-sm' />
              <LoadingCell className='mt-5 h-9 w-[120px] rounded-sm' />
              <div className='absolute top-1 right-1 rounded-full bg-green-500/50 p-1 text-white'>
                <HiPlus />
              </div>
            </div>
          ))}
          {editedProfiles.length === 0 && <p className='text-text/40 font-semibold italic'>{t('no top eight')}</p>}
        </div>
        <div className='mt-4 flex w-full items-center justify-between'>
          <CancelButton onClick={onClose} />
          <PrimaryButton
            // disabled={isTopEightFull}
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
