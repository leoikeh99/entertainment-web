export type ShowProps = {
  show: {
    id: string;
    year: number;
    category: string;
    rating: string;
    title: string;
    isBookmarked: boolean;
    thumbnail: {
      trending?: {
        small: string;
        large: string;
      };
      regular: {
        small: string;
        medium: string;
        large: string;
      };
    };
  };
};

export type Show = {
  id: string;
  year: number;
  category: string;
  rating: string;
  title: string;
  isBookmarked: boolean;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
};
