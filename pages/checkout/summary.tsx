import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContext);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    const { hasError, message } = await createOrder();
    if (hasError) {
      setIsPosting(hasError);
      setErrorMessage(message);
      return;
    }
    router.replace(`/orders/${message}`);
  };

  return (
    <ShopLayout
      title="Resumen de la orden"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component={"h1"} mb={2}>
        Summary
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card
            sx={{
              background: "#F7F7F7",
              padding: "50px",
              height: 'auto'
            }}
          >
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems}{" "}
                {numberOfItems > 1 ? "products" : "product"})
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
                <NextLink href={"/checkout/address"} passHref legacyBehavior>
                  <Link underline="always">
                    <Typography>Edit</Typography>
                  </Link>
                </NextLink>
              </Box>
              <Typography>
                {shippingAddress?.firstName + " " + shippingAddress?.lastName}
              </Typography>
              <Typography>{shippingAddress?.address}</Typography>
              <Typography>{shippingAddress?.city}</Typography>
              <Typography>
                {
                  countries.find(
                    (country) => country.code === shippingAddress?.country
                  )?.name
                }
              </Typography>
              <Typography>{shippingAddress?.phone}</Typography>
              <Divider sx={{ my: 3 }} />
              <Box textAlign={"end"}>
                <NextLink href={"/cart"} passHref legacyBehavior>
                  <Link underline="always">
                    <Typography>Edit</Typography>
                  </Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }} display={"flex"} flexDirection={"column"}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={onCreateOrder}
                  disabled={isPosting}
                  variant="contained"
                >
                  Place Order
                </Button>
                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
