import { NextResponse } from 'next/server'
import { getAddressForSubscription } from '#/app/actions' // Adjust import path

// Define the expected structure for clarity
interface AccountData {
  address: string
  name?: string | null
  avatar?: string | null
}

export async function GET(request: Request) {
  // Use Request from Next/server
  try {
    // getAddressForSubscription uses cookies() which should work here too
    const accountData: AccountData | null = await getAddressForSubscription()

    if (accountData !== null) {
      return NextResponse.json(accountData) // Return the whole object
    } else {
      return NextResponse.json({ message: 'No account data found for this subscription' }, { status: 404 })
    }
  } catch (error) {
    console.error('API Route GET Error getting account data:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
