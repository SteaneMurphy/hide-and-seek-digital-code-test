"use client";

import styles from "./error.module.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main className={styles.page}>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{error.message}</p>
      <button className={styles.button} onClick={reset}>
        Try again
      </button>
    </main>
  );
}
