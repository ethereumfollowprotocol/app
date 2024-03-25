import { useConnectedProfile, type Profile } from '#/api/actions'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

interface SelectedProfileContextValue {
  selectedProfile: Profile | undefined
  setSelectedProfile: (profile: Profile) => void
}

const SelectedProfileContext = createContext<SelectedProfileContextValue | undefined>(undefined)

export const useSelectedProfile = () => {
  const context = useContext(SelectedProfileContext)
  if (!context) {
    throw new Error('useSelectedProfile must be used within a SelectedProfileProvider')
  }
  return context
}

export const SelectedProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { profile: connectedProfile } = useConnectedProfile()
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>(connectedProfile)

  // Update the selected profile to the connected profile if in the editor page
  useEffect(() => {
    if (router.pathname.includes('/editor')) {
      setSelectedProfile(connectedProfile)
    }
  }, [connectedProfile, router.pathname])

  return (
    <SelectedProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </SelectedProfileContext.Provider>
  )
}
