import { IWishlistProduct } from "@/interfaces";
import { createContext } from 'react';
import { WishlistState } from ".";

interface ContextProps {
    wishlist: IWishlistProduct[];
    addProductToWishlist: (product: IWishlistProduct) => void;
    removeWishlistProduct: (product: IWishlistProduct) => void;
}

export const WishlistContext = createContext({} as ContextProps);