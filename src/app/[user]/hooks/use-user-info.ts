import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import useUser from './use-user-profile'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { fetchProfileQRCode } from '#/api/profile/fetch-profile-qr-code'

export const useUserInfo = (user: string) => {
  const pathname = usePathname()
  const isMyProfile = useIsEditView()
  const isLoadPage = pathname === '/loading'

  const profileData = useEFPProfile()
  const { listNum, userIsList, ...userData } = useUser(user)

  const selectedData = isMyProfile ? profileData : userData
  const profileIsLoading = isLoadPage || selectedData.profileIsLoading
  const profileList = userIsList
    ? (listNum as number)
    : selectedData.profile?.primary_list
      ? Number(selectedData.profile?.primary_list)
      : undefined

  const { data: qrCode, isLoading: qrCodeIsLoading } = useQuery({
    queryKey: ['qrCode', selectedData.profile],
    queryFn: async () =>
      selectedData.profile?.address ? await fetchProfileQRCode(selectedData.profile.address) : null,
  })

  const refetchProfile = () => {
    if (selectedData.fetchFreshProfile) selectedData.refetchProfile()
    else selectedData.setFetchFreshProfile(true)
  }

  return {
    listNum,
    profileList,
    userIsList,
    qrCode,
    qrCodeIsLoading,
    ...selectedData,
    profileIsLoading,
    refetchProfile,
  }
}
