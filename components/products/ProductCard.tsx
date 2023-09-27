import { useMemo, useState } from "react";
import NextLink from "next/link";
import { IProduct } from "@/interfaces";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Chip,
  IconButton,
} from "@mui/material";
import { ButtonProduct } from "../ui/ButtonProduct";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  FavoriteBorderOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { currency } from "@/utils";

interface Props {
  product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
  }, [isHovered, product.images]);
  return (
    <Grid
      item
      xs={6}
      sm={3}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea sx={{height: '100%'}}>
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
            right: -36,
            transition: "all .3s ease-in-out",
            background: "#ffffff",
            color: "#000000",
            "&:hover": {
              background: "#000000",
              color: "#ffffff"
            },
          }}
        >
          <FavoriteBorderOutlined sx={{fontSize: 14}} />
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
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
