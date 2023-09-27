import { IProduct } from "@/interfaces"
import { Grid } from "@mui/material"
import { ProductCard } from ".";

interface Props {
    products: IProduct[];
    orderBy?: string;
}

export const ProductList = ({products, orderBy}: Props) => {
   // Ordenar la lista de productos
   const sortedProducts = products.sort((a, b) => {
    if (orderBy === "asc") {
      return a.price - b.price;
    } else if (orderBy === "desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });
  return (
    <Grid container spacing={4}>
        {sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
    </Grid>
  )
}
