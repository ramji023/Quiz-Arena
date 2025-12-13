import dotenv from 'dotenv'
dotenv.config();
import { defineConfig, env } from "prisma/config";
// console.log(env("DATABASE_URL"));
export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
  schema: "../prisma/schema.prisma",
});
