import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import Modal from '#/components/modal'
import TopEightProfile from './top-eight-profile'
import LoadingCell from '#/components/loaders/loading-cell'
import { useEditTopEight } from '../hooks/use-edit-top-eight'
import PrimaryButton from '#/components/buttons/primary-button'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import Plus from 'public/assets/icons/ui/plus.svg'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'
import { cn } from '#/lib/utilities'
import UserProfilePageTable, { type UserProfilePageTableProps } from '#/components/profile-page-table'

interface EditModalProps {
  profiles: TopEightProfileType[]
  onClose: () => void
  followingListProps: UserProfilePageTableProps
}

const EditModal: React.FC<EditModalProps> = ({ profiles, onClose, followingListProps }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { editedProfiles, addProfileSearch, setAddProfileSearch, onSubmit, isTopEightFull, loadingItems } =
    useEditTopEight(profiles)

  const maxListHeight = Math.ceil(editedProfiles.length / 4)

  return (
    <Modal onCancel={onClose} className='items-start md:pt-[12.5vh]'>
      <div className='flex w-full flex-col items-center gap-6 pt-2 sm:p-2'>
        <h2 className='text-2xl font-bold'>{t('top eight title')}</h2>
        <div className='flex w-full flex-col-reverse gap-4 xl:flex-row'>
          <div
            className='flex w-full flex-col gap-4 xl:overflow-auto xl:px-2'
            style={{ maxHeight: window.innerWidth > 1280 ? `${120 + maxListHeight * 186}px` : 'fit-content' }}
          >
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
                  className='bg-nav-item block h-12 w-full truncate rounded-sm pr-12 pl-4 font-medium sm:text-sm'
                />
                <div className='bg-grey absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-sm'>
                  <MagnifyingGlass />
                </div>
              </div>
              <PrimaryButton onClick={onSubmit} label={t('add')} className='h-12 w-full sm:w-32' />
            </div>
            <UserProfilePageTable {...followingListProps} isTopEight={true} />
          </div>
          <div className='flex min-h-[430px] w-full flex-wrap items-start justify-evenly gap-2 rounded-sm sm:justify-start'>
            <p
              className={cn('w-full py-2 text-center font-semibold', isTopEightFull ? 'text-red-400' : 'text-text/40')}
            >
              {t(isTopEightFull ? 'top eight limit' : 'top eight description')}
            </p>
            {editedProfiles.map((profile, index) => (
              <TopEightProfile profile={profile} isEditing={true} key={index} />
            ))}
            {new Array(loadingItems).fill(1).map((_, i) => (
              <div
                key={`loading ${i}`}
                className='border-grey relative flex h-[186px] w-[144px] flex-col items-center gap-2 rounded-sm border-[3px] border-green-500/50 p-4'
              >
                <LoadingCell className='h-[50px] w-[50px] rounded-full' />
                <LoadingCell className='h-7 w-24 rounded-sm' />
                <LoadingCell className='mt-5 h-9 w-[120px] rounded-sm' />
                <div className='absolute top-1 right-1 rounded-full bg-green-500/50 p-1 text-white'>
                  <Plus />
                </div>
              </div>
            ))}
            {editedProfiles.length === 0 && <p className='text-text/40 font-semibold italic'>{t('no top eight')}</p>}
            <div className='mt-4 flex w-full items-center justify-between'>
              {/* <CancelButton onClick={onClose} /> */}
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
        </div>
      </div>
    </Modal>
  )
}

export default EditModal
