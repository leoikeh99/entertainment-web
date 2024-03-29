import React, { useContext } from "react";
import Image from "next/image";
import { BookMark, Overlay, PlayBtn } from "../../styles/Widgets";
import { ShowProps } from "../../types/component.types";
import { CardCover, CardImage, CardInfo, CardTitle } from "./styles";
import UserContext from "../../context/UserContext";

const Card = ({
  show: { thumbnail, year, category, rating, title, id },
}: ShowProps) => {
  const { bookmarks, user, toggleBookmark } = useContext(UserContext);
  return (
    <CardCover>
      <BookMark onClick={() => toggleBookmark(id)}>
        {user && bookmarks.some((bookmark) => bookmark.showId === id) ? (
          <img src="/assets/icon-bookmark-full.svg" alt="b-full" />
        ) : (
          <img src="/assets/icon-bookmark-empty.svg" alt="b-empty" />
        )}
      </BookMark>
      <div style={{ position: "relative", maxHeight: "174px" }}>
        <div className="play">
          <Overlay />
          <PlayBtn>
            <img src="/assets/icon-play.svg" alt="play_icon" />
            Play
          </PlayBtn>
        </div>
        <CardImage src={thumbnail.regular.small} alt="show_image" />
      </div>
      <CardInfo>
        {year}{" "}
        <Image src="/assets/oval.svg" height={3} width={3} alt="oval_image" />
        <span>
          <Image
            src={`/assets/icon-category-${
              category === "Movie" ? "movie" : "tv"
            }.svg`}
            height={12}
            width={12}
            alt="category_image"
          />
          {category}
        </span>
        <Image src="/assets/oval.svg" height={3} width={3} alt="oval_image" />
        {rating}
      </CardInfo>
      <CardTitle>{title}</CardTitle>
    </CardCover>
  );
};

export default Card;
