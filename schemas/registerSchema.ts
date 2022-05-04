import { object, string, TypeOf } from "yup";

const schema = object({
  email: string().email().required(),
  password: string().min(6).required(),
});

// export type Register = TypeOf<typeof schema>;

export default schema;
