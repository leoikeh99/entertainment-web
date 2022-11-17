import React, { useContext } from "react";
import * as styles from "./styles";
import Image from "next/image";
import UserContext from "../../context/UserContext";
import { ShowProps } from "../../types/component.types";
import { BookMark, Overlay, PlayBtn } from "../../styles/Widgets";

const TrendingItem = ({
  show: { year, category, rating, title, thumbnail, id },
}: ShowProps) => {
  const { bookmarks, user, toggleBookmark } = useContext(UserContext);
  return (
    <styles.TrendingItemCover trending={thumbnail.trending}>
      <div className="play">
        <Overlay></Overlay>
        <PlayBtn>
          <img src="/assets/icon-play.svg" alt="play_icon" />
          Play
        </PlayBtn>
      </div>
      <BookMark onClick={() => toggleBookmark(id)}>
        {user && bookmarks.some((bookmark) => bookmark.showId === id) ? (
          <img src="/assets/icon-bookmark-full.svg" alt="b-full" />
        ) : (
          <img src="/assets/icon-bookmark-empty.svg" alt="b-empty" />
        )}
      </BookMark>
      <p>
        {year}{" "}
        <Image src="/assets/oval.svg" height={3} width={3} alt="oavl_icon" />
        <span>
          <Image
            src={`/assets/icon-category-${
              category === "Movie" ? "movie" : "tv"
            }.svg`}
            height={12}
            width={12}
            alt="category_icon"
          />
          {category}
        </span>
        <Image src="/assets/oval.svg" height={3} width={3} alt="oval_icon" />
        {rating}
      </p>
      <h3>{title}</h3>
    </styles.TrendingItemCover>
  );
};

export default TrendingItem;
