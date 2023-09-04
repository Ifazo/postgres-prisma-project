import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (payload: Record<string, unknown>): string => {
  const secret = "ziaulkarimifaz-secret-key";
  return jwt.sign(payload, secret);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
