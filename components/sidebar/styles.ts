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
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 75px;

  svg {
    cursor: pointer;
    &:hover {
      fill: #fff;
    }
  }
`;
