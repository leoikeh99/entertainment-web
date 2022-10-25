import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "../../../middleware/authenticate";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const showId = req.query.showId;

  const client = await clientPromise;
  const db = client.db("myFirstDatabase");

  const prevBookmark = await db
    .collection("bookmarks")
    .findOne({ user: new ObjectId(id), showId });

  if (prevBookmark) {
    await db
      .collection("bookmarks")
      .findOneAndDelete({ user: new ObjectId(id), showId });

    const bookmarks = await db
      .collection("bookmarks")
      .find({ user: new ObjectId(id) })
      .toArray();

    res.status(200).json(bookmarks);
  } else {
    const addBookmark = await db
      .collection("bookmarks")
      .insertOne({ user: new ObjectId(id), showId });

    const bookmarks = await db
      .collection("bookmarks")
      .find({ user: new ObjectId(id) })
      .toArray();

    res.status(200).json(bookmarks);
  }
};

export default authenticate(handler, "POST");
