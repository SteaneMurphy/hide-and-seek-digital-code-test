"use client";

import Image from "next/image";
import type { Book } from "@/shared/books";
import { BUTTONS } from "@/constants/copy";
import styles from "./book-card.module.css";

type Props = {
  book: Book;
  onAddToCart: (book: Book) => void;
};

export default function BookCard({ book, onAddToCart }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.sku}>SKU: {book.isbn}</p>
        <p className={styles.price}>${book.price.toFixed(2)}</p>
        <button
          className={styles.button}
          onClick={() => onAddToCart(book)}
          aria-label={`Add ${book.title} to cart`}
        >
          {BUTTONS.ADD_TO_CART}
        </button>
      </div>
    </article>
  );
}
