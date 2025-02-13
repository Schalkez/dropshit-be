import { config } from "dotenv";

config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;

export const db = {
  name: process.env.DB_NAME || "dropshit",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PWD || "",
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10"),
};

export const tokenInfo = {
  accessTokenValidity: 100 * 365 * 24 * 60 * 60,
  refreshTokenValidity: parseInt(
    process.env.REFRESH_TOKEN_VALIDITY_SEC ||
      (100 * 365 * 24 * 60 * 60).toString()
  ), // 100 năm tính theo giây
  issuer: process.env.TOKEN_ISSUER || "api.dev.xyz.com",
  audience: process.env.TOKEN_AUDIENCE || "xyz.com",
};

export const apiToken = "7012363348:AAFuRK9mWCyY0Tgb672wQey6RlhT1pQzLQs";
export const corsUrl = process.env.CORS_URL || "*";
