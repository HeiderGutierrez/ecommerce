import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Box, Typography } from "@mui/material";

export default function KidsPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=kid");
  return (
    <ShopLayout
      title={"Expression | Niños"}
      pageDescription={"Encuentra los mejores productos de Teslo"}
    >
      <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
        <Typography fontWeight={500}>Kids | &ensp;</Typography>
        <Typography variant={"body1"} sx={{ mb: 5, mt: 5, color: "#5E5E5E" }}>
          {products.length} Products
        </Typography>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
