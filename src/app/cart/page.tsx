"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useCartHydrated } from "@/store/use-cart-hydrated";
import { BUTTONS, CART_PAGE } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import styles from "./cart.module.css";

export default function ShoppingCartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const hydrated = useCartHydrated();

  const total = items.reduce(
    (sum, { book, quantity }) => sum + book.price * quantity,
    0,
  );

  if (!hydrated || items.length === 0) {
    return (
      <main className={styles.page}>
        <h1 className={styles.heading}>{CART_PAGE.TITLE}</h1>
        <p className={styles.empty}>{CART_PAGE.EMPTY}</p>
        <Link href={ROUTES.HOME} className={styles.cta}>
          {CART_PAGE.EMPTY_CTA}
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>{CART_PAGE.TITLE}</h1>
      <ul className={styles.list}>
        {items.map(({ book, quantity }) => (
          <li key={book.id} className={styles.item}>
            <div className={styles.thumb}>
              <Image
                src={book.cover}
                alt={book.title}
                fill
                sizes="56px"
                className={styles.thumbImage}
              />
            </div>
            <div className={styles.itemInfo}>
              <span className={styles.itemTitle}>{book.title}</span>
              <span className={styles.itemMeta}>
                {book.author} &mdash; Qty: {quantity}
              </span>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.itemPrice}>
                ${(book.price * quantity).toFixed(2)}
              </span>
              <button
                className={styles.removeBtn}
                onClick={() => removeItem(book.id)}
                aria-label={`Remove ${book.title} from cart`}
              >
                {BUTTONS.REMOVE}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>{CART_PAGE.TOTAL}</span>
        <span className={styles.summaryValue}>${total.toFixed(2)}</span>
      </div>
      <button type="button" className={styles.checkoutBtn}>
        {BUTTONS.CHECKOUT}
      </button>
    </main>
  );
}
