import styled from "styled-components";

export const Container = styled.div`
  padding: 0 36px 0 164px;
  margin-top: 44px;

  @media (max-width: 815px) {
    margin: auto;
    margin-top: 40px;
    padding: 0;
    width: 90%;
  }

  @media (max-width: 400px) {
    width: 94%;
  }
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 30px;
  justify-content: flex-start;

  @media (max-width: 672px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 25px;
  }

  @media (max-width: 606px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 15px;
  }

  @media (max-width: 483px) {
    grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
    grid-gap: 15px;
  }
`;

export const Heading = styled.h3`
  font-size: 32px;
  font-weight: 300;
  line-height: 40px;
  margin-bottom: 25px;
  color: #fff;
`;
