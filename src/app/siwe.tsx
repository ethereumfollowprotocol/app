import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useChainId, useConnect, useSignMessage } from 'wagmi'
import { useEffect } from 'react'
import { injected } from 'wagmi/connectors'

function Siwe() {
  const { signMessageAsync } = useSignMessage()
  const chainId = useChainId()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { data: session } = useSession()

  const handleLogin = async () => {
    try {
      const callbackUrl = '/protected'
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum into EFP.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await getCsrfToken()
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl
      })
    } catch (error) {
      window.alert(error)
    }
  }

  useEffect(() => {
    if (isConnected && !session) {
      handleLogin()
    }
  }, [isConnected])

  return (
    <button
      onClick={e => {
        e.preventDefault()
        if (isConnected) handleLogin()
        else
          connect({
            chainId,
            connector: injected()
          })
      }}
    >
      Sign-in
    </button>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default Siwe
