-- BookHaven schema.
-- Executed once by the Postgres container's docker-entrypoint-initdb.d
-- on first start (when the data volume is empty). Schema only; seed data
-- is loaded by the application-side seed script (see PR 5) which reads
-- src/lib/books.ts so the catalogue stays in one source of truth.

CREATE TABLE IF NOT EXISTS books (
  id          INTEGER PRIMARY KEY,
  sku         UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  isbn        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  author      TEXT NOT NULL,
  price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  cover_url   TEXT NOT NULL,
  description TEXT NOT NULL
);
