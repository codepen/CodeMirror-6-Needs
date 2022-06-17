import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import EditorSettings from "../components/EditorSettings";
import CodeEditor from "../components/CodeEditor";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import { AnnotationType, EditorState, StateEffect } from "@codemirror/state";
import { Annotation } from "@codemirror/state";
import { useExtensions } from "../components/CodeMirror6Instance/extensions/useExtensions";
import CodeMirror6Instance from "../components/CodeMirror6Instance";
import { ViewPlugin } from "@codemirror/view";

const syncAnnotation = new AnnotationType(Boolean);

class SyncedState {
  constructor() {
    const views = [];
    this.views = views;

    const annotations = syncAnnotation.of(true);

    this.plugin = ViewPlugin.fromClass(
      class {
        constructor(view) {
          views.push(view);
          this.view = view;
          this.syncValue();
        }

        destroy() {
          views.splice(views.indexOf(this.view), 1);
        }

        async syncValue() {
          // TODO: Figure out a way to sync the initial value.
          if (views.length > 1 && this.view !== views[0]) {
            // view.setState(views[0].state);
            let value = views[0].state.doc.toString();
            console.log("syncing with 0", this, value);
            // this.view.setState(views[0].state);
            // dispatch({
            //   annotations: syncAnnotation,
            //   changes: {
            //     from: 0,
            //     to: this.view.state.doc.length,
            //     insert: value,
            //   },
            // });
          }
        }

        update(u) {
          if (u.docChanged) {
            const transactions = u.transactions
              .filter(
                // filter out non-sync transactions without changes.
                (tr) => !tr.annotation(syncAnnotation) && !tr.changes.empty
              )
              .map((tr) => {
                // Send through changes only, marked as a syncAnnotation
                return { changes: tr.changes, annotations };
              });

            views.forEach((v) => {
              if (v === u.view) return;
              transactions.forEach((tr) => v.dispatch(tr));
            });
          }
        }
      }
    );
  }
}

export default function Shared() {
  const [editorSettings, setEditorSettings] = useState(
    EDITOR_SETTINGS_DEFAULTS
  );

  const syncedStateRef = useRef(new SyncedState());
  const syncedState = syncedStateRef.current;

  const [fileValue, setFileValue] = useState(
    `<html>\n  <body>\n    Hello World\n  </body>\n</html>`
  );
  const [submittedValue, setSubmittedValue] = useState(fileValue);

  function onSubmit() {
    console.log("onSubmit", fileValue);
    setSubmittedValue(fileValue);
  }

  function onChange(update) {
    if (update.docChanged) {
      console.log("onChange", update);
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
            editorSettings={editorSettings}
            setEditorSettings={setEditorSettings}
          />
        </section>
        {syncedState && (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <CodeMirror6Instance
              editorSettings={editorSettings}
              language={LANGUAGES.HTML}
              value={submittedValue}
              extensions={syncedState.plugin}
              onChange={onChange}
            />

            <CodeMirror6Instance
              editorSettings={editorSettings}
              language={LANGUAGES.HTML}
              extensions={syncedState.plugin}
              value={submittedValue}
            />
            <CodeMirror6Instance
              editorSettings={editorSettings}
              language={LANGUAGES.HTML}
              extensions={syncedState.plugin}
              value={submittedValue}
            />
            <CodeMirror6Instance
              editorSettings={editorSettings}
              language={LANGUAGES.HTML}
              extensions={syncedState.plugin}
              value={submittedValue}
            />
          </section>
        )}
      </main>
    </div>
  );
}
