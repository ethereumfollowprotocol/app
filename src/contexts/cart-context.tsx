import { listOpAsHexstring, type ListOp } from '#/types/list-op'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Address } from 'viem'

// Define the type for each cart item
type CartItem = {
  listOp: ListOp
}

// Define the type for the context value
type CartContextType = {
  cartItems: CartItem[]
  addCartItem: (item: CartItem) => void
  removeCartItem: (listOp: ListOp) => void
  totalCartItems: number

  hasListOpAddRecord(address: Address): boolean
  hasListOpRemoveRecord(address: Address): boolean
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

  const totalCartItems = cartItems.length

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        totalCartItems,
        hasListOpAddRecord,
        hasListOpRemoveRecord
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
