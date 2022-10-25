import styled from "styled-components";
import { _TrendingItemCover } from "../../types/styled.types";

export const TrendingItemCover = styled.div<_TrendingItemCover>`
  min-width: 470px;
  height: 230px;
  border-radius: 8px;
  background-image: url(${({ trending }) => trending && trending.small});
  background-position: center;
  bacground-size: cover;
  object-fit: center;
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  z-index: 1;

  .play {
    opacity: 0;
    transition: 0.2s ease-in opacity;

    &:hover {
      opacity: 1;
    }
  }

  p {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 15px;
    font-weight: 300;
    color: #fff;
    opacity: 0.75;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  h3 {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
  }

  @media (max-width: 420px) {
    min-width: 240px;
    height: 140px;
  }
`;
