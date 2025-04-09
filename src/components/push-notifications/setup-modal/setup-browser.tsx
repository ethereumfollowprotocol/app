import { useState } from 'react'
import Modal from '#/components/modal'

interface SetupBrowserProps {
  isIOS: boolean
}

const SetupBrowser: React.FC<SetupBrowserProps> = ({ isIOS }) => {
  const [open, setOpen] = useState(true)

  const onClose = () => {
    setOpen(false)
    localStorage.setItem('has_seen_setup_modal', 'true')
  }

  if (!open) return null

  return (
    <Modal onCancel={onClose}>
      <h1>Push Notifications</h1>
      <p>
        This app is a progressive web application. You can install it on your device by adding it to your home screen.
      </p>

      {isIOS ? (
        <p>
          To install this app on your device, tap the share button
          <span role='img' aria-label='share icon'>
            {' '}
            ⎋{' '}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role='img' aria-label='plus icon'>
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      ) : (
        <p>
          To install this app on your device, tap the share button
          <span role='img' aria-label='share icon'>
            {' '}
            ⎋{' '}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role='img' aria-label='plus icon'>
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}

      <button onClick={onClose}>Got it!</button>
    </Modal>
  )
}

export default SetupBrowser
