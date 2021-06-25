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

export default function CodeEditor({ type, tabSize, ...props }) {
  const container = useRef(null);
  const compartments = {
    language: new Compartment(),
    tabSize: new Compartment(),
  };
  let lang, view;

  useEffect(() => {
    // To prevent Next.js fast refresh from adding additional editors
    if (container.current.children[0]) container.current.children[0].remove();

    if (type === "html") lang = html;
    if (type === "css") lang = css;
    if (type === "js") lang = javascript;

    let startState = EditorState.create({
      doc: DATA[type],
      extensions: [
        keymap.of(defaultTabBinding), // TODO: Do we definitely want default Tab handling?
        compartments.tabSize.of(EditorState.tabSize.of(tabSize)),
        compartments.language.of(lang.call()),
        oneDark,
      ],
    });

    view = new EditorView({
      state: startState,
      parent: container.current,
      lineWrapping: true,
      editable: false,
      extensions: [basicSetup],
    });
  }, []);

  if (view) {
    view.dispatch({
      effects: tabSize.reconfigure(EditorState.tabSize.of(tabSize)),
    });
  }

  return <div ref={container} {...props}></div>;
}
