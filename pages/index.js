import { useState } from "react";
import Head from "next/head";

import CodeEditor from "../components/CodeEditor";
import CodeSamples from "../components/CodeSamples";
import EditorSettings from "../components/EditorSettings";

import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { CODE_SAMPLES } from "../data/code";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1>CodeMirror 6 Needs on CodePen</h1>

        <EditorSettings
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />

        <CodeSamples editorSettings={editorSettings} />
      </main>
    </div>
  );
}
