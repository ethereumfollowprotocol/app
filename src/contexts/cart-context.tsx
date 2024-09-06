'use client'

import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { hexlify } from '#/lib/utilities'
import { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from 'react'

import {
  isTagListOp,
  listOpAddTag,
  listOpRemoveTag,
  listOpAsHexstring,
  extractAddressAndTag
} from '#/utils/list-ops'
import type { ImportPlatformType } from '#/types/common'
import type { ListOp, ListOpTagOpParams } from '#/types/list-op'

// Define the type for each cart item
export type CartItem = {
  listOp: ListOp
  import?: ImportPlatformType
}

type StoredCartItem = {
  opcode: number
  version: number
  address: Address
  tag?: string
  import?: ImportPlatformType
}

// Define the type for the context value
type CartContextType = {
  addAddTagToCart: (params: ListOpTagOpParams) => void
  addCartItem: (item: CartItem) => void
  addRemoveTagToCart: (params: ListOpTagOpParams) => void
  cartAddresses: Address[]
  // socialAddresses: Record<string, Address[]>
  socialAddresses: {
    farcaster: Address[]
  }
  cartItems: CartItem[]
  setCartItems: (items: CartItem[]) => void
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
  const { address } = useAccount()

  const storedCartItems =
    typeof window !== 'undefined' && localStorage.getItem('cart')
      ? (JSON.parse(localStorage.getItem('cart') || '') as StoredCartItem[])
      : []
  const transformedStoredCartItems =
    storedCartItems.length > 0
      ? storedCartItems.map(item => ({
          listOp: {
            opcode: item.opcode,
            version: item.version,
            data: item.tag
              ? Buffer.concat([
                  // @ts-ignore
                  Buffer.from(item.address.slice(2), 'hex'),
                  // @ts-ignore
                  Buffer.from(item.tag, 'utf8')
                ])
              : Buffer.from(item.address.slice(2), 'hex')
          },
          import: item.import
        }))
      : []

  const [cartItems, setCartItems] = useState<CartItem[]>(transformedStoredCartItems)

  useEffect(() => {
    if (!address) return

    const transformedCartItems = cartItems.map(({ listOp, import: platform }) => {
      if (isTagListOp(listOp)) {
        const { address, tag } = extractAddressAndTag(listOp)
        return {
          opcode: listOp.opcode,
          version: listOp.version,
          address,
          tag,
          import: platform
        }
      }

      return {
        opcode: listOp.opcode,
        version: listOp.version,
        address: hexlify(listOp.data),
        import: platform
      }
    })

    localStorage.setItem('cart', JSON.stringify(transformedCartItems))
    localStorage.setItem('cart address', address)
  }, [cartItems])

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
    (address: Address): boolean =>
      cartItems.some(
        cartItem =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 1 &&
          `0x${cartItem.listOp.data.toString('hex')}`.toLowerCase() === address?.toLowerCase()
      ),
    [cartItems]
  )

  const hasListOpRemoveRecord = useCallback(
    (address: Address): boolean =>
      cartItems.some(
        cartItem =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 2 &&
          `0x${cartItem.listOp.data.toString('hex')}`.toLowerCase() === address?.toLowerCase()
      ),
    [cartItems]
  )

  const hasListOpAddTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean =>
      cartItems.some(
        cartItem =>
          isTagListOp(cartItem.listOp) &&
          cartItem.listOp.opcode === 3 &&
          extractAddressAndTag(cartItem.listOp).address.toLowerCase() === address?.toLowerCase() &&
          extractAddressAndTag(cartItem.listOp).tag === tag
      ),
    [cartItems]
  )

  const hasListOpRemoveTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean =>
      cartItems.some(
        cartItem =>
          isTagListOp(cartItem.listOp) &&
          cartItem.listOp.opcode === 4 &&
          extractAddressAndTag(cartItem.listOp).address.toLowerCase() === address?.toLowerCase() &&
          extractAddressAndTag(cartItem.listOp).tag === tag
      ),
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
      // if (!isEditView) return

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
          if (opAddress.toLowerCase() === address.toLowerCase()) {
            tags.push(tag)
          }
        }
        return tags
      }, [] as string[])
    },
    [cartItems]
  )

  // Retrieves all unique addresses involved in the cart items.
  const getAddressesFromCart = useCallback(
    (platform?: ImportPlatformType): Address[] => {
      const addresses = cartItems
        .filter(item => item.import === platform)
        .map(({ listOp }) =>
          isTagListOp(listOp) ? extractAddressAndTag(listOp).address : hexlify(listOp.data)
        )

      return [...new Set(addresses)]
    },
    [cartItems]
  )

  // Resets the cart items
  const resetCart = () => {
    setCartItems([])
  }

  const totalCartItems = cartItems.length
  const cartAddresses = getAddressesFromCart()
  const socialAddresses = {
    farcaster: getAddressesFromCart('farcaster')
    // lens: getAddressesFromCart('lens')
  }

  return (
    <CartContext.Provider
      value={{
        addAddTagToCart,
        addCartItem,
        addRemoveTagToCart,
        cartAddresses,
        socialAddresses,
        cartItems,
        setCartItems,
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
