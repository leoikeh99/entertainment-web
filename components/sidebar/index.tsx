import React, { useEffect, useContext } from "react";
import * as styles from "./styles";
import Image from "next/image";
import HomeIcon from "../../public/assets/icon-nav-home.svg";
import MoviesIcon from "../../public/assets/icon-nav-movies.svg";
import SeriesIcon from "../../public/assets/icon-nav-tv-series.svg";
import BookmarkIcon from "../../public/assets/icon-nav-bookmark.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import UserContext from "../../context/UserContext";

export default function Sidebar() {
  const [active, setActive] = React.useState("home");
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  return (
    <styles.Cover>
      <Image src="/assets/logo.svg" width={32} height={25.6} alt="logo" />
      <styles.Navigation>
        <Link href="/" passHref>
          <a>
            <HomeIcon fill={active === "/" ? "#fff" : "#5A698F"} />
          </a>
        </Link>
        <Link href="/movies" passHref>
          <a>
            <MoviesIcon fill={active === "/movies" ? "#fff" : "#5A698F"} />
          </a>
        </Link>
        <Link href="/series" passHref>
          <a>
            <SeriesIcon fill={active === "/series" ? "#fff" : "#5A698F"} />
          </a>
        </Link>
        {user && (
          <Link href="/bookmarks" passHref>
            <a>
              <BookmarkIcon
                fill={active === "/bookmarks" ? "#fff" : "#5A698F"}
              />
            </a>
          </Link>
        )}
      </styles.Navigation>
      {user ? (
        <img className="avatar" src="/assets/image-avatar.png" alt="avatar" />
      ) : (
        <Link href="/login" passHref>
          <i className="fa-solid fa-arrow-right-to-bracket" />
        </Link>
      )}
    </styles.Cover>
  );
}
