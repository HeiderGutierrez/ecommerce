import React from "react";
import Head from "next/head";
import { Navbar, SideMenu } from "../ui";
import { Footer } from "../ui/Footer";
import { Box, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imageFull?: string;
}

export const ShopLayout = ({
  children,
  title,
  pageDescription,
  imageFull,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFull && <meta name="og:image" content={imageFull} />}
      </Head>
      {/* navbar */}
      <Navbar />
      {/* sidebar */}
      <SideMenu />
      {/* main */}
      <Box sx={{ background: "#232323", padding: "20px", my: "70px" }}>
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "1400px",
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <Typography variant="h2" sx={{ color: "#FFFFFF" }} fontSize={16}>
            {title}
          </Typography>
        </Box>
      </Box>
      <main>
        {children}
      </main>
      {/* footer */}
      <Footer />
    </>
  );
};
