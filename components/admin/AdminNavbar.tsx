import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  IconButton,
} from "@mui/material";
import NextLink from "next/link";
import MenuIcon from "../../public/icons/menu.svg";
import { useContext } from "react";
import { UiContext } from "@/context";
import Image from 'next/image';

export const AdminNavbar = () => {
  const { openSideMenu } = useContext(UiContext);

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
        <Box flex={1} />
        <IconButton onClick={openSideMenu}>
          <Image src={MenuIcon} alt="Menu Icon" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
