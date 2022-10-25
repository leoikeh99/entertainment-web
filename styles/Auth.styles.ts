import styled from "styled-components";

type Error = {
  error: string | null;
};

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 82px;
  cursor: pointer;

  @media (max-width: 436px) {
    margin-bottom: 58px;
  }
`;

export const AuthContainer = styled.div`
  margin-top: 78px;

  a {
    color: #fc4747;
    font-size: 15px;
    font-weight: 300;
  }
`;

export const AuthForm = styled.form`
  width: 400px;
  padding: 32px;
  background: #161d2f;
  border-radius: 20px;
  margin: 0 auto;

  @media (max-width: 436px) {
    width: 90%;
  }
`;
export const Header = styled.h3`
  font-size: 32px;
  font-weight: 300;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 40px;
`;

export const Input = styled.input`
  width: 100%;
  height: 37px;
  padding-bottom: 17px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #5a698f;
  font-size: 15px;
  font-weight: 300;
  color: #fff;
  margin-bottom: 24px;
  padding-left: 18px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.5;
  }

  &:focus {
    border-bottom: 1px solid #fff;
  }

  &:after {
    content: "Leonard";
  }
`;

export const InputWrapper = styled.div<Error>`
  position: relative;

  &:after {
    content: "${(props) => props.error && props.error}";
    position: absolute;
    color: #fc4747;
    font-size: 13px;
    font-weight: 300;
    top: 0px;
    right: 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  font-size: 15px;
  font-weight: 300;
  color: #fff;
  background: #fc4747;
  border: none;
  border-radius: 6px;
  margin: 16px 0 24px 0;

  &:hover {
    background: #ffffff;
    color: #161d2f;
    cursor: pointer;
  }
`;

export const Text = styled.p`
  color: #fff;
  font-size: 15px;
  font-weight: 300;
  text-align: center;
`;
