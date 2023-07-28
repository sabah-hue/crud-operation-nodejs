import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.js";

export const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.json({ message: "not authorized" });
      }
      const decode = jwt.verify(authorization, process.env.TOKEN_SIGNATURE);
      if (!decode || !decode.id) {
        return res.json({ message: "wrong token" });
      }
      const user = await userModel.findById(decode.id);
      if (user) {
         req.user = user
        next()
      } else {
        res.json({ message: "invalid userId" });
      }
    } catch (error) {
      res.json({ message: "catch error " });
    }
  };
};
