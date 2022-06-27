import { useState, useRef } from "react";
import Head from "next/head";
import EditorSettings from "../components/EditorSettings";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";
import { AnnotationType } from "@codemirror/state";
import { ViewPlugin } from "@codemirror/view";

const syncAnnotation = new AnnotationType(Boolean);
const annotations = syncAnnotation.of(true);

class SyncedState {
  constructor() {
    const views = [];
    this.views = views;

    this.plugin = ViewPlugin.fromClass(
      class {
        constructor(view) {
          views.push(view);
          this.view = view;
          this.mounted = false;
          // Have to delay the setState because we can't call it directly in an `update` call.
          requestAnimationFrame(() => {
            if (views.length > 1 && view !== views[0]) {
              const value = views[0].state.doc.toString();
              // setState is a bit aggressive, forcing all extensions and such to be replaced. Dispatching the new value ensures we can just be concerned with the value sync.
              // view.setState(views[0].state);
              view.dispatch({
                annotations: syncAnnotation,
                changes: {
                  from: 0,
                  to: view.state.doc.length,
                  insert: value,
                },
              });
            }
            // Set a mounted flag so we know the values are in sync.
            this.mounted = true;
          });
        }

        destroy() {
          this.mounted = false;
          // Remove this view from the array.
          views.splice(views.indexOf(this.view), 1);
        }

        update(u) {
          if (this.mounted && u.docChanged) {
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
              // Don't dispatch the transactions on this view again.
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
    // console.log("onSubmit", fileValue);
    setSubmittedValue(fileValue);
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
              // language={LANGUAGES.HTML}
              extensions={syncedState.plugin}
              // value={submittedValue}
            />
            <CodeMirror6Instance
              editorSettings={editorSettings}
              // language={LANGUAGES.HTML}
              extensions={syncedState.plugin}
              // value={submittedValue}
            />
          </section>
        )}
      </main>
    </div>
  );
}
