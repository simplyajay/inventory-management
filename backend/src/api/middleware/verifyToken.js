import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const cookie = req.cookies["jwt"];
  if (!cookie) {
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }

  try {
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }

    req.user = claims;
    next();
  } catch (error) {
    console.error("Error", error);
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

export default verifyToken;
