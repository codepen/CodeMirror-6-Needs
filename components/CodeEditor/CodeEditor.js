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
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";

// TODO: Search functionality:
// https://codemirror.net/6/docs/ref/#search

// TODO: Commenting
// https://codemirror.net/6/docs/ref/#comment

// TODO: Rectangular selection?
// https://codemirror.net/6/docs/ref/#rectangular-selection

// TODO: Decide if what to do about key bindings...
// We currently support a default, Sublime Text, and Vim

export default function CodeEditor({ title, type, indentWidth, ...props }) {
  const container = useRef(null);
  let view = useRef();
  const compartments = {
    language: new Compartment(),
    tabSize: new Compartment(),
  };
  let lang;

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
        compartments.tabSize.of(EditorState.tabSize.of(indentWidth)),
        compartments.language.of(lang.call()),
        oneDark,
      ],
    });

    view.current = new EditorView({
      state: startState,
      parent: container.current,
      lineWrapping: true,
      editable: false,
      extensions: [basicSetup],
    });
  }, []);

  if (view.current) {
    view.current.dispatch({
      effects: compartments.tabSize.reconfigure(
        EditorState.tabSize.of(indentWidth)
      ),
    });

    console.log(view.current);

    // Do Prettier!
    // https://prettier.io/docs/en/browser.html

    //  const options = {
    //    bracketSpacing: true,
    //    jsxBracketSameLine: false,
    //    parser: parserType,
    //    semi: true,
    //    tabWidth: tabSize,
    //    trailingComma: "none",
    //    useTabs: indentWith === "tabs",
    //    // These settings would ideally apply to Vue, but don't seem to yet...
    //    // https://github.com/prettier/prettier/issues/7595
    //    proseWrap: "preserve",
    //    htmlWhitespaceSensitivity: "ignore",
    //  };

    if (type === "js") {
      // prettier can throw hard errors if the parser fails.
      try {
        const newDoc = prettier.format(DATA[type], {
          parser: "babel",
          plugins: [parserBabel, parserHtml],
          tabWidth: indentWidth,
        });
        console.log(newDoc);
        view.current.dispatch(
          view.current.state.update({
            changes: {
              from: 0,
              to: view.current.state.doc.length,
              insert: newDoc,
            },
          })
        );
      } catch (err) {
        console.error(err);
      }
    }
    // TODO: Set editor value
  }

  return (
    <div {...props}>
      {title}
      <div ref={container}></div>
    </div>
  );
}
