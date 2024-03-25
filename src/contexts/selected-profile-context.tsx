import { useConnectedProfile, type Profile, useProfile } from '#/api/actions'
import { checkAddressOrEnsValid } from '#/lib/utilities'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const EDITOR_PATHNAME = '/editor'
const PROFILE_PATHNAME = '/profile'

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
  const isConnectedProfilePath = pathname.includes(PROFILE_PATHNAME)
  const isProfilePath = checkAddressOrEnsValid(pathname)
  const { profile: connectedProfile } = useConnectedProfile()
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>(connectedProfile)
  const profilePathProfile = useProfile(pathname)

  // Update the selected profile to the connected profile if in the editor page
  useEffect(() => {
    if (pathname.includes(EDITOR_PATHNAME) || isConnectedProfilePath) {
      return setSelectedProfile(connectedProfile)
    }

    // Set the selected profile to the current profile if not in the editor page
    if (isProfilePath && profilePathProfile) {
      return setSelectedProfile(profilePathProfile)
    }

    // Set the selected profile to the connected profile by default
    setSelectedProfile(connectedProfile)
  }, [connectedProfile, pathname, isConnectedProfilePath, isProfilePath, profilePathProfile])

  return (
    <SelectedProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </SelectedProfileContext.Provider>
  )
}
