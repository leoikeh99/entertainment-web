import React from "react";
import { Cards, Heading } from "../styles/Main.styles";
import { Show } from "../types/component.types";
import Card from "./Card";

type _SearchResults = {
  results: Show[];
  text: string;
};

const SearchResults = ({ results, text }: _SearchResults) => {
  return (
    <div>
      <Heading>
        Found {results.length} for '{text}'
      </Heading>

      <Cards>
        {results.map((show, index) => (
          <Card key={index} show={show} />
        ))}
      </Cards>
    </div>
  );
};

export default SearchResults;
