import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:npg_GaH6LICln0yJ@ep-square-leaf-a43gqz96-pooler.us-east-1.aws.neon.tech/Finance%20Tracker%20?sslmode=require"
);
export const db = drizzle(sql, { schema });
