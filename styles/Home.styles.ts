import styled from "styled-components";

type _ScrollSide = {
  side: "left" | "right";
};

export const Container = styled.div`
  padding: 0 36px 0 164px;
  margin-top: 44px;
`;

export const Heading = styled.h3`
  font-size: 32px;
  font-weight: 300;
  line-height: 40px;
  margin-bottom: 25px;
  color: #fff;
`;

export const TrendingCover = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

export const Trending = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  gap: 40px;
  white-space: nowrap;
  padding-bottom: 6px;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    height: 10px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    background: #161d2f;
    border-radius: 10px;
  }
`;

export const ScrollSide = styled.div<_ScrollSide>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.side === "left" ? "0" : "unset")};
  right: ${(props) => (props.side === "right" ? "0" : "unset")};
  width: 65px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  i {
    display: block;
    position: absolute;
    top: 45%;
    left: 40%;
    margin: auto;
    color: #fff;
    font-size: 25px;
  }

  &:before {
    content: "";
    top: 0;
    left: 0;
    width: 100px;
    height: 100%;
    box-shadow: ${(props) =>
      props.side === "left"
        ? "20px 0px 20px 12px rgba(0, 0, 0, 0.85) inset"
        : "-20px 0px 20px 12px rgba(0, 0, 0, 0.85) inset"};
    -webkit-box-shadow: ${(props) =>
      props.side === "left"
        ? "20px 0px 20px 12px rgba(0, 0, 0, 0.85) inset"
        : "-20px 0px 20px 12px rgba(0, 0, 0, 0.85) inset"};
    -moz-box-shadow: ${(props) =>
      props.side === "left"
        ? "20px 0px 20px 12px rgba(0, 0, 0, 0.85) inset"
        : "-20px 0px 20px 12px rgba(0, 0, 0, 0.85) inset"};
  }

  @media (max-width: 420px) {
  }
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
`;

export const Leo = styled.div`
  display: flex;
  align-items: center;
`;
