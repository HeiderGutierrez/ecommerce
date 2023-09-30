import React from "react";
import { SideMenu } from "../ui";
import { AdminNavbar } from "../admin";
import { Box, Typography } from "@mui/material";
import { Footer } from "../ui/Footer";

interface Props {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

export const AdminLayout = ({
  children,
  title,
  subTitle,
  icon,
}: Props) => {
  return (
    <>
      {/* navbar */}
      <AdminNavbar />
      {/* sidebar */}
      <SideMenu />
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
      {/* main */}
      <main>
        {children}
      </main>
      {/* footer */}
      <Footer />
    </>
  );
};
