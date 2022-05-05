import React from "react";
import * as styles from "./styles";
import Image from "next/image";
import HomeIcon from "../../public/assets/icon-nav-home.svg";
import MoviesIcon from "../../public/assets/icon-nav-movies.svg";
import SeriesIcon from "../../public/assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../../public/assets/icon-nav-bookmark.svg";

export default function Sidebar() {
  return (
    <styles.Cover>
      <div>
        <Image src="/assets/logo.svg" width={32} height={25.6} />
        <styles.Navigation>
          <HomeIcon fill="#5A698F" />
          <MoviesIcon fill="#5A698F" />
          <SeriesIcon fill="#5A698F" />
          <BookmarkIcon fill="#5A698F" />
        </styles.Navigation>
      </div>
      <Image src="/assets/image-avatar.png" width={40} height={40} />
    </styles.Cover>
  );
}
