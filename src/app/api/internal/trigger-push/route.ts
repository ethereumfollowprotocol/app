import { NextResponse } from 'next/server'
import { triggerPushNotificationById } from '#/app/actions' // Adjust import path

// Define expected request body structure based on PushPayload in actions.ts
interface PushPayload {
  title: string
  body: string
  badge?: string | null
  data: {
    address: string
    [key: string]: any
  }
}
interface RequestBody {
  subscriptionId: string
  payload: PushPayload
}

const LITSENER_API_SECRET = process.env.NEXTJS_API_SECRET // Get secret from env

export async function POST(request: Request) {
  if (!LITSENER_API_SECRET) {
    console.error('Trigger Push API Error: NEXTJS_API_SECRET is not set.')
    return NextResponse.json({ success: false, error: 'Internal server configuration error' }, { status: 500 })
  }

  // Authentication
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Missing token' }, { status: 401 })
  }
  const token = authHeader.split(' ')[1]
  if (token !== LITSENER_API_SECRET) {
    return NextResponse.json({ success: false, error: 'Forbidden: Invalid token' }, { status: 403 })
  }

  // Process Request
  try {
    const { subscriptionId, payload } = (await request.json()) as RequestBody

    if (!subscriptionId || !payload || !payload.data?.address) {
      // Ensure minimum payload structure
      return NextResponse.json(
        { success: false, error: 'Missing subscriptionId or valid payload in request body' },
        { status: 400 }
      )
    }

    // Call the server action
    const result = await triggerPushNotificationById(subscriptionId, payload)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      console.error(`Trigger Push API: Failed push for ${subscriptionId}:`, result.error)
      const statusCode = result.error?.includes('expired') ? 410 : 500
      return NextResponse.json({ success: false, error: result.error || 'Failed push' }, { status: statusCode })
    }
  } catch (error) {
    console.error('Trigger Push API: Unexpected error:', error)
    // Check if error is SyntaxError from request.json()
    if (error instanceof SyntaxError) {
      return NextResponse.json({ success: false, error: 'Invalid JSON in request body' }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
