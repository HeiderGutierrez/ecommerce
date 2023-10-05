import { ShopLayout } from "@/components/layouts";
import { Box, Button, Typography } from "@mui/material";
import EmptyCart from "../../public/empty-cart.svg";
import Image from "next/image";

const EmptyPage = () => {
  return (
    <ShopLayout
      title={"Empty Cart"}
      pageDescription={"No hay articulos en el carrito"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box sx={{width: {xs: '50%', md: '30%'}}}>
          <Image
            src={EmptyCart}
            alt="Boy sitting"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box margin={2}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 30, md: 60 } }}
            textAlign={"center"}
            fontWeight={600}
            mb={4}
          >
            Your cart is empty
          </Typography>
        </Box>
        <Box>
          <Button href="/" variant="contained" color="secondary" size="large">
            Back to home page
          </Button>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
