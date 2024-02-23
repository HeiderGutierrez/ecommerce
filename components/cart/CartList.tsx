import { initialData } from "@/database/seed-data";
import {
  CardMedia,
  Typography,
  Box,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { useContext, useEffect, useState } from "react";
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
  const [isResponsive, setIsResponsive] = useState(false);
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
      width: 150,
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

  if (editable) {
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
    ];
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

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsResponsive(true);
      return;
    }
    setIsResponsive(false);
  };

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (process.browser) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <Box display={"grid"} gap={2}>
      {!isResponsive ? (
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter
            disableColumnMenu
            rowSelection={false}
            rowHeight={150}
            sx={{
              border: "none",
              ".MuiDataGrid-columnHeaderTitle": {
                fontFamily: "Poppins, sans-serif",
                color: "#232323",
                fontSize: 13,
              },
              ".MuiDataGrid-columnSeparator--sideRight" : {
                display: 'none',
              },
              ".MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
                ":focus": {
                  outline: 'none',
                }
              },
            }}
            hideFooter
        />
      ) : (
        <Box>
          {productsToShow.map((product) => (
            <Grid container key={product.slug} spacing={2}>
              <Grid item xs={3}>
                <CardMedia component={"img"} image={product.image} />
              </Grid>
              <Grid item xs={9} display={"grid"} gap={1}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="body1"
                    whiteSpace={"nowrap"}
                    maxWidth={200}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                  >
                    {product.title}
                  </Typography>
                  {editable && (
                    <IconButton
                      sx={{ borderRadius: 0 }}
                      color="secondary"
                      onClick={() => removeCartProduct(product as ICartProduct)}
                    >
                      <CloseOutlined fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Box>
                  <Typography variant="body1">Size: {product.size}</Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={14}
                    fontWeight={500}
                  >
                    Price
                  </Typography>
                  <Typography variant="body1">
                    {currency.format(product.price)}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={14}
                    fontWeight={500}
                  >
                    Quantity
                  </Typography>
                  {editable ? (
                    <ItemCounter
                      currentValue={product.quantity}
                      updatedQuantity={(value) =>
                        onNewCartQuantityValue(product as ICartProduct, value)
                      }
                      maxValue={10}
                    />
                  ) : (
                    <Typography variant="body1">
                      {product.quantity}{" "}
                      {product.quantity > 1 ? "products" : "product"}
                    </Typography>
                  )}
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize={14}
                    fontWeight={500}
                  >
                    Total
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {currency.format(product.price * product.quantity)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} py={2}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </Box>
  );
};
