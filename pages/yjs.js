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

  const [ytext, setYtext] = useState();
  useEffect(() => {
    const ydoc = new Y.Doc();
    console.log({ ydoc });

    const ytext = ydoc.getText("file-id");
    ytext.insert(0, "hi");
    // ytext.insert(0, );

    console.log(ytext.toString());

    setYtext(ytext);

    // ydoc.on("update", (updateMessage, origin, ydoc) => {
    //   console.log({ updateMessage, origin, ydoc });
    //   setFileValue()
    // });

    ytext.observe(function (event, transaction) {
      console.log({ ytext, event, transaction });
      setFileValue(ytext.toString());
    });

    // setTimeout(() => {
    //   ytext.insert(0, `<html>\n  <body>\n    Hello World\n  </body>\n</html>`);

    //   //   setTimeout(() => {
    //   //     ytext.insert(ytext.length, "xyz");
    //   //   }, 1000);
    // }, 10);
  }, []);

  useEffect(() => {
    if (ytext && ytext.toString() !== submittedValue) {
      ytext.applyDelta([{ delete: ytext.length }, { insert: submittedValue }]);
    }
  }, [ytext, submittedValue]);

  function onSubmit() {
    // console.log("onSubmit", fileValue);
    setSubmittedValue(fileValue);

    // ytext.delete(0, ytext.length);
    // ytext.insert(0, fileValue);
  }

  function onChange(update) {
    if (update.docChanged) {
      // console.log("onChange", update);
      let value = update.state.doc.toString();
      setFileValue(value);
    }
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
          <SyncedCodeMirror ytext={ytext} editorSettings={editorSettings} />
          <SyncedCodeMirror ytext={ytext} editorSettings={editorSettings} />
          <SyncedCodeMirror ytext={ytext} editorSettings={editorSettings} />
          <SyncedCodeMirror ytext={ytext} editorSettings={editorSettings} />
        </section>
      </main>
    </div>
  );
}

function SyncedCodeMirror({ ytext, editorSettings }) {
  const [extensions, setExtensions] = useState();
  useEffect(() => {
    if (!ytext) return null;

    const undoManager = new Y.UndoManager(ytext);

    setExtensions(
      yCollab(ytext, null, {
        undoManager,
      })
    );
  }, [ytext]);

  if (!extensions) return null;

  return (
    <CodeMirror6Instance
      editorSettings={editorSettings}
      language={LANGUAGES.HTML}
      extensions={extensions}
      onInit={(view) => {
        console.log("oninit", ytext.toString());
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: ytext.toString(),
          },
        });
      }}
      // onChange={onChange}
    />
  );
}
