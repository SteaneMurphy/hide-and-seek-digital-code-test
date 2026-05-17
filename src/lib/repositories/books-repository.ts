import { pool } from "@/lib/db";

export type BookRow = {
  id: number;
  sku: string;
  isbn: string;
  title: string;
  author: string;
  price: number;
  cover_url: string;
  description: string;
};

export async function listAllBooks(): Promise<BookRow[]> {
  const { rows } = await pool.query<BookRow>(
    `SELECT id, sku, isbn, title, author, price::float AS price, cover_url, description
     FROM books
     ORDER BY id ASC`,
  );
  return rows;
}
