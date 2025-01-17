import { HiPlus } from 'react-icons/hi'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import Modal from '#/components/modal'
import TopEightProfile from './top-eight-profile'
import { useCart } from '#/contexts/cart-context'
import LoadingCell from '#/components/loaders/loading-cell'
import CancelButton from '#/components/buttons/cancel-button'
import { useEditTopEight } from '../hooks/use-edit-top-eight'
import type { TopEightProfileType } from '../hooks/use-top-eight'
import { PrimaryButton } from '#/components/buttons/primary-button'

interface EditModalProps {
  profiles: TopEightProfileType[]
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ profiles, onClose }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { loadingCartItems } = useCart()
  const { editedProfiles, addProfileSearch, setAddProfileSearch, onSubmit, isTopEightFull } =
    useEditTopEight(profiles)

  return (
    <Modal onCancel={onClose} className='items-start md:pt-[12.5vh]'>
      <div className='w-full md:w-[650px] p-2 flex items-center flex-col gap-4 md:gap-6'>
        <h2 className='text-2xl font-bold'>{t('top eight title')}</h2>
        <div className='flex items-center flex-col sm:flex-row gap-4 w-full'>
          <div className='relative w-full'>
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
              onChange={e => setAddProfileSearch(e.target.value.trim().toLowerCase())}
              className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-[3px] border-grey pl-4 sm:text-sm bg-neutral/90'
            />
            <div className='absolute w-8 rounded-lg right-2 top-2 h-8 flex justify-center items-center bg-grey'>
              <FiSearch />
            </div>
          </div>
          <PrimaryButton onClick={onSubmit} label={t('add')} className='h-12 w-full sm:w-32' />
        </div>
        <p
          className={cn(
            'font-semibold text-center',
            isTopEightFull ? 'text-red-400' : 'text-text/40'
          )}
        >
          {t(isTopEightFull ? 'top eight limit' : 'top eight description')}
        </p>
        <div className='flex items-start justify-evenly sm:justify-start bg-neutral/90 min-h-[430px] rounded-xl p-2 md:p-4 flex-wrap w-full 3xs:gap-x-1 md:gap-x-2'>
          {editedProfiles.map((profile, index) => (
            <TopEightProfile profile={profile} isEditing={true} key={index} />
          ))}
          {new Array(loadingCartItems).fill(1).map((_, i) => (
            <div
              key={`loading ${i}`}
              className='flex flex-col p-4 items-center gap-2 relative border-grey rounded-xl w-[144px] h-[186px] border-[3px] border-green-500/50'
            >
              <LoadingCell className='h-[50px] w-[50px] rounded-full' />
              <LoadingCell className='h-7 w-24 rounded-lg' />
              <LoadingCell className='h-9 w-[120px] mt-5 rounded-lg' />
              <div className='absolute top-1 right-1 p-1 rounded-full text-white bg-green-500/50'>
                <HiPlus />
              </div>
            </div>
          ))}
          {editedProfiles.length === 0 && (
            <p className='italic text-text/40 font-semibold'>{t('no top eight')}</p>
          )}
        </div>
        <div className='w-full mt-4 flex justify-between items-center'>
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
