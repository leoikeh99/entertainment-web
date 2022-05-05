import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Payload } from "../types/auth.types";
import { JWT_SECRET } from "../config";

function authenticate(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }

    if (!req.headers.cookie) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { token } = cookie.parse(req.headers.cookie);

    try {
      const payload: Payload = await (<Payload>(
        jwt.verify(token, JWT_SECRET as string)
      ));
      req.body = payload.user;
      await handler(req, res);
    } catch (error) {
      return res.status(403).json(error);
    }
  };
}

export default authenticate;
