import Head from "next/head";
import React, { FC } from "react";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children?: React.ReactNode;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  imageFullUrl,
  pageDescription,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:decription" content={pageDescription} />
        <meta name="og:title" content={title} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{ margin: "80px auto", padding: "0px 30px", maxWidth: "1440px" }}
      >
        {children}
      </main>
      <footer>custom footer</footer>
    </>
  );
};
