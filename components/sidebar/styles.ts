import styled from "styled-components";

export const Cover = styled.div`
  height: calc(100% - 64px);
  max-height: 960px;
  width: 96px;
  background: #161d2f;
  border-radius: 20px;
  position: fixed;
  top: 32px;
  left: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 35px 0 32px 0;
  z-index: 5;

  i {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

  img.avatar {
    border: 1px solid #fff;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  @media (max-width: 815px) {
    position: sticky;
    width: 94%;
    margin: auto;
    height: 72px;
    flex-direction: row;
    padding: 0 24px;
    margin-top: 24px;
    top: 0;
    left: 0;
    z-index: 20;
  }

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
    margin-top: 0;
  }
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: -150px;

  svg {
    cursor: pointer;
    &:hover {
      fill: #fc4747;
    }
  }

  @media (max-width: 815px) {
    flex-direction: row;
    margin-top: 0;
  }

  @media (max-width: 500px) {
    gap: 20px;
  }
`;
