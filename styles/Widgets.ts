import styled from "styled-components";

export const BookMark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  background-color: rgb(16, 20, 30, 0.5);
  position: absolute;
  top: 16px;
  right: 16px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 6;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #000;
  opacity: 50%;
  cursor: pointer;
  z-index: 3;
`;

export const PlayBtn = styled.button`
  width: 117px;
  height: 48px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  z-index: 5;
  display: flex;
  align-items: center;
  padding-left: 9px;
  gap: 19px;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 25%;
    border-radius: 28.5px;
  }
`;
