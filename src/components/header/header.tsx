"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useCartHydrated } from "@/store/use-cart-hydrated";
import { HEADER, SITE_NAME } from "@/constants/copy";
import { ROUTES } from "@/constants/routes";
import styles from "./header.module.css";

export default function Header() {
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const hydrated = useCartHydrated();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={ROUTES.HOME} className={styles.brand}>
          {SITE_NAME}
        </Link>
        <Link
          href={ROUTES.CART}
          className={styles.cartLink}
          aria-label={HEADER.CART_ARIA_LABEL}
        >
          {HEADER.CART_LINK}
          {hydrated && count > 0 && <span className={styles.badge}>{count}</span>}
        </Link>
      </div>
    </header>
  );
}
