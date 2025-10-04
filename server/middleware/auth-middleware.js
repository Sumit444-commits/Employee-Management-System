import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

const verifyUser = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split[" "][1];
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token not provided" });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decodedToken) {
      return res.status(404).json({ success: false, error: "Token not Valid" });
    }

    const user = await User.findById({ _id: decodedToken._id }).select({
      password: 0,
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not Found" });
    }
   
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Side Error" });
  }
};

export default verifyUser;
