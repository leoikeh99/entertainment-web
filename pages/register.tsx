import React, { useState, useContext } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import * as styles from "../styles/Auth.styles";
import { validateRegister } from "../utils";
import UserContext from "../context/UserContext";

interface Error {
  type: string;
  msg: string;
}

const Register: NextPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState<Error | null>(null);
  const { btnLoader, register } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateRegister(values)) {
      setError(validateRegister(values));
      return;
    }
    setError(null);
    register({ email: values.email, password: values.password });
  };

  return (
    <Layout title="Sign Up">
      <styles.AuthContainer>
        <styles.Logo>
          <img src="/assets/logo.svg" alt="logo" />
        </styles.Logo>
        <styles.AuthForm onSubmit={handleSubmit}>
          <styles.Header>Sign Up</styles.Header>
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
          <styles.InputWrapper
            error={error && error.type === "password2" ? error.msg : null}>
            <styles.Input
              placeholder="Repeat password"
              type="password"
              name="password2"
              value={values.password2}
              onChange={handleChange}
            />
          </styles.InputWrapper>
          <styles.Button type="submit">
            {btnLoader ? "Loading..." : "Create an account"}
          </styles.Button>
          <styles.Text>
            Already have an account? <Link href="/login">Login</Link>
          </styles.Text>
        </styles.AuthForm>
      </styles.AuthContainer>
    </Layout>
  );
};

export default Register;
