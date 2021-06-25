import { useRef, useEffect } from "react";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultTabBinding } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { DATA } from "../../data/code";

export default function CodeEditor({ type }) {
  const container = useRef(null);

  useEffect(() => {
    const compartments = {
      language: new Compartment(),
      tabSize: new Compartment(),
    };
    let lang, code;
    if (type === "html") {
      lang = html;
    }
    if (type === "css") {
      lang = css;
    }
    if (type === "js") {
      lang = javascript;
    }

    let startState = EditorState.create({
      doc: DATA[type],
      extensions: [
        keymap.of(defaultTabBinding),
        compartments.tabSize.of(EditorState.tabSize.of(2)),
        compartments.language.of(lang.call()),
        oneDark,
      ],
    });

    let view = new EditorView({
      state: startState,
      parent: container.current,
      extensions: [basicSetup],
    });
  }, []);

  return <div ref={container}></div>;
}
