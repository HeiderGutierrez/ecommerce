import { ShopLayout } from "@/components/layouts";
import { WishlistContext } from "@/context/wishlist";
import { IWishlistProduct } from "@/interfaces";
import { currency } from "@/utils";
import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";

const WishlistPage = () => {
  const { wishlist, removeWishlistProduct } = useContext(WishlistContext);
  console.log(wishlist)
  let columns: GridColDef[] = [
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
            onClick={() => removeWishlistProduct(product as IWishlistProduct)}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>
        );
      },
    },
    {
      field: "image",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell(params) {
        return (
          <CardMedia
            component={"img"}
            className="fadeIn"
            image={params.row.imgage}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Product Name",
      width: 300,
      sortable: false,
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
      field: "stock",
      headerName: "Stock Status",
      width: 200,
      sortable: false,
      renderCell(params) {
        return (
          <Chip
            color={params.row.stock <= 0 ? 'error' : 'success'}
            label={params.row.stock <= 0 ? 'OUT OF STOCK' : 'IN STOCK'}
            variant="outlined"
            sx={{ borderRadius: 0 }}
          />
        );
      },
    },
    {
      field: "order",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            href={`/product/${params.row.slug}`}
            variant="contained"
            color="secondary"
          >
            View Product
          </Button>
        );
      }
    }
  ];

  const rows = wishlist.map((product) => ({
    id: product._id,
    imgage: product.image,
    title: product.title,
    slug: product.slug,
    price: product.price,
    stock: product.quantity,
    product: product,
  }));

  return (
    <ShopLayout title="Wishlist" pageDescription="Wishlist page">
      <Box display={"grid"} gap={2}>
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
            ".MuiDataGrid-columnSeparator--sideRight": {
              display: "none",
            },
            ".MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
              ":focus": {
                outline: "none",
              },
            },
          }}
          hideFooter
        />
      </Box>
    </ShopLayout>
  );
};

export default WishlistPage;
