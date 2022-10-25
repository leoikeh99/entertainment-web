import type { NextApiRequest, NextApiResponse } from "next";
import registerSchema from "../../../schemas/registerSchema";
import { JWT_SECRET } from "../../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { Payload, User } from "../../../types/auth.types";
import validate from "../../../middleware/validate";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password }: User = req.body;

    const user = { email, password };
    user.email = user.email.toLocaleLowerCase();

    const client = await clientPromise;
    const db = client.db("myFirstDatabase");

    const checkEmail = await db
      .collection("_users")
      .findOne({ email: user.email });

    if (checkEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const newUser = await db.collection("_users").insertOne(user);

    try {
      const payload: Payload = {
        user: {
          id: newUser.insertedId.toString(),
        },
      };
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
      res.status(200).json({
        message: "Registration successfull",
        user: { id: newUser.insertedId.toString(), email: user.email },
        bookmarks: [],
        token,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default validate(registerSchema, handler);
