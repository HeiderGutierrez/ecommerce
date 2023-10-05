import { ShopLayout } from "@/components/layouts";
import { Button, Chip, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150, sortable: false},
  { field: "fullName", headerName: "Full Name", width: 150, sortable: false },
  {
    field: "paid",
    headerName: "Status",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip
          color="success"
          label="Paid"
          variant="outlined"
          sx={{ borderRadius: 0 }}
        />
      ) : (
        <Chip
          color="error"
          label="Unpaid"
          variant="outlined"
          sx={{ borderRadius: 0 }}
        />
      );
    },
  },
  { field: "date", headerName: "Created On", width: 300, sortable: false },
  {
    field: "order",
    headerName: "Order",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <Button
          href={`/orders/${params.row.orderId}`}
          variant="contained"
          color="secondary"
        >
          View order
        </Button>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage = ({ orders }: Props) => {
  const rows: GridRowsProp = orders.map((order, index) => {
    let dateFormatted = "";

    if (order.createdAt) {
      dateFormatted = format(new Date(order.createdAt), "EEEE, MMMM d", {
        locale: enUS,
      });
    }

    return {
      id: index + 1,
      fullName:
        order.shippingAddress.firstName + " " + order.shippingAddress.lastName,
      paid: order.isPaid,
      orderId: order._id,
      date: dateFormatted,
    };
  });

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
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
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);
  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
