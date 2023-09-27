import React from "react";
import Head from "next/head";
import { Navbar, SideMenu } from "../ui";
import { Footer } from "../ui/Footer";

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
      <main
        style={{ margin: "100px auto", maxWidth: "1400px", padding: "0px 30px" }}
      >
        {children}
      </main>
      {/* footer */}
      <Footer />
    </>
  );
};
