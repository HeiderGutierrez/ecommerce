import { AdminLayout } from "@/components/layouts";
import { IOrder, IUser } from "@/interfaces";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import useSWR from "swr";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Full Name", width: 300 },
  { field: "total", headerName: "Total Amount", width: 300 },
  {
    field: "isPaid",
    headerName: "Status",
    renderCell: (params) => {
      return params.row.isPaid ? (
        <Chip
          variant="outlined"
          label="Paid"
          color="success"
          sx={{ borderRadius: 0 }}
        />
      ) : (
        <Chip
          variant="outlined"
          label="Unpaid"
          color="error"
          sx={{ borderRadius: 0 }}
        />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "No. Products",
    align: "center",
    width: 150,
  },
  {
    field: "check",
    headerName: "View Order",
    renderCell: (params) => {
      return (
        <a href={`/admin/orders/${params.row.id}`} target="_blank">
          View Order
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Created On", width: 300 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  if (!data && !error) {
    return <></>;
  }
  const rows: GridRowsProp = data!.map((order) => {
    let dateFormatted = "";

    if (order.createdAt) {
      dateFormatted = format(new Date(order.createdAt), "EEEE, MMMM d", {
        locale: enUS,
      });
    }

    return {
      id: order._id,
      email: (order.user as IUser)?.email || "User not available",
      name: (order.user as IUser)?.name || "User not available",
      total: order.total,
      isPaid: order.isPaid,
      noProducts: order.numberOfItems,
      createdAt: dateFormatted,
    };
  });

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
            rowHeight={60}
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
