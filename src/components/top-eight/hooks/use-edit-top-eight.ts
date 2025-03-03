import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import { isAddress, type Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { fetchFollowState } from '@encrypteddegen/identity-kit'

import { useCart } from '#/hooks/use-cart'
import { resolveEnsAddress } from '#/utils/ens'
import type { TagListOp } from '#/types/list-op'
import type { TopEightProfileType } from './use-top-eight'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { isTagListOp, listOpAddTag, listOpAddListRecord, extractAddressAndTag } from '#/utils/list-ops'

export const useEditTopEight = (profiles: TopEightProfileType[]) => {
  const [loadingItems, setLoadingItems] = useState(0)

  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { roles, selectedList } = useEFPProfile()

  const { cart, addToCart, hasListOpRemoveRecord } = useCart()
  const topEightInCart = useMemo(
    () =>
      cart
        .filter((listOp) => listOp.opcode === 3 && isTagListOp(listOp) && extractAddressAndTag(listOp).tag === 'top8')
        .map((listOp) => ({
          address: extractAddressAndTag(listOp as TagListOp).address,
        })),
    [cart]
  )

  const [editedProfiles, setEditedProfiles] = useState([...profiles, ...topEightInCart])

  const currentTopEightLength = useMemo(() => {
    const topEightRemoved = cart.filter(
      (listOp) => listOp.opcode === 4 && isTagListOp(listOp) && extractAddressAndTag(listOp).tag === 'top8'
    )
    const removedProfiles = profiles.filter((profile) => hasListOpRemoveRecord(profile.address))
    return editedProfiles.length - topEightRemoved.length - removedProfiles.length
  }, [editedProfiles, cart])
  const isTopEightFull = currentTopEightLength >= 8

  useEffect(() => {
    setEditedProfiles([...profiles].concat(topEightInCart))
  }, [topEightInCart])

  const getFollowingState = async (address: Address) => {
    if (!userAddress) return 'none'

    const followingStatus = await fetchFollowState({
      lookupAddressOrName: address,
      connectedAddress: userAddress,
      list: selectedList,
      type: 'following',
    })

    if (!followingStatus) return 'none'
    if (followingStatus.state.block) return 'blocks'
    if (followingStatus.state.mute) return 'mutes'
    if (followingStatus.state.follow) return 'follows'

    return 'none'
  }

  const addProfileToCart = async (user: string) => {
    if (!roles?.isManager) {
      toast.error(t('not manager'))
      return
    }

    setLoadingItems((prevLoading) => prevLoading + 1)

    const address = isAddress(user) ? user : await resolveEnsAddress(user)
    if (editedProfiles.find((profile) => profile.address.toLowerCase() === address?.toLowerCase()))
      return setLoadingItems((prevLoading) => (prevLoading > 0 ? prevLoading - 1 : prevLoading))

    if (!address) return { unresolved: true }

    const followState = await getFollowingState(address)

    const addCartItems = [listOpAddTag(address, 'top8')]
    if (followState === 'none') addCartItems.push(listOpAddListRecord(address))
    addToCart(addCartItems)
  }

  const [addProfileSearch, setAddProfileSearch] = useState('')
  const onSubmit = async () => {
    if (isTopEightFull) return toast.error(t('top eight limit'))
    if (!roles?.isManager) return toast.error(t('not manager'))

    setAddProfileSearch('')
    const addedToCart = await addProfileToCart(addProfileSearch)
    if (addedToCart?.unresolved) toast.error(`${t('unresolved')} ${addProfileSearch}`)
    setLoadingItems(0)
  }

  return {
    onSubmit,
    loadingItems,
    topEightInCart,
    isTopEightFull,
    editedProfiles,
    addProfileSearch,
    setAddProfileSearch,
  }
}
