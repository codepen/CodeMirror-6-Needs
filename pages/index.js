import { useState } from "react";
import Head from "next/head";
import CodeSamples from "../components/CodeSamples";
import EditorSettings from "../components/EditorSettings";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import styles from "../styles/Home.module.scss";

export default function Home() {
  // TODO: Get controls working via editorSettings object.
  const [editorSettings, setEditorSettings] = useState(
    EDITOR_SETTINGS_DEFAULTS
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>CodeMirror 6 Needs</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>CodeMirror 6 Needs on CodePen</h1>
          <p>
            This page shows live{" "}
            <a href="https://codemirror.net/6/">CodeMirror 6</a> editors in all
            the modes that we need (so far) on{" "}
            <a href="https://codepen.io">CodePen</a>. It also has dropdowns for
            settings that we need to support.{" "}
          </p>
        </header>

        <section className={styles.settings}>
          <h3>Settings</h3>

          <EditorSettings
            editorSettings={editorSettings}
            setEditorSettings={setEditorSettings}
          />
        </section>

        <section className={styles.samples}>
          <h3>Samples</h3>

          <CodeSamples editorSettings={editorSettings} />
        </section>
      </main>
    </div>
  );
}
