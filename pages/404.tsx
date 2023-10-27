import { ShopLayout } from "@/components/layouts";
import { UiContext } from "@/context";
import { SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const Custom404 = () => {
  const { isMenuOpen, closeSideMenu } = useContext(UiContext);
  const [searchProduct, setSearchProduct] = useState("");
  const router = useRouter();

  const onSearchProduct = () => {
    if (searchProduct.trim().length === 0) return;
    navigateTo(`/search/${searchProduct}`);
  };

  const navigateTo = (url: string) => {
    closeSideMenu();
    router.push(url);
  };
  return (
    <ShopLayout
      title={"Page not found"}
      pageDescription={"Page not found"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h1" sx={{fontSize: {xs: 70, md: 100}}} fontWeight={600} mb={4}>
          OOPS!
        </Typography>
        <Typography variant="subtitle1" fontWeight={500}>
          That page can’t be found.
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
          It looks like nothing was found at this <br /> location. Maybe try a
          search?
        </Typography>
        <Box my={5}>
          <Input
            type="text"
            autoFocus
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Enter yout keywords...
            "
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onSearchProduct}
                >
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
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

export default Custom404;
