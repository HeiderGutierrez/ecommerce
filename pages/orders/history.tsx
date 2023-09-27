import { ShopLayout } from "@/components/layouts";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from "next-auth";
import NextLink from "next/link";
import { authOptions } from "../api/auth/[...nextauth]";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "fullName", headerName: "Nombre Completo", width: 150 },
  {
    field: "paid",
    headerName: "Pagada",
    width: 200,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Orden",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
          <Link underline="always">
            <Typography>Ver orden</Typography>
          </Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage = ({ orders }: Props) => {

  const rows: GridRowsProp = orders.map((order, index) => ({
    id: index + 1, 
    fullName: order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName, 
    paid: order.isPaid,
    orderId: order._id
  }))

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component={"h1"} fontFamily={'Evo'} mb={2}>
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <DataGrid rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

  const session: any = await getServerSession(req, res, authOptions);

  if(!session) {
    return {
      redirect :{
        destination: `/auth/login?p=/orders/history`,
        permanent  : false
      }
    }
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props:{
      orders
    }
  }
}

export default HistoryPage;
