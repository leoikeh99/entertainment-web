import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { OptionalObjectSchema, ObjectShape } from "yup/lib/object";

function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      try {
        await schema.validate(req.body);
      } catch (error: any) {
        return res.status(400).json({ message: error.errors[0] });
      }
    }
    await handler(req, res);
  };
}

export default validate;
