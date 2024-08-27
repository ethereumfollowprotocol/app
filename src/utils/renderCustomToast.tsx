import { toast } from 'sonner'

const renderCustomToast = (text: string) => {
  toast.custom(() => (
    <div className='glass-card bg-white/95 border-gray-100 dark:border-gray-500 border-[1px] shadow-xl px-6 py-4 min-w-86 rounded-xl right-0 font-medium'>
      {text}
    </div>
  ))
}

export default renderCustomToast
