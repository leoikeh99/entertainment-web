import styled from "styled-components";

export const SearcBar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 28px;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  padding-bottom: 14px;
  color: #fff;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 32px;
  font-weight: 300;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.5;
  }

  &:focus {
    border-bottom: 1px solid #5a698f;
  }
`;
