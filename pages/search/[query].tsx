import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { dbProducts } from "@/database";
import { IProduct } from "@/interfaces";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

export default function SearchPage({ products, foundProducts, query }: Props) {
  // const { products, isError, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title={"Expression | Inicio"}
      pageDescription={"Encuentra los mejores productos de Teslo"}
    >
      <Box my={3}>
        <Typography variant={"h1"} fontSize={20}>Search</Typography>
        {foundProducts ? (
          <Typography variant={"h2"} sx={{ mb: 1 }} fontSize={14}>
            Search results for <strong>{query}</strong>
          </Typography>
        ) : (
          <>
            <Typography variant={"h2"} sx={{ mb: 1 }} fontSize={14}>
            No search results found for <strong>{query}</strong>
            </Typography>
          </>
        )}
      </Box>
      <ProductList products={products} />
    </ShopLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };
  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  let products = await dbProducts.getProductByTerm(query);
  const foundProducts = products.length > 0;
  // TODO: Retornar otros productos
  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }
  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
