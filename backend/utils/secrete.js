import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createSecretToken = (payload) => {
  console.log("payload",payload);
  return jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export { createSecretToken };
