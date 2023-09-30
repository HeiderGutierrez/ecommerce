import { AdminLayout } from "@/components/layouts";
import { IProduct } from "@/interfaces";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import useSWR from "swr";
import NextLink from "next/link";
import Image from 'next/image';
import Plus from '../../public/icons/plus.svg';

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: (params) => {
      return (
        <a href={`/product/${params.row.slug}`} target="_blank">
          <CardMedia
            component={"img"}
            className="fadeIn"
            image={params.row.img}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: (params) => {
      return (
        <NextLink
          href={`/admin/products/${params.row.slug}`}
          passHref
          legacyBehavior
        >
          <Link underline="always">{params.row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Género" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
  {
    field: "options",
    headerName: "Opciones",
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="secondary"
          href={`/admin/products/${params.row.slug}`}
        >
          Editar
        </Button>
      );
    },
  },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");
  if (!data && !error) {
    return <></>;
  }
  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));
  return (
    <AdminLayout
      title={"Admin | Productos"}
      subTitle={"Mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <Box display={"flex"} justifyContent={"end"} sx={{ mb: 2 }}>
        <Button
          startIcon={<Image src={Plus} alt="Add icon" />}
          color="primary"
          href="/admin/products/new"
          variant="contained"
        >
          add new product
        </Button>
      </Box>
      <Grid container>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
