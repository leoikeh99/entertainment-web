import React, { useState } from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Image from "next/image";
import { SearcBar, Input } from "../styles/SerachBar.styles";
import * as styles from "../styles/Home.styles";
import data from "../data.json";
import TrendingItem from "../components/TrendingItem";
import Card from "../components/Card";
import { Show } from "../types/component.types";
import SearchResults from "../components/SearchResults";
import { Cards, Container } from "../styles/Main.styles";
import clientPromise from "../lib/mongodb";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Show[]>([]);

  const scroll = (dir: string) => {
    const trending = document.getElementById("trending")!;
    if (dir === "right") {
      trending.scrollLeft += 350;
    } else {
      trending.scrollLeft -= 350;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const filtered = data.filter(
      (show) =>
        show.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        show.year.toString().includes(e.target.value)
    );

    setResults(filtered);
  };

  return (
    <Layout title="Web Entertainment | Home">
      <Container>
        <SearcBar>
          <Image src="/assets/icon-search.svg" width={32} height={32} />
          <Input
            placeholder="Search for movies or TV series"
            value={search}
            onChange={handleChange}
          />
        </SearcBar>
        {search.trim() === "" ? (
          <>
            <styles.Heading>Trending</styles.Heading>
            <styles.TrendingCover>
              <styles.ScrollSide side="left" onClick={() => scroll("left")}>
                <i className="fa-solid fa-chevron-left" />
              </styles.ScrollSide>
              <styles.ScrollSide side="right" onClick={() => scroll("right")}>
                <i className="fa-solid fa-chevron-right" />
              </styles.ScrollSide>
              <styles.Trending id="trending">
                {data.map(
                  (show, index) =>
                    show.thumbnail.trending && (
                      <TrendingItem key={index} show={show} />
                    )
                )}
              </styles.Trending>
            </styles.TrendingCover>
            <styles.Heading>Recommended for you</styles.Heading>
            <Cards>
              {data
                .filter((show) => !show.isTrending)
                .map((show, index) => (
                  <Card key={index} show={show} />
                ))}
            </Cards>
          </>
        ) : (
          <SearchResults results={results} text={search} />
        )}
      </Container>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  // const client = await clientPromise;
  // const db = client.db("myFirstDatabase");

  // const carts = await db.collection("carts").find({}).limit(20).toArray();

  // console.log(carts);

  return {
    props: {},
  };
}
