import styles from "./page.module.css";
import { Button } from "antd";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>1111111</Button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
