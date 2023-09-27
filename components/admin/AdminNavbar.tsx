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
import { MenuOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { UiContext } from "@/context";

export const AdminNavbar = () => {
  const { openSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar
        style={{
          margin: "0 auto",
          maxWidth: "1400px",
          width: "100%",
          padding: 0,
          borderBottom: "1px solid #D9D9D9",
          backgroundColor: "#fff",
        }}
      >
        <NextLink href={"/"} passHref legacyBehavior>
          <Link display={"flex"} alignItems={"center"}>
            <Typography variant="h1">Expression</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <IconButton onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
