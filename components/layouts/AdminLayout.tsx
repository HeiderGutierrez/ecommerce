import React from "react";
import { SideMenu } from "../ui";
import { AdminNavbar } from "../admin";
import { Box, Typography } from "@mui/material";

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
      {/* main */}
      <main
        style={{ margin: "80px auto", maxWidth: "1400px", padding: "0px 30px" }}
      >
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant="h1" component={'h1'} fontFamily={'Evo'} mb={2}>
                {icon} {title}
            </Typography>
            <Typography variant="h2" mb={1}>
                {subTitle}
            </Typography>
        </Box>
        <Box className="fadeIn">
            {children}
        </Box>
      </main>
    </>
  );
};
