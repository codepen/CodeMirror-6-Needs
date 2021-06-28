import { useRef, useEffect } from "react";

import { basicSetup } from "@codemirror/basic-setup";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultTabBinding } from "@codemirror/commands";

// import { oneDark } from "@codemirror/theme-one-dark";
import { twilight } from "../../themes/twilight";

import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";

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

    // These seem fine
    if (type === "html") lang = html;
    if (type === "css") lang = css;
    if (type === "markdown") lang = markdown;

    // TODO Make JSX work
    if (type === "js") lang = javascript;

    // TODO: Not quite right.
    if (type === "scss") lang = css;
    if (type === "sass") lang = css;
    if (type === "less") lang = css;
    if (type === "stylus") lang = css;

    // TODO entirely
    if (type === "haml") lang = html;
    if (type === "pug") lang = html;
    if (type === "slim") lang = html;
    if (type === "coffeescript") lang = javascript;
    if (type === "typescript") lang = javascript;
    if (type === "livescript") lang = javascript;
    if (type === "nunjucks") lang = html;

    let startState = EditorState.create({
      doc: DATA[type],
      extensions: [
        keymap.of(defaultTabBinding), // TODO: Do we definitely want default Tab handling?
        compartments.tabSize.of(EditorState.tabSize.of(indentWidth)),
        compartments.language.of(lang.call()),
        twilight,
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

    // Do Prettier!
    // https://prettier.io/docs/en/browser.html

    // TODO: Do Prettier on the other supported languages
    if (type === "js") {
      // prettier can throw hard errors if the parser fails.
      try {
        // replace entire document with prettified version
        const newDoc = prettier.format(DATA[type], {
          parser: "babel",
          plugins: [parserBabel, parserHtml],
          tabWidth: indentWidth,
          //    semi: true,
          trailingComma: "none",
          //    useTabs: indentWith === "tabs",
          bracketSpacing: true,
          jsxBracketSameLine: false,
        });
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
  }

  return (
    <div {...props}>
      {title}
      <div ref={container}></div>
    </div>
  );
}
