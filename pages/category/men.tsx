import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Box, Typography } from "@mui/material";

export default function MenPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=men");
  return (
    <ShopLayout
      title={"Men"}
      pageDescription={"Find the best Expression products"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mb={2}>
        <Typography variant={"body1"} sx={{color: "#5E5E5E" }}>
          Showing {products.length} Products
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
