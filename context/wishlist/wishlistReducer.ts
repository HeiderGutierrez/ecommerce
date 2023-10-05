import { IWishlistProduct } from "@/interfaces";
import { WishlistState } from "./";

type WishlistActionType =
  | {
      type: "Wishlist - LoadWishlist from cookies | sotrage";
      payload: IWishlistProduct[];
    }
  | {
      type: "Wishlist - Add to wishlist";
      payload: IWishlistProduct;
    }
  | {
      type: "Wishlist - Remove products in wishlist";
      payload: IWishlistProduct;
    };

export const wishlistReducer = (
  state: WishlistState,
  action: WishlistActionType
): WishlistState => {
  switch (action.type) {
    case "Wishlist - LoadWishlist from cookies | sotrage":
      return {
        ...state,
        wishlist: [...action.payload],
      };
    case "Wishlist - Add to wishlist":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case "Wishlist - Remove products in wishlist":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => (product._id !== action.payload._id)
        ),
      };
    default:
      return state;
  }
};
