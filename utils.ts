import emailValidator from "email-validator";

export const validateLogin = (values: any) => {
  if (!emailValidator.validate(values.email)) {
    return {
      type: "email",
      msg: "Invalid email",
    };
  }
  if (values.password.trim() === "") {
    return {
      type: "password",
      msg: "Can't be empty",
    };
  }

  return null;
};

export const validateRegister = (values: any) => {
  if (!emailValidator.validate(values.email)) {
    return {
      type: "email",
      msg: "Invalid email",
    };
  }
  if (values.password.trim() === "") {
    return {
      type: "password",
      msg: "Can't be empty",
    };
  }
  if (values.password.trim().length < 6) {
    return {
      type: "password",
      msg: "Min 6 characters",
    };
  }
  if (values.password !== values.password2) {
    return {
      type: "password2",
      msg: "Password doesn't match",
    };
  }
  return null;
};
