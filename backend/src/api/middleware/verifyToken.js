import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const getToken = () => {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        return token;
      }
    }

    const cookie = req.cookies[process.env.TOKEN];

    if (cookie) {
      return cookie;
    }

    return null;
  };

  const token = getToken();

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, Invalid token" });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("Error", error);
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

export default verifyToken;
