import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { DynamicBreadcrumbs } from "@/components/ui/DynamicBreadcrumbs";
import { useProducts } from "@/hooks";
import { Box, Typography } from "@mui/material";

export default function WomenPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=women");
  return (
    <ShopLayout
      title={"Expression | Mujeres"}
      pageDescription={"Encuentra los mejores productos de Teslo"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Typography fontWeight={500}>Women | &ensp;</Typography>
        <Typography variant={"body1"} sx={{ mb: 5, mt: 5, color: "#5E5E5E" }}>
          {products.length} Products
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}