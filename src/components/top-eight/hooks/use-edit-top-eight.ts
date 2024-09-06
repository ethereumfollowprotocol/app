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

  const { cartItems, addCartItem } = useCart()
  const topEightInCart = useMemo(
    () =>
      cartItems
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
    const topEightRemoved = cartItems.filter(
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

    const address = isAddress(user) ? user : await resolveEnsAddress(user)
    if (editedProfiles.find(profile => profile.address === address)) return
    if (!address) return { user }

    const followState = await getFollowingState(address)

    if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
    addCartItem({ listOp: listOpAddTag(address, 'top8') })
  }

  const onSubmit = async () => {
    if (validTopEightsLength >= 8) return toast.error(t('top eight limit'))
    if (!roles?.isManager) return toast.error(t('not manager'))
    setAddProfileSearch('')

    // const hasMultipleNames =
    //   addProfileSearch.includes(',') ||
    //   addProfileSearch.includes(' ') ||
    //   addProfileSearch.includes('\n')

    // if (hasMultipleNames) {
    //   const namesToAdd = addProfileSearch
    //     .replaceAll(',', ' ')
    //     .replaceAll('\n', ' ')
    //     .split(' ')
    //     .map(name => name.trim())
    //     .filter(name => !!name)

    //   const addedToCart = await Promise.all(namesToAdd.map(async name => await addToCart(name)))

    //   const erroredNames = addedToCart.filter(item => item?.user).map(item => item?.user)
    //   if (erroredNames.length > 0) toast.error(`${t('unresolved')} ${formatError(erroredNames)}`)
    // }

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
