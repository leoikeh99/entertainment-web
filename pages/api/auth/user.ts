import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../config";
import axios from "axios";
import authenticate from "../../../middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  await axios
    .get(`${BASE_URL}/users/${id}`)
    .then((val) => {
      res.status(200).json({ email: val.data.email, id: val.data.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export default authenticate(handler);
