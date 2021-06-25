import Head from "next/head";
import styles from "../styles/Home.module.css";
import CodeEditor from "../components/CodeEditor";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CodeMirror 6 Needs</title>
      </Head>

      <main className={styles.main}>
        <h1>CodeMirror 6 Needs</h1>

        <CodeEditor type="html" />
        <CodeEditor type="css" />
        <CodeEditor type="js" />
      </main>
    </div>
  );
}
