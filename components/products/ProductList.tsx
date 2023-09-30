import { useState } from "react";
import { IProduct } from "@/interfaces";
import { Box, Grid, Pagination } from "@mui/material";
import { ProductCard } from ".";

interface Props {
  products: IProduct[];
  orderBy?: string;
  itemsPerPage?: number;
}

export const ProductList = ({
  products,
  orderBy,
  itemsPerPage = 12,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const sortedProducts = products.sort((a, b) => {
    if (orderBy === "asc") {
      return a.price - b.price;
    } else if (orderBy === "desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const productsToDisplay = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Grid container spacing={4}>
        {productsToDisplay.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Grid>
      <Box display={'flex'} justifyContent={'center'} mt={8} >
        <Pagination
          count={Math.ceil(sortedProducts.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Box>
    </>
  );
};
