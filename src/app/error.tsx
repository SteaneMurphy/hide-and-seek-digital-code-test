"use client";

import { useEffect } from "react";
import { ERROR_PAGE } from "@/constants/copy";
import styles from "./error.module.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>{ERROR_PAGE.TITLE}</h2>
      <p className={styles.message}>{ERROR_PAGE.MESSAGE}</p>
      <button className={styles.button} onClick={reset}>
        {ERROR_PAGE.RETRY}
      </button>
    </main>
  );
}
