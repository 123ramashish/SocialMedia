import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // Check if the token has the Bearer format
  if (!token.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: Invalid token format");
  }

  const tokenValue = token.split(" ")[1]; // Extract the token value

  try {
    const payload = jwt.verify(tokenValue, process.env.AUTHKEY);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default jwtAuth;
