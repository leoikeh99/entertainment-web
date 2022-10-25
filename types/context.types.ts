import { User } from "./auth.types";

export type UserContextState = {
  user: {
    id: string;
    email: string;
  } | null;
  btnLoader: Boolean;
  bookmarks:
    | {
        id: string;
        userId: string;
        showId: string;
      }[]
    | [];
  login: (user: User) => void;
  register: (user: User) => void;
  getUser: () => void;
  toggleBookmark: (showId: string) => void;
};
