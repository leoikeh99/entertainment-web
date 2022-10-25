import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "../../../middleware/authenticate";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const user = await db.collection("_users").findOne(new ObjectId(id));
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const bookmarks = await db
    .collection("bookmarks")
    .find({ user: user._id })
    .toArray();

  res.status(200).json({
    user: { email: user.email, id: user._id.toString() },
    bookmarks,
  });
};

export default authenticate(handler, "GET");
