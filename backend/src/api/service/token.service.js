export const getToken = (req) => {
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
