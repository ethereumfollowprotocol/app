'use client'

import { hexlify } from '#/lib/utilities'
import {
  listOpAsHexstring,
  type ListOp,
  isTagListOp,
  extractAddressAndTag,
  type ListOpTagOpParams,
  listOpAddTag,
  listOpRemoveTag
} from '#/types/list-op'
import { createContext, useContext, useState, type ReactNode, useCallback } from 'react'
import type { Address } from 'viem'

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
  hasListOpAddRecord(address: Address): boolean
  hasListOpAddTag({ address, tag }: { address: Address; tag: string }): boolean
  hasListOpRemoveRecord(address: Address): boolean
  hasListOpRemoveTag({ address, tag }: { address: Address; tag: string }): boolean
  removeAddTagFromCart({ address, tag }: ListOpTagOpParams): void
  removeCartItem: (listOp: ListOp) => void
  removeRemoveTagFromCart({ address, tag }: ListOpTagOpParams): void
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
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addCartItem = (item: CartItem) => {
    const exists = cartItems.some(
      cartItem => listOpAsHexstring(cartItem.listOp) === listOpAsHexstring(item.listOp)
    )
    if (!exists) {
      setCartItems(prevItems => [...prevItems, item])
    }
  }

  const removeCartItem = (listOp: ListOp) => {
    setCartItems(prevItems =>
      prevItems.filter(item => listOpAsHexstring(item.listOp) !== listOpAsHexstring(listOp))
    )
  }

  const hasListOpAddRecord = (address: Address): boolean => {
    return cartItems.some(
      cartItem =>
        cartItem.listOp.version === 1 &&
        cartItem.listOp.opcode === 1 &&
        `0x${cartItem.listOp.data.toString('hex')}` === address
    )
  }

  const hasListOpRemoveRecord = (address: Address): boolean => {
    return cartItems.some(
      cartItem =>
        cartItem.listOp.version === 1 &&
        cartItem.listOp.opcode === 2 &&
        `0x${cartItem.listOp.data.toString('hex')}` === address
    )
  }

  const hasListOpAddTag = ({ address, tag }: { address: Address; tag: string }): boolean => {
    return cartItems.some(
      cartItem =>
        isTagListOp(cartItem.listOp) &&
        cartItem.listOp.opcode === 3 &&
        extractAddressAndTag(cartItem.listOp).address === address &&
        extractAddressAndTag(cartItem.listOp).tag === tag
    )
  }

  const hasListOpRemoveTag = ({ address, tag }: { address: Address; tag: string }): boolean => {
    return cartItems.some(
      cartItem =>
        isTagListOp(cartItem.listOp) &&
        cartItem.listOp.opcode === 4 &&
        extractAddressAndTag(cartItem.listOp).address === address &&
        extractAddressAndTag(cartItem.listOp).tag === tag
    )
  }

  const removeAddTagFromCart = ({ address, tag }: ListOpTagOpParams) => {
    if (hasListOpAddTag({ address, tag })) {
      removeCartItem(listOpAddTag(address, tag))
    }
  }

  const removeRemoveTagFromCart = ({ address, tag }: ListOpTagOpParams) => {
    if (hasListOpRemoveTag({ address, tag })) {
      removeCartItem(listOpRemoveTag(address, tag))
    }
  }

  const addAddTagToCart = ({ address, tag }: ListOpTagOpParams) => {
    if (!hasListOpAddTag({ address, tag })) {
      addCartItem({ listOp: listOpAddTag(address, tag) })
    }
  }

  const addRemoveTagToCart = ({ address, tag }: ListOpTagOpParams) => {
    if (!hasListOpRemoveTag({ address, tag })) {
      addCartItem({ listOp: listOpRemoveTag(address, tag) })
    }
  }

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
        hasListOpAddRecord,
        hasListOpAddTag,
        hasListOpRemoveRecord,
        hasListOpRemoveTag,
        removeAddTagFromCart,
        removeCartItem,
        removeRemoveTagFromCart,
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
