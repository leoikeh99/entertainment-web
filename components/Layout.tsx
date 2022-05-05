import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

type _Layout = {
  title: string;
  keywords?: string;
  desc?: string;
  children?: ReactNode;
};

const Layout = ({ title, keywords, desc, children }: _Layout) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Cover>{ready && children}</Cover>
    </div>
  );
};

Layout.defaultProps = {
  title: "Web Entertainment",
  desc: "Browse the latest movies and tv shows",
  keywords: "movies, tv, series, shows, watch",
};

const Cover = styled.div`
  padding: 0 36px 0 164px;
  margin-top: 44px;
`;

export default Layout;
