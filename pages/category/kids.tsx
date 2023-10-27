import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Box, Typography } from "@mui/material";

export default function KidsPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=kid");
  return (
    <ShopLayout
      title={"Kids"}
      pageDescription={"Find the best Expression products"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mb={2}>
        <Typography variant={"body1"} sx={{ color: "#5E5E5E" }}>
          Showing {products.length} Products
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}

