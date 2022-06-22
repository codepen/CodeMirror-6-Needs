import { useState, useRef } from "react";
import Head from "next/head";
import EditorSettings from "../components/EditorSettings";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";

import { EditorView, Decoration, DecorationSet } from "@codemirror/view";
import {
  StateField,
  StateEffect,
  RangeValue,
  RangeSet,
} from "@codemirror/state";

const hideCursorTheme = EditorView.baseTheme({
  ".cm-activeLine, .cm-activeLineGutter": { background: "none !important" },
  ".cm-cursor-primary": {
    display: "none",
    opacity: 0,
  },
});

const addUnderline = StateEffect.define();

const underlineMark = Decoration.line({ class: "cm-underline" });
const underlineField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(underlines, tr) {
    underlines = underlines.map(tr.changes);
    for (let e of tr.effects)
      if (e.is(addUnderline)) {
        // console.log("addUnderline", tr.state.doc);
        // const lines = {
        //   from: tr.state.doc.lineAt(e.value.from),
        //   to: tr.state.doc.lineAt(e.value.to),
        // };
        // console.log(e.value, lines);

        const range = new RangeValue().range(e.value.from, e.value.to);
        console.log(range);

        const range2 = new Range({
          from: e.value.from,
          to: e.value.to,
        });
        console.log(range2);

        // const lineMarks = [];

        // for (
        //   let lineNumber = lines.from.number;
        //   lineNumber <= lines.to.number;
        //   lineNumber++
        // ) {
        //   // lineMarks.push();
        //   console.log({ lineNumber });
        underlines = underlines.update({
          add: [underlineMark.range(range)],
        });
        // }

        // console.log(lineMarks);

        // const ranges = (
      }
    return underlines;
  },
  provide: (f) => EditorView.decorations.from(f),
});

const underlineTheme = EditorView.baseTheme({
  ".cm-underline": {
    textDecoration: "underline 3px red",
    background: "darkred",
  },
});

function underlineRange(view, ranges) {
  let effects = ranges.map(({ from, to }) => addUnderline.of({ from, to }));
  if (!effects.length) return false;

  if (!view.state.field(underlineField, false))
    effects.push(StateEffect.appendConfig.of([underlineField, underlineTheme]));
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
            readOnly
          />
        </section>
      </main>
    </div>
  );
}
