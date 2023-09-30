import { AdminLayout } from "@/components/layouts";
import { IOrder, IUser } from "@/interfaces";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import useSWR from "swr";

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
        <Chip variant="outlined" label="Paid" color="success" sx={{borderRadius: 0}} />
      ) : (
        <Chip variant="outlined" label="Unpaid" color="error" sx={{borderRadius: 0}} />
      );
    },
  },
  { field: "noProducts", headerName: "No. Productos", align: "center" },
  {
    field: "check",
    headerName: "Ver Orden",
    renderCell: (params) => {
      return (
        <a href={`/admin/orders/${params.row.id}`} target="_blank">
          Ver Orden
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Creada el" },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  if (!data && !error) {
    return <></>;
  }
  const rows: GridRowsProp = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser)?.email || "User not available",
    name: (order.user as IUser)?.name || "User not available",
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={"Admin | Orders"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
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

export default OrdersPage;
