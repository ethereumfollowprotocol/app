export const fetchProfileQRCode = async (addressOrName: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${addressOrName}/qr`, {
      cache: 'default',
    })

    const data = await response.text()
    return data
  } catch (error) {
    console.error('Error fetching profile QR code:', error)
    return null
  }
}
