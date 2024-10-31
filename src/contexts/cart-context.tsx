"use client";

import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useAccount } from "wagmi";
import type { Address } from "viem";

import type { ImportPlatformType } from "#/types/common";
import type { ListOp, ListOpTagOpParams } from "#/types/list-op";
import { isTagListOp, listOpAddTag, listOpRemoveTag, extractAddressAndTag } from "#/utils/list-ops";

// Define the type for each cart item
export type CartItem = {
  listOp: ListOp;
  import?: ImportPlatformType;
};

// Define the type for the context value
type CartContextType = {
  addAddTagToCart: (params: ListOpTagOpParams) => void;
  addCartItem: (item: CartItem) => void;
  addRemoveTagToCart: (params: ListOpTagOpParams) => void;
  cartAddresses: Address[];
  socialAddresses: {
    farcaster: Address[];
  };
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  loadingCartItems: number;
  setLoadingCartItems: Dispatch<SetStateAction<number>>;
  getAddressesFromCart: () => string[];
  getTagsFromCartByAddress: (address: Address) => string[];
  // handleTagClick: (params: ListOpTagOpParams) => void;
  hasListOpAddRecord(address: Address): boolean;
  hasListOpAddTag(params: ListOpTagOpParams): boolean;
  hasListOpRemoveRecord(address: Address): boolean;
  hasListOpRemoveTag(params: ListOpTagOpParams): boolean;
  removeAddTagFromCart(params: ListOpTagOpParams): void;
  removeCartItem: (listOp: ListOp) => void;
  removeRemoveTagFromCart(params: ListOpTagOpParams): void;
  resetCart: () => void;
  totalCartItems: number;
};

// Create the context with an initial empty value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the type for the provider props
type Props = {
  children: ReactNode;
};

// Define the provider component
export const CartProvider: React.FC<Props> = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCartItems, setLoadingCartItems] = useState<number>(0);

  const { address } = useAccount();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCartItemsJson = localStorage.getItem("cart items");
    if (storedCartItemsJson) {
      try {
        const storedCartItems = JSON.parse(storedCartItemsJson) as CartItem[];
        setCartItems(storedCartItems);
      } catch (error) {
        localStorage.removeItem("cart items");
      }
    }
  }, []);

  useEffect(() => {
    if (!address) return;
    if (typeof window === "undefined") return;

    const updateLocalStorageTimeout = setTimeout(() => {
      localStorage.setItem("cart items", JSON.stringify(cartItems));
      localStorage.setItem("cart address", address);
    }, 500);

    return () => clearTimeout(updateLocalStorageTimeout);
  }, [cartItems, address]);

  // const saveCartToLocalStorage = (addr: Address) => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("cart", JSON.stringify(defferedCartItems));
  //     localStorage.setItem("cart address", addr);
  //   }
  // };

  // useEffect(() => {
  //   if (!address) return;
  //   saveCartToLocalStorage(address);
  // }, [address, defferedCartItems]);

  const addCartItem = useCallback(
    (item: CartItem) => {
      const exists = cartItems.some(
        (cartItem) => cartItem.listOp.data.toLowerCase() === item.listOp.data.toLowerCase()
      );
      if (!exists) setCartItems((prevItems) => [...prevItems, item]);
      setLoadingCartItems((prevLoading) => (prevLoading > 0 ? prevLoading - 1 : prevLoading));
    },
    [cartItems]
  );

  const removeCartItem = (listOp: ListOp) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.listOp.data.toLowerCase() !== listOp.data.toLowerCase())
    );
  };

  const hasListOpAddRecord = useCallback(
    (address: Address): boolean =>
      cartItems.some(
        (cartItem) =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 1 &&
          cartItem.listOp.data.toLowerCase() === address?.toLowerCase()
      ),
    [cartItems]
  );

  const hasListOpRemoveRecord = useCallback(
    (address: Address): boolean =>
      cartItems.some(
        (cartItem) =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 2 &&
          cartItem.listOp.data.toLowerCase() === address?.toLowerCase()
      ),
    [cartItems]
  );

  const hasListOpAddTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean =>
      cartItems.some((cartItem) => {
        if (!isTagListOp(cartItem.listOp)) return false;

        const { address: opAddress, tag: opTag } = extractAddressAndTag(cartItem.listOp);
        return (
          cartItem.listOp.opcode === 3 &&
          opAddress.toLowerCase() === address?.toLowerCase() &&
          opTag === tag
        );
      }),
    [cartItems]
  );

  const hasListOpRemoveTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean =>
      cartItems.some((cartItem) => {
        if (!isTagListOp(cartItem.listOp)) return false;

        const { address: opAddress, tag: opTag } = extractAddressAndTag(cartItem.listOp);
        return (
          cartItem.listOp.opcode === 4 &&
          opAddress.toLowerCase() === address?.toLowerCase() &&
          opTag === tag
        );
      }),
    [cartItems]
  );

  const removeAddTagFromCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (hasListOpAddTag({ address, tag })) {
        return removeCartItem(listOpAddTag(address, tag));
      }
    },
    [hasListOpAddTag, removeCartItem]
  );

  const removeRemoveTagFromCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (hasListOpRemoveTag({ address, tag })) {
        return removeCartItem(listOpRemoveTag(address, tag));
      }
    },
    [hasListOpRemoveTag, removeCartItem]
  );

  const addAddTagToCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (!hasListOpAddTag({ address, tag })) {
        return addCartItem({ listOp: listOpAddTag(address, tag) });
      }
    },
    [hasListOpAddTag, addCartItem]
  );

  const addRemoveTagToCart = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      if (!hasListOpRemoveTag({ address, tag })) {
        return addCartItem({ listOp: listOpRemoveTag(address, tag) });
      }
    },
    [hasListOpRemoveTag, addCartItem]
  );

  // const handleTagClick = useCallback(
  //   ({ address, tag }: ListOpTagOpParams) => {
  //     // Do nothing if not in edit view
  //     // if (!isEditView) return

  //     // If cart has "add tag" remove it from the cart
  //     if (hasListOpAddTag({ address, tag })) {
  //       return removeAddTagFromCart({ address, tag });
  //     }

  //     // If cart has "remove tag" remove it from the cart
  //     if (hasListOpRemoveTag({ address, tag })) {
  //       return removeRemoveTagFromCart({ address, tag });
  //     }

  //     // Add "add tag" to cart if it not in cart
  //     if (!hasListOpAddRecord(address)) {
  //       return addAddTagToCart({ address, tag });
  //     }

  //     // Add "remove tag" to cart if not in cart
  //     if (!hasListOpRemoveRecord(address)) {
  //       return addRemoveTagToCart({ address, tag });
  //     }
  //   },
  //   [
  //     addAddTagToCart,
  //     addRemoveTagToCart,
  //     hasListOpAddRecord,
  //     hasListOpAddTag,
  //     hasListOpRemoveRecord,
  //     hasListOpRemoveTag,
  //     removeAddTagFromCart,
  //     removeRemoveTagFromCart,
  //   ]
  // );

  // Retrieves all tags associated with a specific address from the cart items.
  const getTagsFromCartByAddress = useCallback(
    (address: Address): string[] => {
      return cartItems.reduce((tags, { listOp }) => {
        if (isTagListOp(listOp)) {
          const { address: opAddress, tag } = extractAddressAndTag(listOp);
          if (opAddress.toLowerCase() === address.toLowerCase()) {
            tags.push(tag);
          }
        }
        return tags;
      }, [] as string[]);
    },
    [cartItems]
  );

  // Retrieves all unique addresses involved in the cart items.
  const getAddressesFromCart = useCallback(
    (platform?: ImportPlatformType): Address[] => {
      const addresses = cartItems
        .filter((item) => item.import === platform)
        .map(({ listOp }) => listOp.data.slice(0, 42).toLowerCase() as Address);

      return [...new Set(addresses)];
    },
    [cartItems]
  );

  // Resets the cart items
  const resetCart = () => {
    setCartItems([]);
  };

  const totalCartItems = cartItems.length + loadingCartItems;
  const cartAddresses = getAddressesFromCart();
  const socialAddresses = {
    farcaster: getAddressesFromCart("farcaster"),
    // lens: getAddressesFromCart('lens')
  };

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
        loadingCartItems,
        setLoadingCartItems,
        getAddressesFromCart,
        getTagsFromCartByAddress,
        hasListOpAddRecord,
        hasListOpAddTag,
        hasListOpRemoveRecord,
        hasListOpRemoveTag,
        removeAddTagFromCart,
        removeCartItem,
        removeRemoveTagFromCart,
        resetCart,
        totalCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
