import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { tesloApi } from "@/xdApi";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

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

const OrderPage = ({ order }: Props) => {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);
  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      console.log("Error al completar el pedido");
      return;
    }

    setIsPaying(true);

    try {
      const { data } = await tesloApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });
      Cookies.remove("cart");
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
    }
  };
  return (
    <ShopLayout
      title="Resumen de la orden #"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component={"h1"} fontSize={20} mb={2}>
        Order summary # {order._id}
      </Typography>
      {order.isPaid ? (
        <Chip
          sx={{ my: 3, width: "100%", borderRadius: 0 }}
          label="Order paid"
          variant="filled"
          color="success"
        />
      ) : (
        <Chip
          sx={{ my: 3, width: "100%", borderRadius: 0 }}
          label="Pending payment"
          variant="filled"
          color="error"
        />
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card
            sx={{
              background: "#F7F7F7",
              padding: {xs: '10px', md: "50px"},
              height: "auto",
            }}
          >
            <CardContent>
              <Typography variant="h2">
                Summary ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "products" : "product"})
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="subtitle1" fontSize={14} fontWeight={500}>
                  Delivery address
                </Typography>
              </Box>
              <Typography>
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </Typography>
              <Typography>{order.shippingAddress.address}</Typography>
              <Typography>{order.shippingAddress.city}</Typography>
              <Typography>{order.shippingAddress.country}</Typography>
              <Typography>{order.shippingAddress.phone}</Typography>
              <Divider sx={{ my: 3 }} />
              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />
              <Box sx={{ mt: 3 }}>
                <Box display={"flex"} justifyContent={"center"}>
                  {isPaying && <CircularProgress />}
                </Box>
                <Box
                  sx={{
                    display: isPaying ? "none" : "flex",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  {order.isPaid ? null : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order?.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        return actions.order?.capture().then((details) => {
                          onOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
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

export default OrderPage;
