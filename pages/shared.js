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

const syncAnnotation = new AnnotationType(Boolean);

class SyncedState {
  constructor() {
    this.addView = this.addView.bind(this);
    this.syncDispatch = this.syncDispatch.bind(this);
  }

  views = [];

  addView(view) {
    this.views.push(view);

    // Get them all on the same state.
    if (this.views.length > 1) {
      view.setState(this.views[0].state);
    }

    // Have to override _dispatch as that's what the config option goes to.
    view._dispatch = this.syncDispatch({
      views: this.views,
      view,
    });
  }

  syncDispatch({ views, view }) {
    return (tr) => {
      view.update([tr]);
      // If not an empty change and not a sync change, then apply the change to all other views.
      if (!tr.annotation(syncAnnotation)) {
        console.log("sync dispatch", views.indexOf(view), tr);

        // Mark this as a sync transaction.
        const annotations = syncAnnotation.of(true);
        let transaction;

        if (!tr.changes.empty) {
          transaction = {
            // Mark this as a sync transaction.
            annotations,
            changes: tr.changes,
          };
        } else if (tr.effects.length) {
          transaction = {
            annotations,
            effects: tr.effects,
          };
        }

        if (transaction) {
          views.forEach((v) => {
            if (v === view) return;
            v.dispatch(transaction);
          });
        }
      }
    };
  }
}

export default function Shared() {
  const [editorSettings, setEditorSettings] = useState(
    EDITOR_SETTINGS_DEFAULTS
  );

  const syncedStateRef = useRef(new SyncedState());
  const syncedState = syncedStateRef.current;

  function onInit(editorView) {
    syncedState.addView(editorView);
  }

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
              onInit={onInit}
              onChange={onChange}
            />

            <CodeMirror6Instance onInit={onInit} />
            <CodeMirror6Instance onInit={onInit} />
            <CodeMirror6Instance onInit={onInit} />
          </section>
        )}
      </main>
    </div>
  );
}
