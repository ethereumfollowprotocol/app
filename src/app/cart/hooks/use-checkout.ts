import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useAccount, useChains, useWalletClient } from 'wagmi'

import { splitListOps } from '#/utils/list-ops'
import { Step } from '#/components/checkout/types'
import type { ChainWithDetails } from '#/lib/wagmi'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import type { FollowingResponse } from '#/types/requests'
import { useListOps } from '#/hooks/efp-actions/use-list-ops'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { useCart, type CartItem } from '#/contexts/cart-context'
import { triggerCustomEvent } from '#/utils/trigger-custom-event'
import { useMintEFP } from '../../../hooks/efp-actions/use-mint-efp'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { usePoapModal } from '../../../components/claim-poap-modal/use-poap-modal'
import { refetchState, resetFollowingRelatedQueries } from '#/utils/reset-queries'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'

const useCheckout = () => {
  const {
    actions,
    addActions,
    resetActions,
    handleNextAction,
    setIsCheckingOut,
    handleInitiateActions,
    setIsCorrectChain,
  } = useActions()

  const {
    roles,
    lists,
    profile,
    refetchLists,
    selectedList,
    refetchStats,
    refetchProfile,
    fetchFreshLists,
    fetchFreshStats,
    refetchFollowing,
    fetchFreshProfile,
    setFetchFreshLists,
    setFetchFreshStats,
    refetchFollowingTags,
    setFetchFreshProfile,
    setIsRefetchingProfile,
    setSetNewListAsSelected,
    setIsRefetchingFollowing,
  } = useEFPProfile()

  const chains = useChains()
  const router = useRouter()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { address: userAddress } = useAccount()
  const { getListOpsTransaction } = useListOps()
  const { data: walletClient } = useWalletClient()
  const { cartItems, resetCart, setCartItems } = useCart()
  const { mint, nonce: mintNonce, listHasBeenMinted } = useMintEFP()

  // Set step to initiating transactions if the user has already created their EFP list
  // Selecting the chain is only an option when creating a new EFP list to select List records location
  const [currentStep, setCurrentStep] = useState(selectedList ? Step.InitiateTransactions : Step.SelectChain)

  const [listOpsFinished, setListOpsFinished] = useState(false)
  const [selectedChainId, setSelectedChainId] = useState<number>(DEFAULT_CHAIN.id)
  const [setNewListAsPrimary, setSetNewListAsPrimary] = useState(!lists?.primary_list)
  const selectedChain = chains.find((chain) => chain.id === selectedChainId) as ChainWithDetails

  const listOpTx = useCallback(
    async (items: CartItem[]) => {
      const nonce = selectedList && roles ? roles.listSlot : mintNonce
      const ListRecordsContract =
        selectedList && roles
          ? roles.listRecordsContract
          : selectedChainId
            ? (ListRecordContracts[selectedChainId] as Address)
            : coreEfpContracts.EFPListRecords

      const hash = await getListOpsTransaction({
        nonce,
        items,
        selectedList,
        listRecordsContract: ListRecordsContract,
      })

      setListOpsFinished(true)
      if (hash) {
        setCartItems(cartItems.filter((item) => !items.includes(item)))
        queryClient.invalidateQueries({ queryKey: ['following'] })
        queryClient.invalidateQueries({ queryKey: ['profile'] })
      }

      // return transaction hash to enable following transaction status in transaction details component
      return hash
    },
    [selectedChain, selectedList, walletClient]
  )

  const setActions = useCallback(async () => {
    // getting the chain ID where the list operations will be performed (selected chain ID if EFP list minted before)
    const chainId = selectedList ? roles?.listChainId : selectedChain?.id
    if (!chainId) return

    const splitCartItems = splitListOps(cartItems, chainId)
    const cartItemActions: Action[] = splitCartItems.map((listOps, i) => ({
      id: `${EFPActionType.UpdateEFPList} ${i}`, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: `${listOps.length} ${listOps.length === 1 ? t('list op') : t('list ops')}`,
      chainId,
      execute: async () => await listOpTx(listOps),
      isPendingConfirmation: false,
    }))

    const createEFPListAction: Action = {
      id: EFPActionType.CreateEFPList, // Unique identifier for the action
      type: EFPActionType.CreateEFPList,
      label: 'create list',
      chainId: DEFAULT_CHAIN.id, // Chain ID where main contracts are stored at
      execute: async () => await mint({ selectedChainId, setNewListAsPrimary }),
      isPendingConfirmation: false,
    }

    // add Create list action if user doesn't have a List yet
    const actionsToExecute = selectedList
      ? [...cartItemActions]
      : listOpsFinished
        ? [createEFPListAction]
        : [...cartItemActions, createEFPListAction]
    addActions(actionsToExecute)
  }, [selectedChainId, setNewListAsPrimary, listOpTx])

  useEffect(() => {
    setActions()
  }, [setActions])

  // Move to the next step
  const moveToInitiateTransactions = useCallback(() => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }, [selectedChain])

  const onInitiateActions = () => handleInitiateActions(() => setCurrentStep(Step.TransactionStatus))
  const onNextAction = () =>
    handleNextAction(() => {
      setIsCorrectChain(true)
      setCurrentStep(Step.InitiateTransactions)
    })

  const onFinish = useCallback(() => {
    // Track event for mobile or desktop (not essential)
    triggerCustomEvent(listHasBeenMinted ? 'Mint' : 'Checkout')

    refetchState(fetchFreshStats, setFetchFreshStats, refetchStats)
    setIsRefetchingFollowing(true)
    resetFollowingRelatedQueries(queryClient)

    if (listHasBeenMinted || selectedList === undefined) {
      if (setNewListAsPrimary) queryClient.invalidateQueries({ queryKey: ['profile', userAddress, undefined] })

      setIsRefetchingProfile(true)
      setSetNewListAsSelected(true)

      refetchState(fetchFreshLists, setFetchFreshLists, refetchLists)
      refetchState(fetchFreshProfile, setFetchFreshProfile, refetchProfile)

      router.push('/loading')
      return
    }

    // Clear up following pages to start fetching new ones from the beginning
    queryClient.setQueryData(
      ['following', userAddress, selectedList],
      (prev: { pages: FollowingResponse[][]; pageParams: number[] }) => ({
        pages: prev?.pages?.slice(0, 1),
        pageParams: prev?.pageParams?.slice(0, 1),
      })
    )

    refetchFollowing()
    refetchFollowingTags()

    resetCart()
    resetActions()
    router.push(`/${selectedList ?? userAddress}`)
    setIsCheckingOut(false)
  }, [resetActions, resetCart, setNewListAsPrimary])

  const { poapLink, poapLoading, claimPoapModalOpen, setClaimPoapModalOpen } = usePoapModal(userAddress)
  const openPoapModal = useCallback(() => {
    if (listHasBeenMinted && lists?.lists?.length === 0 && !!profile?.ens.name) setClaimPoapModalOpen(true)
  }, [listHasBeenMinted])

  return {
    chains,
    actions,
    onFinish,
    poapLink,
    currentStep,
    poapLoading,
    openPoapModal,
    setCurrentStep,
    selectedChain,
    selectedChainId,
    claimPoapModalOpen,
    setSelectedChainId,
    handleChainClick: setSelectedChainId,
    setClaimPoapModalOpen,
    onInitiateActions,
    moveToInitiateTransactions,
    onNextAction,
    setNewListAsPrimary,
    setSetNewListAsPrimary,
  }
}

export default useCheckout
