import { listAllBooks } from "@/server/repositories/books-repository";
import BookGrid from "@/components/book-grid/book-grid";
import type { Book } from "@/shared/books";
import styles from "./page.module.css";

export default async function HomePage() {
  const rows = await listAllBooks();

  const books: Book[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author,
    price: row.price,
    cover: row.cover_url,
    description: row.description,
    isbn: row.isbn,
  }));

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>BookHaven</h1>
      <BookGrid books={books} />
    </main>
  );
}
