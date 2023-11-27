interface ENStateResponse {
  name: string
  address: string
  avatar: string
  display: string
  records: {
    avatar: string
    [key: string]: string
  }
  chains: { [key: string]: string }
  fresh: number
  resolver: string
  errors: { [key: string]: string }
}

export default async function Page({ params }: { params: { user: string } }) {
  const response = await fetch(`https://enstate.rs/n/${params.user}`, { cache: 'default' })
  const data = (await response.json()) as ENStateResponse
  return (
    <main className='font-sans mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll mb-12 px-4 pt-6 text-center'>
      <img src={data['avatar']} alt='env ave' width={200} height={200} className='rounded-xl' />
      <section className='max-w-xl'>
        <pre className='text-left text-black text-clip overflow-clip'>
          {JSON.stringify(data, undefined, 2)}
        </pre>
      </section>
    </main>
  )
}
