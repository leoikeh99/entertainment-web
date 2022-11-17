import React, { useState, useContext } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import * as M from "../styles/Main.styles";
import UserContext from "../context/UserContext";
import data from "../data.json";
import { Input, SearcBar } from "../styles/SerachBar.styles";
import Card from "../components/Card";
import { Show } from "../types/component.types";
import SearchResults from "../components/SearchResults";

const Bookmarks = () => {
  const { bookmarks } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Show[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const filtered = data
      .filter((show) =>
        bookmarks.some((bookmark) => bookmark.showId === show.id)
      )
      .filter(
        (show) =>
          show.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          show.year.toString().includes(e.target.value)
      );

    setResults(filtered);
  };
  return (
    <Layout title="Entertainment Web | Bookmarks">
      <M.Container>
        <SearcBar>
          <Image
            src="/assets/icon-search.svg"
            width={32}
            height={32}
            alt="search_icon"
          />
          <Input
            placeholder="Search for bookmarked shows"
            value={search}
            onChange={handleChange}
          />
        </SearcBar>
        {search.trim() === "" ? (
          <>
            <M.Heading>Bookmarked Movies</M.Heading>
            {data.filter(
              (show) =>
                show.category === "Movie" &&
                bookmarks.some((bookmark) => bookmark.showId === show.id)
            ).length !== 0 ? (
              <M.Cards>
                {data
                  .filter(
                    (show) =>
                      show.category === "Movie" &&
                      bookmarks.some((bookmark) => bookmark.showId === show.id)
                  )
                  .map((show, index) => (
                    <Card key={index} show={show} />
                  ))}
              </M.Cards>
            ) : (
              <p style={{ color: "#fff" }}>Bookmarks Empty</p>
            )}
            <div style={{ marginBottom: "30px" }}></div>
            <M.Heading>Bookmarked TV Series</M.Heading>
            {data.filter(
              (show) =>
                show.category === "TV Series" &&
                bookmarks.some((bookmark) => bookmark.showId === show.id)
            ).length !== 0 ? (
              <M.Cards>
                {data
                  .filter(
                    (show) =>
                      show.category === "TV Series" &&
                      bookmarks.some((bookmark) => bookmark.showId === show.id)
                  )
                  .map((show, index) => (
                    <Card key={index} show={show} />
                  ))}
              </M.Cards>
            ) : (
              <p style={{ color: "#fff" }}>Bookmarks Empty</p>
            )}
          </>
        ) : (
          <SearchResults results={results} text={search} />
        )}
      </M.Container>
    </Layout>
  );
};

export default Bookmarks;
