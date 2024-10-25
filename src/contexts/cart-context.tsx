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
import debounce from "lodash.debounce";
import { hexlify } from "#/lib/utilities";

import { useCartMap } from "#/hooks/use-cart-map";
import type { ImportPlatformType } from "#/types/common";
import type { ListOp, ListOpTagOpParams } from "#/types/list-op";
import { isTagListOp, listOpAddTag, listOpRemoveTag, extractAddressAndTag } from "#/utils/list-ops";

// Define the type for each cart item
export type CartItem = {
  listOp: ListOp;
  import?: ImportPlatformType;
};

type StoredCartItem = {
  opcode: number;
  version: number;
  address: Address;
  tag?: string;
  import?: ImportPlatformType;
};

// Define the type for the context value
type CartContextType = {
  addAddTagToCart: (params: ListOpTagOpParams) => void;
  addCartItem: (item: CartItem) => void;
  addRemoveTagToCart: (params: ListOpTagOpParams) => void;
  cartAddresses: Address[];
  // socialAddresses: Record<string, Address[]>
  socialAddresses: {
    farcaster: Address[];
  };
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  loadingCartItems: number;
  setLoadingCartItems: Dispatch<SetStateAction<number>>;
  getAddressesFromCart: () => string[];
  getTagsFromCartByAddress: (address: Address) => string[];
  handleTagClick: (params: ListOpTagOpParams) => void;
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
  const [loadingCartItems, setLoadingCartItems] = useState<number>(0);
  const { address } = useAccount();

  const { set, has, delete: deleteKey, entries, forceUpdate, setBulk, values } = useCartMap();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCartItemsJson = localStorage.getItem("cart");
    if (storedCartItemsJson) {
      try {
        const storedCartItems = JSON.parse(storedCartItemsJson) as StoredCartItem[];
        const transformedCartItems = storedCartItems.map((item) => {
          const addressBuffer = Buffer.from(item.address.slice(2), "hex");
          const dataBuffer = item.tag
            ? // @ts-ignore
              Buffer.concat([addressBuffer, Buffer.from(item.tag, "utf8")])
            : addressBuffer;

          const cartItem: CartItem = {
            listOp: {
              opcode: item.opcode,
              version: item.version,
              data: dataBuffer,
            },
            import: item.import,
          };

          return cartItem;
        });

        setBulk(transformedCartItems);
      } catch (error) {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  const saveCartToLocalStorage = useCallback(
    debounce((addr: Address) => {
      const serializedCartItems = values().map(({ listOp, import: platform }) => {
        const addressHex = listOp.data.toString("hex");
        const address = `0x${addressHex.slice(0, 40)}` as Address; // Adjust based on address length
        const tag = listOp.data.length > 20 ? listOp.data.slice(20).toString("utf8") : undefined;

        return {
          opcode: listOp.opcode,
          version: listOp.version,
          address,
          tag,
          import: platform,
        };
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(serializedCartItems));
        localStorage.setItem("cart address", addr);
      }
    }, 600),
    []
  );

  useEffect(() => {
    if (!address) return;
    saveCartToLocalStorage(address);
  }, [address, saveCartToLocalStorage]);

  const addCartItem = useCallback((item: CartItem) => {
    setLoadingCartItems((prevLoading) => (prevLoading > 0 ? prevLoading - 1 : prevLoading));

    const key = item.listOp.data.toString("hex");
    if (has(key)) return;
    set(key, item);
    forceUpdate();
  }, []);

  const removeCartItem = useCallback((listOp: ListOp) => {
    const key = listOp.data.toString("hex");
    if (!has(key)) return;
    deleteKey(key);
    forceUpdate();
  }, []);

  const hasListOpAddRecord = useCallback(
    (address: Address): boolean =>
      values().some(
        (cartItem) =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 1 &&
          `0x${cartItem.listOp.data.toString("hex")}`.toLowerCase() === address?.toLowerCase()
      ),
    [entries]
  );

  const hasListOpRemoveRecord = useCallback(
    (address: Address): boolean =>
      values().some(
        (cartItem) =>
          cartItem.listOp.version === 1 &&
          cartItem.listOp.opcode === 2 &&
          `0x${cartItem.listOp.data.toString("hex")}`.toLowerCase() === address?.toLowerCase()
      ),
    [entries]
  );

  const hasListOpAddTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean =>
      values().some(
        (cartItem) =>
          isTagListOp(cartItem.listOp) &&
          cartItem.listOp.opcode === 3 &&
          extractAddressAndTag(cartItem.listOp).address.toLowerCase() === address?.toLowerCase() &&
          extractAddressAndTag(cartItem.listOp).tag === tag
      ),
    [entries]
  );

  const hasListOpRemoveTag = useCallback(
    ({ address, tag }: { address: Address; tag: string }): boolean =>
      values().some(
        (cartItem) =>
          isTagListOp(cartItem.listOp) &&
          cartItem.listOp.opcode === 4 &&
          extractAddressAndTag(cartItem.listOp).address.toLowerCase() === address?.toLowerCase() &&
          extractAddressAndTag(cartItem.listOp).tag === tag
      ),
    [entries]
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

  const handleTagClick = useCallback(
    ({ address, tag }: ListOpTagOpParams) => {
      // Do nothing if not in edit view
      // if (!isEditView) return

      // If cart has "add tag" remove it from the cart
      if (hasListOpAddTag({ address, tag })) {
        return removeAddTagFromCart({ address, tag });
      }

      // If cart has "remove tag" remove it from the cart
      if (hasListOpRemoveTag({ address, tag })) {
        return removeRemoveTagFromCart({ address, tag });
      }

      // Add "add tag" to cart if it not in cart
      if (!hasListOpAddRecord(address)) {
        return addAddTagToCart({ address, tag });
      }

      // Add "remove tag" to cart if not in cart
      if (!hasListOpRemoveRecord(address)) {
        return addRemoveTagToCart({ address, tag });
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
      removeRemoveTagFromCart,
    ]
  );

  // Retrieves all tags associated with a specific address from the cart items.
  const getTagsFromCartByAddress = useCallback(
    (address: Address): string[] => {
      return values().reduce((tags, { listOp }) => {
        if (isTagListOp(listOp)) {
          const { address: opAddress, tag } = extractAddressAndTag(listOp);
          if (opAddress.toLowerCase() === address.toLowerCase()) {
            tags.push(tag);
          }
        }
        return tags;
      }, [] as string[]);
    },
    [values]
  );

  // Retrieves all unique addresses involved in the cart items.
  const getAddressesFromCart = useCallback(
    (platform?: ImportPlatformType): Address[] => {
      const addresses = values()
        .filter((item) => item.import === platform)
        .map(({ listOp }) =>
          isTagListOp(listOp) ? extractAddressAndTag(listOp).address : hexlify(listOp.data)
        );

      return [...new Set(addresses)];
    },
    [values]
  );

  // Resets the cart items
  const resetCart = () => {
    setBulk([]);
  };

  const totalCartItems = values().length + loadingCartItems;
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
        cartItems: values(),
        setCartItems: setBulk,
        loadingCartItems,
        setLoadingCartItems,
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
