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
      if (
        !tr.annotation(syncAnnotation) &&
        (!tr.effects.empty || !tr.changes.empty)
      ) {
        views
          .filter((v) => v !== view)
          .forEach((v) => {
            v.dispatch({
              // Mark this as a sync transaction.
              annotations: syncAnnotation.of(true),
              // Changes = content changes
              changes: tr.changes,
              // Effects = extension updates
              effects: tr.effects,
            });
          });
      }
    };
  }
}

export default function Shared() {
  const [editorSettings, setEditorSettings] = useState(
    EDITOR_SETTINGS_DEFAULTS
  );

  const [syncedState, setSyncedState] = useState();
  useEffect(() => {
    if (!syncedState) {
      let s = new SyncedState();
      setSyncedState(s);
      console.log("syncedState", s);
    }
  }, [syncedState]);

  function onInit(editorView) {
    syncedState.addView(editorView);
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
              value={`<html>\nTest 1\n</html>`}
              onInit={onInit}
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
