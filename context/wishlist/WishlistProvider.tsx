import { IWishlistProduct } from "@/interfaces";
import { useReducer } from "react";
import { wishlistReducer, WishlistContext } from "./";
import { useEffect } from "react";
import Cookie from "js-cookie";

export interface WishlistState {
  wishlist: IWishlistProduct[];
}

const WISHLIST_INITIAL_STATE: WishlistState = {
  wishlist: [],
};

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(wishlistReducer, WISHLIST_INITIAL_STATE);

  useEffect(() => {
    try {
      const savedWishlist = Cookie.get("wishlist") ? JSON.parse(Cookie.get("wishlist")!) : [];
      dispatch({ type: "Wishlist - LoadWishlist from cookies | sotrage", payload: savedWishlist });
    } catch (error) {
      dispatch({ type: "Wishlist - LoadWishlist from cookies | sotrage", payload: [] });
    }
  }, []);

  useEffect(() => {
    if(state.wishlist.length === 0) return;
    Cookie.set("wishlist", JSON.stringify(state.wishlist), {expires: 30});
  }, [state.wishlist]);

  const addProductToWishlist = (product: IWishlistProduct) => {
    dispatch({type: "Wishlist - Add to wishlist", payload: product});
    Cookie.set("wishlist", JSON.stringify(state.wishlist));
  }

  const removeWishlistProduct = (product: IWishlistProduct) => {
    dispatch({type: "Wishlist - Remove products in wishlist", payload: product});
    Cookie.set("wishlist", JSON.stringify(state.wishlist));
  }

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addProductToWishlist,
        removeWishlistProduct
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
