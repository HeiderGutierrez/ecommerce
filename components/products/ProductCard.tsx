import { useContext, useEffect, useMemo, useState } from "react";
import { IProduct, IWishlistProduct } from "@/interfaces";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { ButtonProduct } from "../ui/ButtonProduct";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Favorite,
  FavoriteBorderOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { currency } from "@/utils";
import { WishlistContext } from "@/context/wishlist";


interface Props {
  product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
  const { addProductToWishlist, removeWishlistProduct, wishlist } = useContext(WishlistContext)
  const isProductInWishlist = wishlist.some(
    (item) => item._id === product._id
  );
  const [isInWishlist, setIsInWishlist] = useState(isProductInWishlist);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
  }, [isHovered, product.images]);


  const handleWishlistButtonClick = () => {
    const tempWishlistProduct: IWishlistProduct = {
      _id: product._id,
      image: product.images[0],
      price: product.price,
      title: product.title,
      slug: product.slug,
      quantity: product.inStock,
    };
    if (isInWishlist) {
      removeWishlistProduct(tempWishlistProduct);
    } else {
      addProductToWishlist(tempWishlistProduct);
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <Grid
      item
      xs={12}
      sm={3}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea sx={{height: '100%', cursor: {xs: 'pointer', md: 'default'}}}>
          {product.inStock === 0 && (
            <Chip
              color="info"
              label="Not available"
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: 100,
                borderRadius: 0,
              }}
            />
          )}
          <CardMedia
            component={"img"}
            image={productImage}
            alt={product.title}
            className="fadeIn"
            onLoad={() => setIsImageLoading(true)}
            sx={{
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </CardActionArea>
        <IconButton
          sx={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 10,
            right: {xs: 10, md: -36},
            transition: "all .3s ease-in-out",
            background: "#ffffff",
            color: "#232323",
            boxShadow: '0 1px 10px 1px rgba(0,0,0,0.1)' ,
            "&:hover": {
              background: "#232323",
              color: "#ffffff"
            },
          }}
          onClick={handleWishlistButtonClick}
        >
          {isInWishlist ? (
            <Favorite sx={{fontSize: 14}} />
            ) : (
            <FavoriteBorderOutlined sx={{fontSize: 14}} />
          )}
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 0, md: -40},
            width: "100%",
            transition: "all .3s ease-in-out",
          }}
        >
          <ButtonProduct
            iconButton={<ShoppingCartOutlinedIcon fontSize="small" />}
            textButton="Add to cart"
          />
          <ButtonProduct
            iconButton={<VisibilityOutlined fontSize="small" />}
            textButton="Quick View"
            linkButton={`/product/${product.slug}`}
          />
        </Box>
      </Card>
      <Box
        sx={{ ml: 1, display: isImageLoading ? "block" : "none" }}
        className="fadeIn"
        style={{ textAlign: "center", padding: "30px 0 0" }}
      >
        <Typography fontWeight={600} color={"secondary"} fontSize={14}>
          {product.title}
        </Typography>
        <Typography
          fontWeight={500}
          fontSize={"14px"}
        >
          {currency.format( product.price )}
        </Typography>
      </Box>
    </Grid>
  );
};
