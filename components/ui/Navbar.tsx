import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";
import NextLink from "next/link";
import { ClearOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext, UiContext } from "@/context";
import Image from "next/image";
import Searchicon from "../../public/icons/search.svg";
import ShoppingCartIcon from "../../public/icons/shopping-cart.svg";
import MenuIcon from "../../public/icons/menu.svg";

export const Navbar = () => {
  const { openSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);
  const [searchProduct, setSearchProduct] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { route, push } = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchProduct();
    }
  };

  const onSearchProduct = () => {
    if (searchProduct.trim().length === 0) return;
    setSearchProduct("");
    setIsSearchVisible(false);
    push(`/search/${searchProduct}`);
  };

  return (
    <AppBar sx={{width: '100%', height: '70px'}}>
      <Toolbar
        sx={{
          margin: "0 auto",
          maxWidth: "1400px",
          width: "100%",
          height: "100%",
          padding: { xs: "0 20px", md: 0 },
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NextLink href={"/"} passHref legacyBehavior>
          <Link display={"flex"} alignItems={"center"}>
            <Typography variant="h1" sx={{ fontSize: { xs: 20, md: 30 }, textTransform: 'uppercase' }}>
              Expre<span style={{fontWeight: 500}} >ssion</span>
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} sx={{ display: { xs: "none", md: "block" } }} />
        {!isSearchVisible && (
          <Box sx={{ display: { xs: "none", md: "block" } }} className="fadeIn">
            <NextLink href={"/category/men"} passHref legacyBehavior>
              <Link>
                <Button
                  className={`menu-item ${
                    route === "/category/men" ? "active" : ""
                  }`}
                >
                  Men
                </Button>
              </Link>
            </NextLink>
            <NextLink href={"/category/women"} passHref legacyBehavior>
              <Link>
                <Button
                  className={`menu-item ${
                    route === "/category/women" ? "active" : ""
                  }`}
                >
                  Women
                </Button>
              </Link>
            </NextLink>
            <NextLink href={"/category/kids"} passHref legacyBehavior>
              <Link>
                <Button
                  className={`menu-item ${
                    route === "/category/kids" ? "active" : ""
                  }`}
                >
                  Kids
                </Button>
              </Link>
            </NextLink>
          </Box>
        )}

        <Box flex={1} sx={{ display: { xs: "none", md: "block" } }} />
        <Box display={'flex'} alignItems={'center'}>
          {/* Pantallas grandes */}
          {!isSearchVisible && (
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              className="fadeIn"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Image src={Searchicon} alt="Search Icon" />
            </IconButton>
          )}
          {isSearchVisible && (
            <Input
              type="text"
              autoFocus
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              onKeyDown={handleKeyDown}
              className="fadeIn"
              sx={{ display: { xs: "none", md: "flex" } }}
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsSearchVisible(false)}
                  >
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
          {/* Pantallas pequeñas */}
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={openSideMenu}
          >
            <Image src={Searchicon} alt="Search Icon" />
          </IconButton>
          <NextLink href={"/cart"} passHref legacyBehavior>
            <Link>
              <IconButton>
                <Badge
                  badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                  color={"secondary"}
                >
                  <Image src={ShoppingCartIcon} alt="Shopping Cart Icon" />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>
          <IconButton onClick={openSideMenu}>
            <Image src={MenuIcon} alt="Menu Icon" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
