import React, { useState } from "react";
import Layout from "../components/Layout";
import * as M from "../styles/Main.styles";
import Image from "next/image";
import data from "../data.json";
import Card from "../components/Card";
import { Input, SearcBar } from "../styles/SerachBar.styles";
import { Show } from "../types/component.types";
import SearchResults from "../components/SearchResults";

const Series = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Show[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const filtered = data
      .filter((show) => show.category === "TV Series")
      .filter(
        (show) =>
          show.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          show.year.toString().includes(e.target.value)
      );

    setResults(filtered);
  };
  return (
    <Layout title="Entertainment Web | TV Series">
      <M.Container>
        <SearcBar>
          <Image src="/assets/icon-search.svg" width={32} height={32} />
          <Input
            placeholder="Search for TV series"
            value={search}
            onChange={handleChange}
          />
        </SearcBar>
        {search.trim() === "" ? (
          <>
            <M.Heading>TV Series</M.Heading>
            <M.Cards>
              {data
                .filter((show) => show.category === "TV Series")
                .map((show, index) => (
                  <Card key={index} show={show} />
                ))}
            </M.Cards>
          </>
        ) : (
          <SearchResults results={results} text={search} />
        )}
      </M.Container>
    </Layout>
  );
};

export default Series;
