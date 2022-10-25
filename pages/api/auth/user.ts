import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../config";
import axios from "axios";
import authenticate from "../../../middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  await axios
    .get(`${BASE_URL}/_users/${id}`)
    .then(async (val) => {
      const res2 = await axios.get(`${BASE_URL}/_bookmarks?userId=${id}`);
      res.status(200).json({
        user: { email: val.data.email, id: val.data.id },
        bookmarks: res2.data,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export default authenticate(handler, "GET");
