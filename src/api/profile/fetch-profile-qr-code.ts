export const fetchProfileQRCode = async (addressOrName: string) => {
  const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/qr`

  try {
    const response = await fetch(url).catch((err) => {
      console.error(err)
      return null
    })

    const data = response ? await response.text() : null
    return data
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
