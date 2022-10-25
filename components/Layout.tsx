import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";

type _Layout = {
  title: string;
  keywords?: string;
  desc?: string;
  children?: ReactNode;
};

const Layout = ({ title, keywords, desc, children }: _Layout) => {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState("/");
  const router = useRouter();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setPage(router.pathname);
  }, [router.pathname]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
      </Head>
      {page !== "/login" && page !== "/register" && ready && <Sidebar />}
      <div className="layout" style={{ paddingBottom: "52px" }}>
        {ready && children}
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Web Entertainment",
  desc: "Browse the latest movies and tv shows",
  keywords: "movies, tv, series, shows, watch",
};

export default Layout;
