import styles from "./loading.module.css";

const SKELETON_COUNT = 8;

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className={styles.headingPlaceholder} aria-hidden="true" />
      <section
        className={styles.grid}
        aria-label="Loading books"
        aria-busy="true"
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className={styles.card} aria-hidden="true">
            <div className={styles.image} />
            <div className={styles.body}>
              <div className={styles.lineTitle} />
              <div className={styles.lineAuthor} />
              <div className={styles.lineSku} />
              <div className={styles.linePrice} />
              <div className={styles.button} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
