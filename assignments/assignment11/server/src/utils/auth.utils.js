import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function generateToken({ userId, role }) {
  const accessToken = jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId, role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
};
