import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import { isAddress, type Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'

import {
  isTagListOp,
  listOpAddTag,
  listOpAddListRecord,
  extractAddressAndTag
} from '#/utils/list-ops'
import { resolveEnsAddress } from '#/utils/ens'
import type { TagListOp } from '#/types/list-op'
import { useCart } from '#/contexts/cart-context'
import { fetchFollowState } from '#/api/fetchFollowState'
import type { TopEightProfileType } from './use-top-eight'
import { useEFPProfile } from '#/contexts/efp-profile-context'

export const useEditTopEight = (profiles: TopEightProfileType[]) => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { roles, selectedList } = useEFPProfile()

  const { cartItems, addCartItem, setLoadingCartItems } = useCart()
  const topEightInCart = useMemo(
    () =>
      Array.from(cartItems.values())
        .filter(
          ({ listOp }) =>
            listOp.opcode === 3 &&
            isTagListOp(listOp) &&
            extractAddressAndTag(listOp).tag === 'top8'
        )
        .map(({ listOp }) => ({
          address: extractAddressAndTag(listOp as TagListOp).address
        })),
    [cartItems]
  )

  const [editedProfiles, setEditedProfiles] = useState([...profiles, ...topEightInCart])

  const validTopEightsLength = useMemo(() => {
    const topEightRemoved = Array.from(cartItems.values()).filter(
      ({ listOp }) =>
        listOp.opcode === 4 && isTagListOp(listOp) && extractAddressAndTag(listOp).tag === 'top8'
    )

    return editedProfiles.length - topEightRemoved.length
  }, [editedProfiles])

  useEffect(() => {
    setEditedProfiles([...profiles, ...topEightInCart])
  }, [topEightInCart])

  const [addProfileSearch, setAddProfileSearch] = useState('')

  const getFollowingState = async (address: Address) => {
    const followingStatus = await fetchFollowState({
      address: address,
      userAddress,
      list: selectedList,
      type: 'following'
    })

    if (!followingStatus) return 'none'

    if (followingStatus.state.block) return 'blocks'
    if (followingStatus.state.mute) return 'mutes'
    if (followingStatus.state.follow) return 'follows'

    return 'none'
  }

  const addToCart = async (user: string) => {
    if (!roles?.isManager) {
      toast.error(t('not manager'))
      return
    }

    setLoadingCartItems(prevLoading => prevLoading + 1)

    const address = isAddress(user) ? user : await resolveEnsAddress(user)
    if (editedProfiles.find(profile => profile.address.toLowerCase() === address?.toLowerCase()))
      return setLoadingCartItems(prevLoading => (prevLoading > 0 ? prevLoading - 1 : prevLoading))

    if (!address) {
      setLoadingCartItems(prevLoading => (prevLoading > 0 ? prevLoading - 1 : prevLoading))
      return { user }
    }

    const followState = await getFollowingState(address)

    if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
    addCartItem({ listOp: listOpAddTag(address, 'top8') })

    setLoadingCartItems(prevLoading => (prevLoading > 0 ? prevLoading - 1 : prevLoading))
  }

  const onSubmit = async () => {
    if (validTopEightsLength >= 8) return toast.error(t('top eight limit'))
    if (!roles?.isManager) return toast.error(t('not manager'))

    setAddProfileSearch('')
    const addedToCart = await addToCart(addProfileSearch)
    if (addedToCart?.user) toast.error(`${t('unresolved')} ${addProfileSearch}`)
  }

  return {
    onSubmit,
    topEightInCart,
    editedProfiles,
    addProfileSearch,
    setAddProfileSearch,
    validTopEightsLength
  }
}
