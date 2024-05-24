export const Legend = () => {
  return (
    <div className='flex gap-2 items-center'>
      <p className='font-medium'>legend:</p>
      <div className='flex font-semibold items-center'>
        <div className='p-2 bg-lime-500 rounded-full'>addition</div>
      </div>
      <div className='flex font-semibold items-center'>
        <div className='p-2 bg-salmon-400 rounded-full'>deletion</div>
      </div>
    </div>
  )
}
