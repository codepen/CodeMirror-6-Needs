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

/**
 * LinkedProvider to synchronize multiple Y.Docs with the same state and pass updates around.
 */
class LinkedProvider extends Observable {
  controller;
  docs = [];

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

  /**
   * @param {Y.Doc} ydoc
   */
  add(ydoc) {
    this.docs.push(ydoc);
    mergeYDocState(this.controller, ydoc);
    ydoc.on("update", this.updateListener);
  }

  destroy() {
    this.controller.destroy();
    this.docs.forEach((ydoc) => {
      ydoc.off("update", this.updateListener);
    });
  }
}

/**
 * Ensure that states is consistent between two Y.Docs
 * https://docs.yjs.dev/api/document-updates#syncing-clients
 *
 * @param {Y.Doc} primaryYdoc
 * @param {Y.Doc} secondaryYdoc
 */
function mergeYDocState(primaryYdoc, secondaryYdoc, textId) {
  if (primaryYdoc === secondaryYdoc) return;

  // Janky test to see if the primary doc has any history.
  const isPrimaryYDocInitialized = primaryYdoc.store.clients.size > 0;
  if (isPrimaryYDocInitialized) {
    // If there's content in secondaryYdoc, delete it all
    const ytext2 = secondaryYdoc.getText(textId);
    ytext2.applyDelta([{ delete: ytext2.length }]);
  }

  // Only do a state vector?
  const secondaryVector = Y.encodeStateVector(secondaryYdoc);
  // Syncs the state from primaryYdoc to secondaryYdoc
  const primaryStateDiff = Y.encodeStateAsUpdate(primaryYdoc, secondaryVector);
  Y.applyUpdate(secondaryYdoc, primaryStateDiff);

  // Ensures the primaryYdoc state matches the new secondaryYdoc state so that the IDs are consistent.
  const primaryVector = Y.encodeStateVector(primaryYdoc);
  const secondaryState = Y.encodeStateAsUpdate(secondaryYdoc, primaryVector);
  Y.applyUpdate(primaryYdoc, secondaryState);
}

import * as Diff from "diff";

// https://motif.land/blog/syncing-text-files-using-yjs-and-the-file-system-access-api
export function getDeltaOperations(initialText, finalText) {
  if (initialText === finalText) {
    return [];
  }

  const edits = Diff.diffChars(initialText || "", finalText || "");
  let prevOffset = 0;
  let deltas = [];

  // Map the edits onto Yjs delta operations
  for (const edit of edits) {
    if (edit.removed && edit.value) {
      deltas = [
        ...deltas,
        ...[
          ...(prevOffset > 0 ? [{ retain: prevOffset }] : []),
          { delete: edit.value.length },
        ],
      ];
      prevOffset = 0;
    } else if (edit.added && edit.value) {
      deltas = [...deltas, ...[{ retain: prevOffset }, { insert: edit.value }]];
      prevOffset = edit.value.length;
    } else {
      prevOffset = edit.value.length;
    }
  }
  return deltas;
}

function applyDeltaDiffs(yText, newValue) {
  if (yText) {
    const yTextValue = yText.toString();
    if (yTextValue !== newValue) {
      // Less dramatic merge
      const deltas = getDeltaOperations(yTextValue, newValue);
      yText.applyDelta(deltas);
      /*
        yText.applyDelta([
          // If there's content, delete it all
          yText.length > 0 ? { delete: yText.length } : {},
          // Insert the new value
          { insert: submittedValue },
        ]);
      }
    }*/
    }
  }
}

export default function SharedYjsProvider() {
  const [editorSettings] = useState(EDITOR_SETTINGS_DEFAULTS);

  const [fileValue, setFileValue] = useState(
    `<html>\n  <body>\n    Hello World\n  </body>\n</html>`
  );

  const linkedProvider = useRef();
  const [yDocs, setYDocs] = useState([]);

  // Set up controller yDoc
  useEffect(() => {
    linkedProvider.current = new LinkedProvider();
    setYDocs([linkedProvider.current.controller]);

    const yDoc = makeYDoc(fileValue);
    const yText = yDoc.getText();
    yText.observe(function () {
      // Keep file in sync with yText "on change"
      setFileValue(yText.toString());
    });

    return () => {
      linkedProvider.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function makeYDoc(initialValue) {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText();
    if (initialValue) {
      yText.insert(0, initialValue);
    }

    linkedProvider.current.add(yDoc);
    setYDocs((yDocs) => [...yDocs, yDoc]);

    return yDoc;
  }

  const [submittedValue, setSubmittedValue] = useState(fileValue);
  function onSubmit() {
    setSubmittedValue(fileValue);
  }
  // Ensure the yText stays in sync with the main value.
  useEffect(() => {
    const yDoc = yDocs[0];
    const yText = yDoc && yDoc.getText();
    applyDeltaDiffs(yText, submittedValue);
  }, [yDocs, submittedValue]);

  // Debug log states
  function logStates() {
    console.group("Controller YDoc");
    const state = Y.encodeStateAsUpdate(linkedProvider.current.controller);
    Y.logUpdate(state);
    console.groupEnd();

    yDocs.map((ydoc, i) => {
      console.group("YDoc " + i);
      const state = Y.encodeStateAsUpdate(ydoc);
      Y.logUpdate(state);
      console.groupEnd();
    });
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
          {yDocs.map((yDoc, i) => (
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
          // Add y.js extensions
          effects: StateEffect.appendConfig.of(extension),
          // Ensure that the CodeMirror state matches the yText value.
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
