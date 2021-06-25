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

        <div>
          <select>
            <option value=""></option>
          </select>
        </div>

        <div className={styles.codeEditors}>
          <CodeEditor className={styles.codeEditor} type="html" tabSize={2} />
          <CodeEditor className={styles.codeEditor} type="css" tabSize={2} />
          <CodeEditor className={styles.codeEditor} type="js" tabSize={2} />
        </div>
      </main>
    </div>
  );
}
