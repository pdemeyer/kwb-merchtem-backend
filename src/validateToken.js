import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function validateAccessToken(authHeader) {
  if (!authHeader) throw new Error("Missing Authorization header");

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new Error("Invalid Authorization header");
  }

  const token = parts[1];
  const decoded = jwt.decode(token, { complete: true });

  if (!decoded) throw new Error("Invalid JWT");

  const { aud, tid } = decoded.payload;

  if (tid !== config.tenantId && config.tenantId !== "common") {
    throw new Error("Invalid tenant");
  }

  if (aud !== config.clientId && aud !== "api://" + config.clientId) {
    throw new Error("Invalid audience");
  }

  return token;
}
