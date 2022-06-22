import { useState, useRef } from "react";
import Head from "next/head";
import EditorSettings from "../components/EditorSettings";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";

import { EditorView, Decoration } from "@codemirror/view";
import { StateField, StateEffect } from "@codemirror/state";

const hideCursorTheme = EditorView.theme({
  ".cm-activeLine.cm-activeLine, .cm-activeLineGutter.cm-activeLineGutter": {
    background: "none",
  },
  ".cm-cursor-primary": {
    display: "none",
    opacity: 0,
  },
});

const consoleLineDecorations = {
  error: Decoration.line({ class: "cm-console-error" }),
  warn: Decoration.line({ class: "cm-console-warn" }),
  info: Decoration.line({ class: "cm-console-info" }),
};
const consoleDecorationTheme = EditorView.baseTheme({
  ".cm-console-error, .cm-activeLine.cm-activeLine.cm-console-error": {
    textDecoration: "underline 3px red",
    background: "darkred",
  },
});

const addConsoleDecoration = StateEffect.define();

const consoleDecorationField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(consoleDecorations, tr) {
    consoleDecorations = consoleDecorations.map(tr.changes);
    for (let e of tr.effects)
      if (e.is(addConsoleDecoration)) {
        let { from, to } = e.value;
        for (let pos = from; pos <= to; ) {
          let line = tr.state.doc.lineAt(pos);
          // builder.add(line.from, line.from, underlineMark);
          consoleDecorations = consoleDecorations.update({
            add: [consoleLineDecorations.error.range(line.from)],
          });
          pos = line.to + 1;
        }
      }
    return consoleDecorations;
  },
  provide: (f) => EditorView.decorations.from(f),
});

function underlineRange(view, ranges) {
  let effects = ranges.map(({ from, to }) =>
    addConsoleDecoration.of({ from, to })
  );
  if (!effects.length) return false;

  if (!view.state.field(consoleDecorationField, false))
    effects.push(
      StateEffect.appendConfig.of([
        consoleDecorationField,
        consoleDecorationTheme,
      ])
    );
  view.dispatch({ effects });
  return true;
}

const logs = [
  {
    arguments: ["Console was cleared"],
    complexity: 1,
    function: "clear",
    id: "1655911665379",
  },
  {
    function: "debug",
    arguments: ['"debug"'],
    id: "1655911665380",
  },
  {
    function: "error",
    arguments: ['"error"'],
    id: "1655911665381",
  },
  {
    function: "info",
    arguments: ['"info"'],
    id: "1655911665382",
  },
  {
    function: "log",
    arguments: ['"log"'],
    id: "1655911665383",
  },
  {
    function: "table",
    arguments: ['"table"'],
    id: "1655911665384",
  },
  {
    function: "warn",
    arguments: ['"warn"'],
    id: "1655911665385",
  },
  {
    function: "info",
    arguments: ['"[WDS] Hot Module Replacement enabled."'],
    id: "1655911665392",
  },
  {
    function: "info",
    arguments: ['"[WDS] Live Reloading enabled."'],
    id: "1655911665393",
  },
];

export default function Console() {
  const [editorSettings, setEditorSettings] = useState({
    ...EDITOR_SETTINGS_DEFAULTS,
    lineNumbers: false,
  });

  const value = logs.map((log) => log.arguments.join(" ")).join("\n");

  function onInit(view) {
    underlineRange(view, [{ from: 0, to: 30 }]);
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
          <CodeMirror6Instance
            editorSettings={editorSettings}
            language={LANGUAGES.HTML}
            value={value}
            onInit={onInit}
            extensions={[hideCursorTheme]}
            // extensions={ConsoleDecorations}
            // readOnly
          />
        </section>
      </main>
    </div>
  );
}
