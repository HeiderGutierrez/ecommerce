import { ShopLayout } from "@/components/layouts";
import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { DynamicBreadcrumbs } from "@/components/ui/DynamicBreadcrumbs";
import { CartContext } from "@/context";
import { dbProducts } from "@/database";
import { getProductsBySlug } from "@/database/dbProducts";
import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { currency } from "@/utils";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";

interface Props {
  product: IProduct;
}

const ProductPage = ({ product }: Props) => {
  const router = useRouter();
  const [isAlert, setIsAlert] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setIsAlert(false);
    setTempCartProduct({
      ...tempCartProduct,
      size,
    });
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProductToCart = () => {
    if (!tempCartProduct.size) {
      setIsAlert(true);
      return;
    }
    setIsAlert(false);
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection={"column"}>
            <DynamicBreadcrumbs />
            <Box mb={3} display={"grid"} gap={1}>
              <Typography
                variant={"h1"}
                fontSize={20}
                width={"70%"}
                fontWeight={500}
              >
                {product.title}
              </Typography>
              <Typography variant={"h2"} fontSize={14}>
                {currency.format(product.price)}
              </Typography>
            </Box>
            <Divider />
            <Box mb={3} mt={3}>
              <Typography variant={"body1"}>{product.description}</Typography>
            </Box>
            <Divider />
            <Box sx={{ my: 2 }}>
              <Box display={"flex"} alignItems={"baseline"} gap={4}>
                <Typography
                  variant={"h2"}
                  fontSize={14}
                  textTransform={"uppercase"}
                >
                  Sizes
                </Typography>
                <SizeSelector
                  onSelectedSize={selectedSize}
                  selectedSize={tempCartProduct.size}
                  sizes={product.sizes}
                />
              </Box>
            </Box>
            {isAlert && (
              <Alert severity="error" sx={{ mb: 2 }}>
                You must select a size
              </Alert>
            )}
            {product.inStock === 0 ? (
              <Chip
                label="No units available"
                color="error"
                variant="filled"
                sx={{ borderRadius: 0 }}
              />
            ) : (
              <Box
                display={"flex"}
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                }}
                gap={4}
                mb={3}
              >
                <Box display={"flex"} alignItems={"baseline"} gap={4}>
                  <Typography
                    variant={"h2"}
                    fontSize={14}
                    textTransform={"uppercase"}
                    sx={{display: {xs: "block", md: "none"}}}
                  >
                    Quantity
                  </Typography>
                  <ItemCounter
                    currentValue={tempCartProduct.quantity}
                    updatedQuantity={onUpdateQuantity}
                    maxValue={product.inStock > 10 ? 10 : product.inStock}
                  />
                </Box>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  fullWidth
                  onClick={onAddProductToCart}
                  sx={{ height: 51 }}
                >
                  Add to cart
                </Button>
              </Box>
            )}
            <Divider />
            <Box mb={3} mt={3} display={"flex"} alignItems={"center"} gap={1}>
              <Typography
                variant={"h2"}
                fontSize={14}
                textTransform={"uppercase"}
              >
                Tags:
              </Typography>
              <Typography variant="body1" textTransform={"uppercase"}>
                {product.tags.join(", ")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await dbProducts.getAllProductsSlug();
  return {
    paths: products.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await getProductsBySlug(slug);
  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
