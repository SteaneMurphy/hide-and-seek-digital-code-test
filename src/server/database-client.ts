import { Pool } from "pg";

// Reuse a single Pool across Next.js dev hot-reloads. Without this, every
// reload creates a new Pool and leaks connections.
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool: Pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}
