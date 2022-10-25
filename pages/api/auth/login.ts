// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Payload } from "../../../types/auth.types";
import { BASE_URL, JWT_SECRET } from "../../../config";
import validate from "../../../middleware/validate";
import registerSchema from "../../../schemas/registerSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import clientPromise from "../../../lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  const { email, password } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const user = await db
    .collection("_users")
    .findOne({ email: email.toLocaleLowerCase() });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const bookmarks = await db
    .collection("bookmarks")
    .find({ user: user._id })
    .toArray();

  try {
    const payload: Payload = {
      user: {
        id: user._id.toString(),
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
      message: "Login successfull",
      user: { id: user._id, email: user.email },
      bookmarks,
      token,
    });
  } catch (error: any) {
    return res.status(400).json(error);
  }

  // await axios
  //   .get(`${BASE_URL}/_users?email=${email}`)
  //   .then(async (val) => {
  //     if (val.data.length === 0) {
  //       return res.status(400).json({ message: "Invalid credentials" });
  //     }
  //     const checkPass = await bcrypt.compare(password, val.data[0].password);
  //     if (!checkPass) {
  //       return res.status(400).json({ message: "Invalid credentials" });
  //     }

  //     try {
  //       const payload: Payload = {
  //         user: {
  //           id: val.data[0].id,
  //         },
  //       };
  //       const token = await jwt.sign(payload, JWT_SECRET as string, {
  //         expiresIn: 3600,
  //       });
  //       res.setHeader(
  //         "Set-Cookie",
  //         cookie.serialize("token", token, {
  //           httpOnly: true,
  //           secure: process.env.NODE_ENV !== "development",
  //           maxAge: 60 * 60 * 24 * 7,
  //           sameSite: "strict",
  //           path: "/",
  //         })
  //       );

  //       const res2 = await axios.get(
  //         `${BASE_URL}/_bookmarks?userId=${val.data[0].id}`
  //       );

  //       res.status(200).json({
  //         message: "Login successfull",
  //         user: { id: val.data[0].id, email: val.data[0].email },
  //         bookmarks: res2.data,
  //         token,
  //       });
  //     } catch (error: any) {
  //       return res.status(400).json(error);
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(400).json({ error });
  //   });
};

export default validate(registerSchema, handler);
