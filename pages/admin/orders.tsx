import { AdminLayout } from "@/components/layouts";
import { IOrder, IUser } from "@/interfaces";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import useSWR from 'swr';

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre Completo", width: 300 },
  { field: "total", headerName: "Monto total", width: 300 },
  {
    field: "isPaid",
    headerName: "Pagada",
    renderCell: (params) => {
      return params.row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="No pagada" color="error" />
      );
    },
  },
  {field: 'noProducts', headerName: 'No. Productos', align: 'center'},
  {
    field: "check",
    headerName: "Ver Orden",
    renderCell: (params) => {
      return (
        <a href={`/admin/orders/${params.row.id}`} target="_blank" >
          Ver Orden
        </a>
      )
    },
  },
  {field: 'createdAt', headerName: 'Creada el'},
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');
  if(!data && !error){
    return <></>;
  }
  const rows: GridRowsProp = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }))
  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container>
        <Grid item xs={12}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
