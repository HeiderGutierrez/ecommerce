import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export default function HomePage() {
  const { products, isError, isLoading } = useProducts("/products");

  // Nueva variable para almacenar el criterio de ordenamiento
  const [orderBy, setOrderBy] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value as string);
  };

  // Lista desplegable para seleccionar el criterio de ordenamiento
  const selectOptions = [
    { value: "", label: "Sin ordenar" },
    { value: "asc", label: "Ascendente" },
    { value: "desc", label: "Descendente" },
  ];

  return (
    <ShopLayout
      title={"Expression | Inicio"}
      pageDescription={"Encuentra los mejores productos de Teslo"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant={"body1"}>
          Showing {products.length} Products
        </Typography>
        <Box sx={{ width: 200 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Ordenar por:</InputLabel>
            <Select
              label="Ordenar por:"
              value={orderBy}
              onChange={handleChange}
              sx={{borderRadius: 0}}
            >
              {selectOptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} orderBy={orderBy} />}
    </ShopLayout>
  );
}
