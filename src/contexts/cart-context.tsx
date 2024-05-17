'use client'

import type { Address } from 'viem'
import { hexlify } from '#/lib/utilities'
import { createContext, useContext, useState, type ReactNode, useCallback } from 'react'

import {
  type ListOp,
  isTagListOp,
  listOpAddTag,
  listOpRemoveTag,
  listOpAsHexstring,
  extractAddressAndTag,
  type ListOpTagOpParams
} from '#/types/list-op'
import { useIsEditView } from '#/hooks/use-is-edit-view'

// Define the type for each cart item
type CartItem = {
  listOp: ListOp
}

// Define the type for the context value
type CartContextType = {
  addAddTagToCart: (params: ListOpTagOpParams) => void
  addCartItem: (item: CartItem) => void
  addRemoveTagToCart: (params: ListOpTagOpParams) => void
  cartAddresses: Address[]
  cartItems: CartItem[]
  getAddressesFromCart: () => string[]
  getTagsFromCartByAddress: (address: Address) => string[]
  handleTagClick: (params: ListOpTagOpParams) => void
  hasListOpAddRecord(address: Address): boolean
  hasListOpAddTag(params: ListOpTagOpParams): boolean
  hasListOpRemoveRecord(address: Address): boolean
  hasListOpRemoveTag(params: ListOpTagOpParams): boolean
  removeAddTagFromCart(params: ListOpTagOpParams): void
  removeCartItem: (listOp: ListOp) => void
  removeRemoveTagFromCart(params: ListOpTagOpParams): void
  resetCart: () => void
  totalCartItems: number
}

// Create the context with an initial empty value
const CartContext = createContext<CartContextType | undefined>(undefined)

// Define the type for the provider props
type Props = {
  children: ReactNode
}

// Define the provider component
export const CartProvider: React.FC<Props> = ({ children }: Props) => {
  const isEditView = useIsEditView()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addCartItem = useCallback(
    (item: CartItem) => {
      const exists = cartItems.some(
        cartItem => listOpAsHexstring(cartItem.listOp) === listOpAsHexstring(item.listOp)
      )
      if (!exists) {
        setCartItems(prevItems => [...prevItems, item])
      }
    },
    [cartItems]
  )

  const removeCartItem = (listOp: ListOp) => {
    setCartItems(prevItems =>
      prevItems.filter(item => listOpAsHexstring(item.listOp) !== listOpAsHexstring(listOp))
    )
  }

  const hasListOpAddRecord = useCallback(
    (address: Address): boolean => {
      return cartItems.some(
        cartItem =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 1 &&
          `0x${cartItem.listOp.data.toString('hex')}` === address
      )
    },
    [cartItems]
  )

  const hasListOpRemoveRecord = useCallback(
    (address: Address): boolean => {
      return cartItems.some(
        cartItem =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 2 &&
          `0x${cartItem.listOp.data.toString('hex')}` === address
      )
    },
    [cartItems]
  )

  const hasListOpAddTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean => {
      return cartItems.some(
        cartItem =>
          isTagListOp(cartItem.listOp) &&
          cartItem.listOp.opcode === 3 &&
          extractAddressAndTag(cartItem.listOp).address === address &&
          extractAddressAndTag(cartItem.listOp).tag === tag
      )
    },
    [cartItems]
  )

  const hasListOpRemoveTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean => {
      return cartItems.some(
        cartItem =>
          isTagListOp(cartItem.listOp) &&
          cartItem.listOp.opcode === 4 &&
          extractAddressAndTag(cartItem.listOp).address === address &&
          extractAddressAndTag(cartItem.listOp).tag === tag
      )
    },
    [cartItems]
  )

  const removeAddTagFromCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (hasListOpAddTag({ address, tag })) {
        return removeCartItem(listOpAddTag(address, tag))
      }
    },
    [hasListOpAddTag, removeCartItem]
  )

  const removeRemoveTagFromCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (hasListOpRemoveTag({ address, tag })) {
        return removeCartItem(listOpRemoveTag(address, tag))
      }
    },
    [hasListOpRemoveTag, removeCartItem]
  )

  const addAddTagToCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (!hasListOpAddTag({ address, tag })) {
        return addCartItem({ listOp: listOpAddTag(address, tag) })
      }
    },
    [hasListOpAddTag, addCartItem]
  )

  const addRemoveTagToCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (!hasListOpRemoveTag({ address, tag })) {
        return addCartItem({ listOp: listOpRemoveTag(address, tag) })
      }
    },
    [hasListOpRemoveTag, addCartItem]
  )

  const handleTagClick = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      // Do nothing if not in edit view
      if (!isEditView) return

      // If cart has "add tag" remove it from the cart
      if (hasListOpAddTag({ address, tag })) {
        return removeAddTagFromCart({ address, tag })
      }

      // If cart has "remove tag" remove it from the cart
      if (hasListOpRemoveTag({ address, tag })) {
        return removeRemoveTagFromCart({ address, tag })
      }

      // Add "add tag" to cart if it not in cart
      if (!hasListOpAddRecord(address)) {
        return addAddTagToCart({ address, tag })
      }

      // Add "remove tag" to cart if not in cart
      if (!hasListOpRemoveRecord(address)) {
        return addRemoveTagToCart({ address, tag })
      }
    },
    [
      addAddTagToCart,
      addRemoveTagToCart,
      hasListOpAddRecord,
      hasListOpAddTag,
      hasListOpRemoveRecord,
      hasListOpRemoveTag,
      isEditView,
      removeAddTagFromCart,
      removeRemoveTagFromCart
    ]
  )

  // Retrieves all tags associated with a specific address from the cart items.
  const getTagsFromCartByAddress = useCallback(
    (address: Address): string[] => {
      return cartItems.reduce((tags, { listOp }) => {
        if (isTagListOp(listOp)) {
          const { address: opAddress, tag } = extractAddressAndTag(listOp)
          if (opAddress === address) {
            tags.push(tag)
          }
        }
        return tags
      }, [] as string[])
    },
    [cartItems]
  )

  // Retrieves all unique addresses involved in the cart items.
  const getAddressesFromCart = useCallback((): Address[] => {
    const addresses = cartItems.map(({ listOp }) =>
      isTagListOp(listOp) ? extractAddressAndTag(listOp).address : hexlify(listOp.data)
    )

    return [...new Set(addresses)]
  }, [cartItems])

  // Resets the cart items
  const resetCart = useCallback(() => {
    setCartItems([])
  }, [])

  const totalCartItems = cartItems.length
  const cartAddresses = getAddressesFromCart()

  return (
    <CartContext.Provider
      value={{
        addAddTagToCart,
        addCartItem,
        addRemoveTagToCart,
        cartAddresses,
        cartItems,
        getAddressesFromCart,
        getTagsFromCartByAddress,
        handleTagClick,
        hasListOpAddRecord,
        hasListOpAddTag,
        hasListOpRemoveRecord,
        hasListOpRemoveTag,
        removeAddTagFromCart,
        removeCartItem,
        removeRemoveTagFromCart,
        resetCart,
        totalCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
