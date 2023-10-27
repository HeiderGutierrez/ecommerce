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
      title={"Search"}
      pageDescription={"Find the best Expression products"}
    >
      <Box mb={2}>
        {foundProducts ? (
          <Typography variant={"body1"}>
            Showing {products.length} products for {query}
          </Typography>
        ) : (
          <>
            <Typography variant={"body1"}>
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
