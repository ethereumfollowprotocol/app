import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Modal from '#/components/modal'
import { cn } from '#/lib/utilities'
import GraySpinner from '#/components/loaders/gray-spinner'
import Copy from 'public/assets/icons/ui/copy.svg'
import Twitter from 'public/assets/icons/socials/twitter.svg?url'
import Telegram from 'public/assets/icons/socials/telegram.svg?url'
import Discord from 'public/assets/icons/socials/discord.svg?url'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userAddress: string
  generateImage: () => Promise<Blob>
  generateImageUrl: () => string
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  userName,
  userAddress,
  generateImage,
  generateImageUrl,
}) => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCopying, setIsCopying] = useState(false)
  const { t } = useTranslation()

  const imageUrl = `https://app-git-share-top-eight-efp.vercel.app/api/top-eight?user=${userAddress}`
  const profileUrl = `https://efp.app/${userAddress}`
  const shareText = `Check out my Top 8 on Ethereum Follow Protocol!`

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      Promise.all([generateImage()])
        .then(([blob]) => {
          setImageBlob(blob)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Failed to generate image:', error)
          toast.error(t('Failed to generate image'))
          setIsLoading(false)
        })
    }
  }, [isOpen, generateImage, t])

  const copyImageToClipboard = async () => {
    if (!imageBlob) return

    setIsCopying(true)
    try {
      // Convert blob to ClipboardItem
      const item = new ClipboardItem({ 'image/png': imageBlob })
      await navigator.clipboard.write([item])
      toast.success(t('Image copied to clipboard'))
    } catch (error) {
      console.error('Failed to copy image:', error)
      // Fallback: download the image
      if (imageUrl) {
        const a = document.createElement('a')
        a.href = imageUrl
        a.download = `${userName}-top8.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        toast.success(t('Image downloaded'))
      }
    } finally {
      setIsCopying(false)
    }
  }

  const shareOnTwitter = async () => {
    // Open Twitter with the text and image URL
    const tweetText = `${shareText}\n\n${profileUrl}\n\n${imageUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnTelegram = async () => {
    // Open Telegram with the image URL and text
    const telegramText = `${shareText}\n\n${profileUrl}\n\n${imageUrl}`
    const telegramUrl = `https://t.me/share/url?text=${encodeURIComponent(telegramText)}`
    window.open(telegramUrl, '_blank')
  }

  const copyForDiscord = async () => {
    const discordText = `${shareText}\n\n${imageUrl}\n\n${profileUrl}`
    try {
      await navigator.clipboard.writeText(discordText)
      toast.success(t('Text with image link copied to clipboard'))
    } catch (error) {
      console.error('Failed to copy text:', error)
      toast.error(t('Failed to copy'))
    }
  }

  if (!isOpen) return null

  return (
    <Modal onCancel={onClose} className='items-center'>
      <div className='flex max-w-2xl flex-col items-center gap-6 p-4 sm:p-6'>
        <h2 className='text-2xl font-bold'>{t('Share Your Top 8')}</h2>

        {/* Image Preview */}
        <div className='bg-grey relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg'>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <GraySpinner size={48} />
            </div>
          ) : imageUrl ? (
            <Image src={imageUrl} alt='Top 8 Preview' fill className='object-contain' />
          ) : (
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-text/60'>{t('Failed to load image')}</p>
            </div>
          )}
        </div>

        {/* Share Options */}
        <div className='grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4'>
          {/* Copy Image */}
          <button
            onClick={copyImageToClipboard}
            disabled={!imageBlob || isCopying}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg p-4 transition-all',
              'bg-neutral hover:bg-text/5 hover:border-text/10 border-2 border-transparent',
              (!imageBlob || isCopying) && 'cursor-not-allowed opacity-50'
            )}
          >
            <Copy className='h-9 w-9' />
            <span className='text-sm font-medium'>{t('Copy')}</span>
          </button>

          {/* Share on X/Twitter */}
          <button
            onClick={shareOnTwitter}
            disabled={isLoading}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg p-4 transition-all',
              'bg-neutral hover:bg-text/5 hover:border-text/10 border-2 border-transparent',
              isLoading && 'cursor-not-allowed opacity-50'
            )}
          >
            <Image src={Twitter} alt='Twitter' width={36} height={36} />
            <span className='font-medium'>X</span>
          </button>

          {/* Share on Telegram */}
          <button
            onClick={shareOnTelegram}
            disabled={isLoading}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg p-4 transition-all',
              'bg-neutral hover:bg-text/5 hover:border-text/10 border-2 border-transparent',
              isLoading && 'cursor-not-allowed opacity-50'
            )}
          >
            <Image src={Telegram} alt='Telegram' width={36} height={36} />
            <span className='font-medium'>Telegram</span>
          </button>

          {/* Copy for Discord */}
          <button
            onClick={copyForDiscord}
            disabled={isLoading}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg p-4 transition-all',
              'bg-neutral hover:bg-text/5 hover:border-text/10 border-2 border-transparent',
              isLoading && 'cursor-not-allowed opacity-50'
            )}
          >
            <Image src={Discord} alt='Discord' width={36} height={36} />
            <span className='font-medium'>Discord</span>
          </button>
        </div>

        <p className='text-text/60 max-w-md text-center text-sm'>
          {t('Share your Top 8 with friends on social media or copy the image to use anywhere')}
        </p>
      </div>
    </Modal>
  )
}

export default ShareModal
