import { ShopLayout } from "@/components/layouts";
import { Box, Button, Link, Typography } from "@mui/material";
import EmptyCart from '../../public/empty-cart.svg';
import NextLink from 'next/link';
import Image from 'next/image';

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
        flexDirection={'column'}
      >
        <Image src={EmptyCart} alt="Boy sitting" style={{width: '30%', height: 'auto'}} />
        <Box margin={2}>
        <Typography variant="h1" fontSize={60} fontWeight={600} mb={4}>
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
