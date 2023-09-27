import { initialData } from "@/database/seed-data";
import { CardMedia, Typography, Box, IconButton } from "@mui/material";
import { ItemCounter } from "../ui";
import { useContext } from "react";
import { CartContext } from "@/context";
import { ICartProduct, IOrderItem } from "@/interfaces";
import { currency } from "@/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CloseOutlined } from "@mui/icons-material";

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList = ({ editable = false, products }: Props) => {
  const { cart, updatedProductCart, removeCartProduct } =
    useContext(CartContext);
  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updatedProductCart(product);
  };
  const productsToShow = products ? products : cart;

  let columns: GridColDef[] = [
    {
      field: "image",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell(params) {
        return (
          <a href={`/product/${params.row.slug}`} target="_blank">
            <CardMedia
              component={"img"}
              className="fadeIn"
              image={params.row.imgage}
            />
          </a>
        );
      },
    },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography>{params.row.title}</Typography>
            <Typography>Size: {params.row.size}</Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      sortable: false,
      renderCell(params) {
        return <>{currency.format(params.row.price)}</>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      sortable: false,
      renderCell(params) {
        const product = params.row.product;
        return (
          <>
            {editable ? (
              <ItemCounter
                currentValue={params.row.quantity}
                updatedQuantity={(value) =>
                  onNewCartQuantityValue(product as ICartProduct, value)
                }
                maxValue={10}
              />
            ) : (
              <Typography variant="body1">
                {params.row.quantity}{" "}
                {params.row.quantity > 1 ? "products" : "product"}
              </Typography>
            )}
          </>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      sortable: false,
      renderCell(params) {
        return <>{currency.format(params.row.total)}</>;
      },
    },
  ];

  if(editable) {
    columns = [
      {
        field: "delete",
        headerName: "",
        width: 30,
        sortable: false,
        renderCell: (params) => {
          const product = params.row.product;
          return (
            <IconButton
              sx={{ borderRadius: 0 }}
              color="secondary"
              onClick={() => removeCartProduct(product as ICartProduct)}
            >
              <CloseOutlined fontSize="small" />
            </IconButton>
          );
        },
      },
      ...columns,
    ]
  }

  const rows = productsToShow.map((product) => ({
    id: product._id,
    imgage: product.image,
    title: product.title,
    size: product.size,
    price: product.price,
    quantity: product.quantity,
    total: product.price * product.quantity,
    product: product,
  }));

  return (
    <Box display={"grid"} gap={2}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnMenu
        rowHeight={150}
        sx={{
          border: "none",
          ".MuiDataGrid-columnHeaderTitle": {
            fontFamily: "Poppins, sans-serif",
            color: "#232323",
            fontSize: 13,
          },
        }}
        hideFooter
      />
    </Box>
  );
};
