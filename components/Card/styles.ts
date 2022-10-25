import styled from "styled-components";

export const CardCover = styled.div`
  position: relative;
  width: 100%;

  .play {
    opacity: 0;
    transition: 0.2s ease-in opacity;

    &:hover {
      opacity: 1;
    }
  }
`;

export const CardImage = styled.img`
  width: 100%;
  max-height: 174px;
  object-fit: cover;
  border-radius: 8px;
`;

export const CardInfo = styled.p`
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
`;

export const CardTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;
