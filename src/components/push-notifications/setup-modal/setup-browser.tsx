import Image from 'next/image'
import { useState } from 'react'
import Modal from '#/components/modal'
import PrimaryButton from '#/components/buttons/primary-button'
import IosAddIcon from 'public/assets/icons/ui/ios-add.svg'
import IosShareIcon from 'public/assets/icons/ui/ios-share.svg'
import installApp from 'public/assets/art/install-app.png'
import ShareSafari from 'public/assets/art/share-safari.png'
import addToHomeScreen from 'public/assets/art/add-to-home-screen.png'
import InstallConfirmation from 'public/assets/art/install-confirmation.png'

interface SetupBrowserProps {
  isIOS: boolean
  gifUrl?: string // Optional prop for the GIF URL
}

const SetupBrowser: React.FC<SetupBrowserProps> = ({ isIOS }) => {
  const [open, setOpen] = useState(true)

  const onClose = () => {
    setOpen(false)
    localStorage.setItem('has_seen_setup_modal', 'true')
  }

  if (!open) return null

  return (
    <Modal onCancel={onClose} className='items-center p-2' closeButtonClassName='top-4 right-4'>
      <div className='mx-auto flex max-w-md flex-col items-center p-1'>
        <h1 className='mb-4 w-full text-start text-2xl font-bold'>Download the app</h1>
        <p className='mb-6 text-center'>EFP is a progressive web application. You can install it on your device.</p>
        <div className='bg-nav-item mb-6 w-full rounded-lg p-3'>
          {isIOS ? (
            <div className='flex flex-col items-center justify-center gap-2 text-center'>
              <div className='flex items-center justify-center'>
                <p>Tap the share button</p>
                <IosShareIcon className='mx-1 h-4 w-auto' />
              </div>
              <Image src={ShareSafari} alt='Installation instructions' className='w-full rounded-lg shadow-md' />
              <div className='flex items-center justify-center'>
                and then &quot;Add to Home Screen&quot;
                <IosAddIcon className='mx-1 h-4 w-auto' />.
              </div>
              <Image src={addToHomeScreen} alt='Installation instructions' className='w-full rounded-lg shadow-md' />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center gap-2 text-center'>
              <div className='flex items-center justify-center'>
                <p>Click three dots in top right corner and press &quot;Install app&quot;</p>
              </div>
              <Image src={installApp} alt='Installation instructions' className='w-full rounded-lg shadow-md' />
              <div className='flex items-center justify-center'>Confirm installation</div>
              <Image
                src={InstallConfirmation}
                alt='Installation instructions'
                className='w-full rounded-lg shadow-md'
              />
            </div>
          )}
        </div>
        <PrimaryButton onClick={onClose} label='Got it!' />
      </div>
    </Modal>
  )
}

export default SetupBrowser
