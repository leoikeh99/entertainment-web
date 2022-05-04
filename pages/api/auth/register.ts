// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import registerSchema from "../../../schemas/registerSchema";
import { OptionalObjectSchema, ObjectShape } from "yup/lib/object";
import { BASE_URL, JWT_SECRET } from "../../../config";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

type User = {
  email: string;
  password: string;
};

type payload = {
  user: { id: string };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password }: User = req.body;

    const user = { email, password };
    user.email = user.email.toLocaleLowerCase();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(`${BASE_URL}/users?email=${email}`)
      .then(async (val) => {
        if (val.data.length !== 0) {
          return res.status(400).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await axios
          .post(`${BASE_URL}/users`, user, config)
          .then(async (val2) => {
            const payload: payload = {
              user: {
                id: val2.data.id,
              },
            };

            try {
              const token = await jwt.sign(payload, JWT_SECRET as string, {
                expiresIn: 3600,
              });
              res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== "development",
                  maxAge: 60 * 60 * 24 * 7,
                  sameSite: "strict",
                  path: "/",
                })
              );
              res.status(200).json({ token });
            } catch (error) {
              return res.status(400).json(error);
            }
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export function validate(
  registerSchema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      try {
        await registerSchema.validate(req.body);
      } catch (error: any) {
        return res.status(400).json({ message: error.errors });
      }
    }
    await handler(req, res);
  };
}

export default validate(registerSchema, handler);
