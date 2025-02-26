// import { useTranslation } from 'react-i18next'

// import Modal from '#/components/modal'
// import { useCart } from '#/hooks/use-cart'
// import CancelButton from '#/components/buttons/cancel-button'

// interface ClearCartModalProps {
//   closeModal: () => void
// }

// const ClearCartModal: React.FC<ClearCartModalProps> = ({ closeModal }) => {
//   const { resetCart } = useCart()
//   const { t } = useTranslation()

//   return (
//     <Modal onCancel={closeModal}>
//       <div className='flex flex-col gap-8 p-2 sm:max-w-108 sm:p-0'>
//         <div className='flex items-center justify-between'>
//           <h2 className='text-2xl font-bold'>{t('clear cart')}</h2>
//         </div>
//         <p className='px-0 text-lg font-medium sm:px-4'>{t('clear cart message')}</p>
//         <div className='flex justify-between pt-1'>
//           <CancelButton onClick={closeModal} />
//           <button
//             onClick={() => {
//               resetCart()
//               closeModal()
//             }}
//             className='rounded-full bg-red-500 px-6 py-2 text-lg font-bold text-white transition-all hover:scale-110 hover:opacity-75'
//           >
//             {t('clear cart')}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   )
// }

// export default ClearCartModal
