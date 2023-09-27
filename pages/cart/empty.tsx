import { ShopLayout } from "@/components/layouts";
import { Box, Link, Typography } from "@mui/material";
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import NextLink from 'next/link';

const EmptyPage = () => {
  return (
    <ShopLayout
      title={"Carrito vació"}
      pageDescription={"No hay articulos en el carrito"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={'column'}
        height={"calc(100vh - 200px)"}
      >
        <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
        <Box margin={2}>
            <Typography>Su carrito está vació</Typography>
        </Box>
        <NextLink href={'/'} passHref legacyBehavior>
            <Link>
                Volver a la tienda
            </Link>
        </NextLink>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
