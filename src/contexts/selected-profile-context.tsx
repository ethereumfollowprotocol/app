import { useConnectedProfile, type Profile } from '#/api/actions'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const EDITOR_PATHNAME = '/editor'

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
  const pathname = usePathname()
  const { profile: connectedProfile } = useConnectedProfile()
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>(connectedProfile)

  // Update the selected profile to the connected profile if in the editor page
  useEffect(() => {
    if (pathname.includes(EDITOR_PATHNAME)) {
      setSelectedProfile(connectedProfile)
    }
  }, [connectedProfile, pathname])

  return (
    <SelectedProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </SelectedProfileContext.Provider>
  )
}
