import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../config";
import axios from "axios";
import authenticate from "../../../middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const showId = req.query.showId;

  await axios
    .get(`${BASE_URL}/_bookmarks?userId=${id}&showId=${showId}`)
    .then(async (response) => {
      if (response.data.length > 0) {
        const bookmark = response.data[0];
        await axios
          .delete(`${BASE_URL}/_bookmarks/${bookmark.id}`)
          .then(async (response) => {
            const res2 = await axios.get(`${BASE_URL}/_bookmarks?userId=${id}`);
            res.status(200).json(res2.data);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios
          .post(
            `${BASE_URL}/_bookmarks`,
            {
              userId: id,
              showId: showId,
            },
            config
          )
          .then(async (response) => {
            const res2 = await axios.get(`${BASE_URL}/_bookmarks?userId=${id}`);
            res.status(200).json(res2.data);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    })
    .catch(async (error) => {
      console.log(error);
    });
};

export default authenticate(handler, "POST");
