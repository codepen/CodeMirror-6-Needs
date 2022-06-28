import { useState, useRef, useEffect, useMemo } from "react";
import Head from "next/head";
import EditorSettings from "../components/EditorSettings";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";

export default function SharedYjs() {
  const [editorSettings, setEditorSettings] = useState(
    EDITOR_SETTINGS_DEFAULTS
  );

  const [fileValue, setFileValue] = useState(
    `<html>\n  <body>\n    Hello World\n  </body>\n</html>`
  );
  const [submittedValue, setSubmittedValue] = useState(fileValue);

  const [yText, setYText] = useState();
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("file-id");
    setYText(yText);

    // Keep file in sync with yText "on change"
    yText.observe(function (event, transaction) {
      console.log({ yText, event, transaction });
      setFileValue(yText.toString());
    });
  }, []);

  // Ensure the yText stays in sync with the main value.
  useEffect(() => {
    if (yText && yText.toString() !== submittedValue) {
      yText.applyDelta([
        // If there's content, delete it all
        yText.length > 0 ? { delete: yText.length } : {},
        // Insert the new value
        { insert: submittedValue },
      ]);
    }
  }, [yText, submittedValue]);

  function onSubmit() {
    // console.log("onSubmit", fileValue);
    setSubmittedValue(fileValue);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CodeMirror 6 Shared State</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>CodeMirror 6 Shared State</h1>
        </header>

        <section className={styles.settings}>
          <div style={{ display: "grid" }}>
            <h3 onClick={() => setFileValue("hello")}>File Contents</h3>
            <textarea
              value={fileValue}
              onInput={(e) => setFileValue(e.currentTarget.value)}
              rows="6"
            />
            <button onClick={onSubmit}>Submit</button>
          </div>
          <hr />
          <EditorSettings
            key="settings"
            editorSettings={editorSettings}
            setEditorSettings={setEditorSettings}
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <SyncedCodeMirror yText={yText} editorSettings={editorSettings} />
          <SyncedCodeMirror yText={yText} editorSettings={editorSettings} />
          <SyncedCodeMirror yText={yText} editorSettings={editorSettings} />
          <SyncedCodeMirror yText={yText} editorSettings={editorSettings} />
        </section>
      </main>
    </div>
  );
}

function SyncedCodeMirror({ yText, editorSettings }) {
  const [extensions, setExtensions] = useState();
  useEffect(() => {
    if (!yText) return null;
    const undoManager = new Y.UndoManager(yText);
    setExtensions(yCollab(yText, null, { undoManager }));
  }, [yText]);

  // Don't render until the extensions are ready.
  if (!extensions) return null;

  return (
    <CodeMirror6Instance
      editorSettings={editorSettings}
      language={LANGUAGES.HTML}
      extensions={extensions}
      onInit={(view) => {
        // Make sure the initial document value is the yText value.
        console.log("oninit", yText.toString());
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: yText.toString(),
          },
        });
      }}
    />
  );
}
