import { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorState, StateEffect } from "@codemirror/state";

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

function mergeYDocTexts(ydoc1, ydoc2) {
  console.log("Y", Y);
  console.log("YDoc1", ydoc1);

  // const stateVector1 = Y.encodeStateVector(ydoc1);
  // const diff2 = Y.encodeStateAsUpdate(ydoc2, stateVector1);
  // Y.applyUpdate(ydoc1, diff2);

  // const ytext2 = ydoc2.getText();
  // ytext2.applyDelta([{ delete: ytext2.length }]);

  // const state1 = Y.encodeStateAsUpdate(ydoc1);

  // console.group("STATE1");
  // Y.logUpdate(state1);
  // Y.applyUpdate(ydoc2, state1);
  // console.groupEnd();

  // console.group("AFTER");
  // Y.logUpdate(Y.encodeStateAsUpdate(ydoc2));
  // console.groupEnd();

  // const stateVector2 = Y.encodeStateVector(ydoc2);
  // const diff1 = Y.encodeStateAsUpdate(ydoc1, stateVector2);

  // console.info("DIFF1");
  // Y.logUpdate(diff1);
  // Y.applyUpdate(ydoc2, diff1);
  // console.info("AFTER");
  // Y.logUpdate(Y.encodeStateAsUpdate(ydoc2));

  const ydoc1Text = ydoc1.getText().toString();
  const ydoc2Text = ydoc2.getText().toString();
  const deltas = getDeltaOperations(ydoc1Text, ydoc2Text);
  ydoc1.getText().applyDelta(deltas);

  // If there's content in ydoc2, delete it all
  const ytext2 = ydoc2.getText();
  ytext2.applyDelta([{ delete: ytext2.length }]);

  // Syncs the state from ydoc1 to ydoc2
  const state1 = Y.encodeStateAsUpdate(ydoc1);
  Y.applyUpdate(ydoc2, state1);

  // Ensures the ydoc1 state matches the new ydoc2 state
  const state2 = Y.encodeStateAsUpdate(ydoc2);
  Y.applyUpdate(ydoc1, state2);

  /*
  // mergeYDocTexts(ydoc1, ydoc2);
  // console.log(ydoc1);
  // console.log(Y);
  // }
  // const deltas2 = getDeltaOperations(ydoc2Text, ydoc1.getText().toString());
  // ydoc2.getText().applyDelta(deltas2);
  // const stateVector1 = Y.encodeStateVector(ydoc1);
  // const stateVector2 = Y.encodeStateVector(ydoc2);
  // console.log({ stateVector1, stateVector2 });
  // const diff1 = Y.encodeStateAsUpdate(ydoc1, stateVector2);
  // const diff2 = Y.encodeStateAsUpdate(ydoc2, stateVector1);
  // Y.applyUpdate(ydoc1, diff2);
  // Y.applyUpdate(ydoc2, diff1);
  // // No difference between disk and last-write-cache versions, so
  // // just write the Yjs document to disk.
  // const state1 = Y.encodeStateAsUpdate(ydoc1);
  // Y.applyUpdate(ydoc2, state1);
  // A change has happened in the text so we merge it with the Yjs document.
  // const state1 = Y.encodeStateAsUpdate(ydoc1);
  // Y.applyUpdate(ydoc2, state1);
  */
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

  const controller = useRef();
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
    controller.current = new Y.Doc();
    controller.current.on("update", (update, _, originDoc) => {
      console.log("controller update!!!!!");
      // if (originDoc !== controller.current) return;
      yDocs.current.forEach((otherDoc) => {
        Y.applyUpdate(otherDoc, update);
      });
    });
    makeYDoc(fileValue);
    forceRender();
  }, []);

  function makeYDoc(initialValue) {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText();

    if (initialValue) {
      yText.insert(0, initialValue);
    }

    const ydoc1 = controller.current;
    const ydoc2 = yDoc;

    mergeYDocTexts(ydoc1, ydoc2);
    /*
    // TODO: Compare contents?
    // // Force new yDoc to match controller.
    if (ydoc1.getText().toString() === ydoc2.getText().toString()) {
      const state1 = Y.encodeStateAsUpdate(ydoc1);
      Y.applyUpdate(ydoc2, state1);

      console.log(Y);
    } else {
      // Merge states
      // https://docs.yjs.dev/api/document-updates#example-sync-two-clients-by-computing-the-differences
      const stateVector1 = Y.encodeStateVector(ydoc1);
      const stateVector2 = Y.encodeStateVector(ydoc2);

      console.log({ stateVector1, stateVector2 });
      const diff1 = Y.encodeStateAsUpdate(ydoc1, stateVector2);
      const diff2 = Y.encodeStateAsUpdate(ydoc2, stateVector1);
      Y.applyUpdate(ydoc1, diff2);
      Y.applyUpdate(ydoc2, diff1);

      // // Syncing clients without loading the Y.Doc
      // // https://docs.yjs.dev/api/document-updates#example-syncing-clients-without-loading-the-y.doc
      // let currentState1 = Y.encodeStateAsUpdate(ydoc1);
      // let currentState2 = Y.encodeStateAsUpdate(ydoc2);
      // const stateVector1 = Y.encodeStateVectorFromUpdate(currentState1);
      // const stateVector2 = Y.encodeStateVectorFromUpdate(currentState2);
      // const diff1 = Y.diffUpdate(currentState1, stateVector2);
      // const diff2 = Y.diffUpdate(currentState2, stateVector1);

      // // sync clients
      // currentState1 = Y.mergeUpdates([currentState1, diff2]);
      // currentState2 = Y.mergeUpdates([currentState2, diff1]);
      // Y.applyUpdate(ydoc1, currentState1);
      // Y.applyUpdate(ydoc2, currentState2);
    }
    */

    yDoc.on("update", (update, _, originDoc) => {
      if (originDoc !== yDoc) return;
      if (controller.current) {
        Y.applyUpdate(controller.current, update);
      }
    });

    yDocs.current.push(yDoc);

    // logStates();

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
            yDoc={controller.current}
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
        const extension = yCollab(yText, null, { undoManager });

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
