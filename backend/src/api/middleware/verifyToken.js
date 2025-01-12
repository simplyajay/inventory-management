import jwt from "jsonwebtoken";
import { getToken } from "../service/token.service.js";

const verifyToken = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }
    req.user = decoded; // creates user object to be sent with the response
    return next();
  } catch (error) {
    console.error("Error", error);
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

export default verifyToken;
