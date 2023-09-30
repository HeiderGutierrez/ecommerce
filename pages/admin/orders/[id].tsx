import { CartList, OrderSummary } from "@/components/cart";
import { AdminLayout } from "@/components/layouts";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Link,
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { GetServerSideProps } from "next";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";

export type OrderResponseBody = {
  id: string;
  status:
    | "CREATED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "COMPLETED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}

const OrderPageById = ({ order }: Props) => {
  return (
    <AdminLayout
      title="Order Summary"
      subTitle={`Orden # ${order._id}`}
    >
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente por pagar"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href={"/checkout/address"} passHref legacyBehavior>
                  <Link underline="always">
                    <Typography>Editar</Typography>
                  </Link>
                </NextLink>
              </Box>
              <Typography>
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </Typography>
              <Typography>{order.shippingAddress.address}</Typography>
              <Typography>{order.shippingAddress.city}</Typography>
              <Typography>{order.shippingAddress.country}</Typography>
              <Typography>{order.shippingAddress.phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />
              <Box sx={{ mt: 3 }}>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2, width: "100%" }}
                    label="Orden pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ my: 2, width: "100%" }}
                    label="Pendiente por pagar"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { id = "" } = query;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPageById;
