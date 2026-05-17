"use client";

import BookCard from "@/components/book-card/book-card";
import type { Book } from "@/shared/books";
import styles from "./book-grid.module.css";

type Props = {
  books: Book[];
};

export default function BookGrid({ books }: Props) {
  return (
    <section className={styles.grid} aria-label="Book catalogue">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={() => {}} />
      ))}
    </section>
  );
}
