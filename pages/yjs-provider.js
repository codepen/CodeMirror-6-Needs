import { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";

import * as Y from "yjs";
import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
import { StateEffect } from "@codemirror/state";

import { keymap } from "@codemirror/view";

import { Observable } from "lib0/observable";

class LinkedProvider extends Observable {
  controller;
  docs = [];
  /**
   * @param {Y.Doc} ydoc
   */
  constructor() {
    super();

    this.add = this.add.bind(this);
    this.updateListener = this.updateListener.bind(this);

    this.controller = new Y.Doc();
    this.add(this.controller);

    // listen to an event that fires when a remote update is received
    this.on("update", (update, origin) => {
      this.docs.forEach((ydoc) => {
        if (origin !== ydoc) {
          Y.applyUpdate(ydoc, update, this);
          // the third parameter sets the transaction-origin
        }
      });
    });
  }

  updateListener(update, origin) {
    // ignore updates applied by this provider
    if (origin !== this) {
      // this update was produced either locally or by another provider.
      this.emit("update", [update, origin]);
    }
  }

  add(ydoc) {
    this.docs.push(ydoc);
    mergeYDocTexts(this.controller, ydoc);
    ydoc.on("update", this.updateListener);
  }

  destroy() {
    this.controller.destroy();
    this.docs.forEach((ydoc) => {
      ydoc.off("update", this.updateListener);
    });
  }
}

function mergeYDocTexts(ydoc1, ydoc2) {
  if (ydoc1 === ydoc2) return;

  // Janky test to see if the initial doc has any history.
  const hasDoc1BeenInitialized = ydoc1.store.clients.size > 0;
  if (hasDoc1BeenInitialized) {
    // If there's content in ydoc2, delete it all
    const ytext2 = ydoc2.getText();
    ytext2.applyDelta([{ delete: ytext2.length }]);

    // Syncs the state from ydoc1 to ydoc2
    const state1 = Y.encodeStateAsUpdate(ydoc1);
    Y.applyUpdate(ydoc2, state1);
  }

  // Ensures the ydoc1 state matches the new ydoc2 state
  const state2 = Y.encodeStateAsUpdate(ydoc2);
  Y.applyUpdate(ydoc1, state2);

  // // NOTE: This diffing doesn't really do anything at this point. For our actual implementation, the first YDoc received should be considered the primary document and all other clients should clear and go off of that document state.
  // const ydoc1Text = ydoc1.getText().toString();
  // const ydoc2Text = ydoc2.getText().toString();
  // const deltas = getDeltaOperations(ydoc1Text, ydoc2Text);
  // ydoc1.getText().applyDelta(deltas);
}

export default function SharedYjs() {
  const [editorSettings] = useState(EDITOR_SETTINGS_DEFAULTS);

  const [fileValue, setFileValue] = useState(
    `<html>\n  <body>\n    Hello World\n  </body>\n</html>`
  );
  const [submittedValue, setSubmittedValue] = useState(fileValue);
  function onSubmit() {
    setSubmittedValue(fileValue);
  }

  const [, renderComponent] = useState();
  function forceRender() {
    renderComponent(Date.now());
  }

  const linkedProvider = useRef();
  const yDocs = useRef([]);

  function logStates() {
    console.group("Controller YDoc");
    const state = Y.encodeStateAsUpdate(controller.current);
    Y.logUpdate(state);
    console.groupEnd();

    yDocs.current.map((ydoc, i) => {
      console.group("YDoc " + i);
      const state = Y.encodeStateAsUpdate(ydoc);
      Y.logUpdate(state);
      console.groupEnd();
    });
  }

  // Set up controller yDoc
  useEffect(() => {
    console.log("setting up controller yDoc");
    linkedProvider.current = new LinkedProvider();

    makeYDoc(fileValue);
    forceRender();

    // return () => {
    //   linkedProvider.current.destroy();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function makeYDoc(initialValue) {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText();
    if (initialValue) {
      yText.insert(0, initialValue);
    }

    linkedProvider.current.add(yDoc);
    yDocs.current.push(yDoc);

    forceRender();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CodeMirror 6 Y.js Integration</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>CodeMirror 6 Y.js Integration</h1>
          <a href="./">Back to main</a>
        </header>

        <section className={styles.settings}>
          <button onClick={() => makeYDoc(fileValue)}>Add Editor</button>{" "}
          <button onClick={() => logStates()}>Log States</button>
          <div style={{ display: "grid" }}>
            <h3 onClick={() => setFileValue("hello")}>File Contents</h3>
            <textarea
              value={fileValue}
              onInput={(e) => setFileValue(e.currentTarget.value)}
              rows="6"
            />
            <button onClick={onSubmit}>Submit</button>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <CodeMirrorYDoc
            initialValue={fileValue}
            yDoc={linkedProvider?.current?.controller}
            editorSettings={editorSettings}
          />

          {yDocs.current.map((yDoc, i) => (
            <CodeMirrorYDoc
              key={"ydoc" + i}
              yDoc={yDoc}
              editorSettings={editorSettings}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

function CodeMirrorYDoc({ yDoc, editorSettings }) {
  if (!yDoc) return null;
  return (
    <CodeMirror6Instance
      editorSettings={editorSettings}
      language={LANGUAGES.HTML}
      onInit={(editorView) => {
        const yText = yDoc.getText();

        const undoManager = new Y.UndoManager(yText);
        // NOTE: We have to ensure CodeMirror's history extension isn't also active.
        const extension = [
          yCollab(yText, null, { undoManager }),
          keymap.of(yUndoManagerKeymap),
        ];

        editorView.dispatch({
          effects: StateEffect.appendConfig.of(extension),
          changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: yText.toString(),
          },
        });
      }}
    />
  );
}
