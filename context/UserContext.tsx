import React, { useState, createContext, useEffect } from "react";
import { UserContextState } from "../types/context.types";
import { User } from "../types/auth.types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};

const contextDefaultValues: UserContextState = {
  user: null,
  btnLoader: false,
  bookmarks: [],
  login: (user: User) => {},
  register: (user: User) => {},
  getUser: () => {},
  toggleBookmark: (showId: string) => {},
};

const UserContext = createContext<UserContextState>(contextDefaultValues);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState(contextDefaultValues.user);
  const [btnLoader, setBtnLoader] = useState(contextDefaultValues.btnLoader);
  const [bookmarks, setBookmarks] = useState(contextDefaultValues.bookmarks);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const register = async (user: User) => {
    const { email, password } = user;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setBtnLoader(true);
    await axios
      .post("/api/auth/register", { email, password }, config)
      .then((res) => {
        setBtnLoader(false);
        setUser(res.data.user);
        setBookmarks(res.data.bookmarks);
        router.push("/");
      })
      .catch((err) => {
        setBtnLoader(false);
        toast.error(err.response.data.message);
      });
  };

  const login = (user: User) => {
    const { email, password } = user;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setBtnLoader(true);
    axios
      .post("/api/auth/login", { email, password }, config)
      .then((res) => {
        setBtnLoader(false);
        setUser(res.data.user);
        setBookmarks(res.data.bookmarks);
        router.push("/");
      })
      .catch((err) => {
        setBtnLoader(false);
        toast.error(err.response.data.message);
      });
  };

  const getUser = async () => {
    await axios
      .get("/api/auth/user")
      .then((res) => {
        setUser(res.data.user);
        setBookmarks(res.data.bookmarks);
      })
      .catch((err) => {});
  };

  const toggleBookmark = async (showId: string) => {
    if (!user) {
      toast.error("Login first!");
      return;
    }

    await axios
      .post(`/api/bookmarks/change?showId=${showId}`)
      .then((res) => {
        setBookmarks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        btnLoader,
        bookmarks,
        login,
        register,
        getUser,
        toggleBookmark,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
