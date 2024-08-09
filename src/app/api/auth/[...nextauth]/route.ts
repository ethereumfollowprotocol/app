import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          placeholder: '0x0',
          type: 'text'
        },
        signature: {
          label: 'Signature',
          placeholder: '0x0',
          type: 'text'
        }
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials)
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}') as string)

          const nextAuthUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
          if (!nextAuthUrl) {
            return null
          }

          const nextAuthHost = new URL(nextAuthUrl).host
          if (siwe.domain !== nextAuthHost) {
            return null
          }

          if (siwe.nonce !== (await getCsrfToken({ req: { headers: req.headers } }))) {
            return null
          }

          await siwe.verify({ signature: credentials?.signature || '' })
          console.log('test')
          return {
            id: siwe.address
          }
        } catch (e) {
          return null
        }
      }
    })
  ],
  session: { strategy: 'jwt' },

  debug: process.env.NODE_ENV === 'development',

  secret: process.env.NEXAUTH_SECRET,

  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub
      session.user = {
        name: token.sub
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
