import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import Modal from '#/components/modal'
import TopEightProfile from './top-eight-profile'
import { useEditTopEight } from '../hooks/use-edit-top-eight'
import PrimaryButton from '#/components/buttons/primary-button'
import TopEightLoadingProfile from './top-eight-loading-profile'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'
import UserProfilePageTable, { type UserProfilePageTableProps } from '#/components/profile-page-table'

interface EditModalProps {
  profiles: TopEightProfileType[]
  onClose: () => void
  followingListProps: UserProfilePageTableProps
}

const EditModal: React.FC<EditModalProps> = ({ profiles, onClose, followingListProps }) => {
  const { t } = useTranslation()
  const {
    editedProfiles,
    addProfileSearch,
    setAddProfileSearch,
    onSubmit,
    isTopEightFull,
    loadingItems,
    canConfirm,
    onConfirm,
  } = useEditTopEight(profiles)

  const maxListHeight = Math.ceil(editedProfiles.length / 4)

  return (
    <Modal onCancel={onClose} className='items-start md:pt-[12.5vh]'>
      <div className='flex w-full max-w-[800px] flex-col items-center gap-6 pt-2 sm:p-2 xl:max-w-[1280px]'>
        <h2 className='text-2xl font-bold'>{t('top eight title')}</h2>
        <div className='flex w-full flex-col-reverse gap-4 xl:flex-row'>
          <div
            className='flex w-full flex-col gap-4 xl:overflow-auto xl:px-2'
            style={{
              maxHeight: window.innerWidth > 1280 ? `${120 + maxListHeight * 186}px` : 'fit-content',
              minHeight: '400px',
            }}
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
              <PrimaryButton onClick={onSubmit} label={t('manualAdd.add')} className='h-12 w-full sm:w-32' />
            </div>
            <UserProfilePageTable {...followingListProps} isTopEight={true} />
          </div>
          <div className='flex min-h-[400px] w-full flex-wrap gap-2 rounded-sm'>
            <p
              className={cn(
                'w-full py-2 text-center text-[15px] font-semibold',
                isTopEightFull ? 'text-red-400' : 'text-text/40'
              )}
            >
              {t(isTopEightFull ? 'top eight limit' : 'top eight description')}
            </p>
            {editedProfiles.map((profile, index) => (
              <TopEightProfile profile={profile} isEditing={true} key={index} />
            ))}
            {new Array(loadingItems).fill(1).map((_, i) => (
              <TopEightLoadingProfile key={i} isEditing={true} />
            ))}
            {editedProfiles.length === 0 && (
              <p className='text-text/90 bg-nav-item flex h-[280px] w-full items-center justify-center rounded-sm font-semibold italic'>
                {t('no top eight')}
              </p>
            )}
            <div className='mt-4 flex w-full items-center justify-between'>
              <PrimaryButton
                disabled={!canConfirm}
                onClick={() => {
                  onConfirm()
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
