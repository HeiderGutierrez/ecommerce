import { Box } from "@mui/material";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="main__auth">
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          {children}
        </Box>
      </main>
    </>
  );
};
