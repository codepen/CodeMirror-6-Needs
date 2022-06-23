import { useState, Component } from "react";
import Head from "next/head";
import EditorSettings from "../components/EditorSettings";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import { LANGUAGES } from "../data/languages";
import styles from "../styles/Home.module.scss";

import CodeMirror6Instance from "../components/CodeMirror6Instance";

import { EditorView, Decoration } from "@codemirror/view";
import { StateField, StateEffect, Range } from "@codemirror/state";

const consoleLineClasses = {
  clear: "cm-console-clear",
  error: "cm-console-error",
  warn: "cm-console-warn",
  info: "cm-console-info",
};

// Make CodeMirror line decorations from each class
const consoleLineDecorations = Object.fromEntries(
  Object.entries(consoleLineClasses).map(([key, value]) => [
    key,
    Decoration.line({ class: value }),
  ])
);
const consoleDecorationTheme = EditorView.baseTheme({
  [`.${consoleLineClasses.clear}`]: {
    fontStyle: "italic",
    opacity: 0.5,
  },
  [`.${consoleLineClasses.error}`]: {
    background: "hsl(358.462deg 100% 61.7647% / 35%)",
  },
  [`.${consoleLineClasses.warn}`]: {
    background: "hsl(49.3194deg 100% 62.549% / 35%)",
  },
  [`.${consoleLineClasses.info}`]: {
    background: "hsl(206.418deg 52.7559% 50.1961% / 50%)",
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
        let { type, from, to } = e.value;
        console.log("adding console decoration", type);
        if (consoleLineDecorations[type]) {
          // Loop through lines
          for (let pos = from; pos <= to; ) {
            let line = tr.state.doc.lineAt(pos);
            consoleDecorations = consoleDecorations.update({
              add: [consoleLineDecorations[type].range(line.from)],
            });
            // Next line
            pos = line.to + 1;
          }
        }
      }
    return consoleDecorations;
  },
  provide: (f) => EditorView.decorations.from(f),
});

function addConsoleLog(view, log) {
  const type = log.function;
  const value = log.arguments.join(" ");
  let from = view.state.doc.length;
  let to = from;

  // if (type === "clear") {
  //   from = 0;
  // }

  let end = from + value.length;

  let effects = [addConsoleDecoration.of({ type, from, to: end })];

  // Ensure that the necessary extensions are added.
  if (!view.state.field(consoleDecorationField, false)) {
    effects.push(
      StateEffect.appendConfig.of([
        consoleDecorationField,
        consoleDecorationTheme,
      ])
    );
  }

  view.dispatch({
    changes: {
      from,
      to,
      insert: value + "\n",
    },
    effects,
  });

  let range = new Range(from, end + 1, value);
  console.log({ range });

  return () => {
    console.log("removing range", range);
    view.dispatch({
      changes: {
        from: range.from,
        to: range.to,
        insert: "",
      },
    });
  };
}

class ConsoleLog extends Component {
  componentDidMount() {
    if (this.props.view) {
      this.remove = addConsoleLog(this.props.view, this.props.log);
    }
  }

  componentWillUnmount() {
    this.remove();
    // Remove lines. We should get some kind of Range back from the addConsoleLog function that can then be removed.
  }

  render() {
    return <li>{this.props.log.arguments.join(" ")}</li>;
  }
}

export default function Console() {
  const [editorSettings, setEditorSettings] = useState({
    ...EDITOR_SETTINGS_DEFAULTS,
    lineNumbers: false,
  });

  const [view, setView] = useState();
  const [lastLog, setLastLog] = useState(5);
  const [logs, setLogs] = useState(LOGS.slice(0, 5));

  function addLogs() {
    setLastLog(lastLog + 1);
    setLogs((logs) => {
      return [...logs, LOGS[lastLog]];
    });
  }

  function removeLogs() {
    setLogs((logs) => {
      return logs.slice(1 - logs.length);
    });
  }

  function onInit(view) {
    setView(view);
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
        <section>
          <button onClick={addLogs}>Add Logs</button>
          <button onClick={removeLogs}>Remove Logs</button>
          <CodeMirror6Instance
            editorSettings={editorSettings}
            language={LANGUAGES.HTML}
            onInit={onInit}
            readOnly
          />
          {view &&
            logs.map((log) => (
              <ConsoleLog key={log.id} view={view} log={log} />
            ))}
        </section>
      </main>
    </div>
  );
}

const LOGS = [
  {
    arguments: ["Console was cleared"],
    complexity: 1,
    function: "clear",
    id: "1655911665379",
  },
  {
    function: "log",
    arguments: ["1"],
    id: "165591166538333",
  },
  {
    function: "log",
    arguments: ["2"],
    id: "165591165653833334",
  },
  {
    function: "log",
    arguments: ["3"],
    id: "1655911665383537223",
  },
  {
    function: "log",
    arguments: ["4"],
    id: "165591163653833673",
  },
  {
    function: "log",
    arguments: ["5"],
    id: "165591166538353343",
  },

  {
    function: "log",
    arguments: ["6"],
    id: "1655911665383253634399",
  },

  {
    function: "log",
    arguments: ["7"],
    id: "1655911665383363311341",
  },

  {
    function: "log",
    arguments: ["8"],
    id: "165591166538303634463234",
  },

  {
    function: "log",
    arguments: ["9"],
    id: "1655911665383392634323",
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
    function: "warn",
    arguments: ['"warn"'],
    id: "1655911665385",
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
