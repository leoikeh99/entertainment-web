import React, { useState, useContext } from "react";
import { NextPage } from "next";
import Link from "next/link";
import * as styles from "../styles/Auth.styles";
import { validateLogin } from "../utils";
import Layout from "../components/Layout";
import UserContext from "../context/UserContext";

interface Error {
  type: string;
  msg: string;
}

const Login: NextPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Error | null>(null);
  const { btnLoader, login } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateLogin(values)) {
      setError(validateLogin(values));
      return;
    }
    setError(null);
    login({ email: values.email, password: values.password });
  };

  return (
    <Layout title="Login">
      <styles.AuthContainer>
        <styles.Logo>
          <Link href="/">
            <img src="/assets/logo.svg" alt="logo" />
          </Link>
        </styles.Logo>
        <styles.AuthForm onSubmit={handleSubmit}>
          <styles.Header>Login</styles.Header>
          <styles.InputWrapper
            error={error && error.type === "email" ? error.msg : null}>
            <styles.Input
              placeholder="Email address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </styles.InputWrapper>
          <styles.InputWrapper
            error={error && error.type === "password" ? error.msg : null}>
            <styles.Input
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </styles.InputWrapper>
          <styles.Button type="submit">
            {btnLoader ? "Loading..." : "Login to your account"}
          </styles.Button>
          <styles.Text>
            Don't have an account? <Link href="/register">Sign Up</Link>
          </styles.Text>
        </styles.AuthForm>
      </styles.AuthContainer>
    </Layout>
  );
};

export default Login;
