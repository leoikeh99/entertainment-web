import type { NextPage } from "next";
import Layout from "../components/Layout";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import { SearcBar, Input } from "../styles/SerachBar.styles";

const Home: NextPage = () => {
  return (
    <Layout title="Web Entertainment | Home">
      <Sidebar />
      <SearcBar>
        <Image src="/assets/icon-search.svg" width={32} height={32} />
        <Input placeholder="Search for movies or TV series" />
      </SearcBar>
    </Layout>
  );
};

export default Home;
