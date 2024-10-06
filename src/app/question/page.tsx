import styles from "./page.module.css";
import { Button } from "antd";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>111</Button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
