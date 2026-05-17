// Seed the `books` table from src/shared/books.ts — single source of truth.
// Idempotent: re-running updates rows in place via ON CONFLICT, so edits to
// books.ts propagate without wiping the table (and without regenerating SKUs).
//
// Usage:  npm run db:seed
// Requires DATABASE_URL in the environment (see .env.example).

import "dotenv/config";
import { Pool } from "pg";
import { books } from "../src/shared/books";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.");
  }

  const pool = new Pool({ connectionString });

  try {
    for (const book of books) {
      await pool.query(
        `INSERT INTO books (id, isbn, title, author, price, cover_url, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE SET
           isbn        = EXCLUDED.isbn,
           title       = EXCLUDED.title,
           author      = EXCLUDED.author,
           price       = EXCLUDED.price,
           cover_url   = EXCLUDED.cover_url,
           description = EXCLUDED.description`,
        [
          book.id,
          book.isbn,
          book.title,
          book.author,
          book.price,
          book.cover,
          book.description,
        ],
      );
    }
    console.log(`Seeded ${books.length} books.`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});