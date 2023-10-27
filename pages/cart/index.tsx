import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    if ((isLoaded && !cart) || cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  return (
    <ShopLayout title="Cart" pageDescription="Shopping cart">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card sx={{
            background: '#F7F7F7',
            padding: {xs: '10px', md: '50px'},
            height: 'auto'
          }}>
            <CardContent>
              <Typography variant="h2">Cart totals</Typography>
              <Divider sx={{ my: 3 }} />
              <OrderSummary />
              <Divider sx={{ my: 3 }} />
              <Box>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  href="/checkout/address"
                >
                  Proceed to checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
