import { useRef, useEffect } from "react";

import { editorSetup } from "./CodeEditorSetup";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultTabBinding } from "@codemirror/commands";

// TODO: Dynamic imports. Only import the themes and/or languages needed.
// import { oneDark } from "@codemirror/theme-one-dark";
import { twilight } from "../../themes/twilight";

import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";
import { CodeMirrorLanguageByType } from "./CodeEditorUtils";

// TODO: EditorSettings - rebuild with new settings or try to update compartments?

export default function CodeEditor({
  title,
  language,
  value,
  editorSettings,
  working,
  workingNotes,
  ...props
}) {
  const indentWidth = Number(editorSettings.indentWidth);
  const container = useRef();
  const view = useRef();
  const compartments = {
    language: new Compartment(),
    tabSize: new Compartment(),
  };

  // TODO: Dynamic language switching without destroying the whole instance. Do we need lifecycle Component methods?
  useEffect(() => {
    // To prevent Next.js fast refresh from adding additional editors
    if (container.current.children[0]) container.current.children[0].remove();

    const lang = CodeMirrorLanguageByType(language);

    let startState = EditorState.create({
      doc: value,
      extensions: [
        /*
        codeFolding = true,
        lineNumbers = true,
        autocompletion = true,
        matchBrackets = true
        */
        editorSetup(true, true, true, true),
        keymap.of(defaultTabBinding),
        compartments.tabSize.of(EditorState.tabSize.of(indentWidth)),
        compartments.language.of(lang && lang.call()),
        twilight,
      ],
    });

    view.current = new EditorView({
      state: startState,
      parent: container.current,
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

    let parser = "babel";
    if (language === "html") parser = "html";
    if (language === "scss" || language === "css" || parser === "less")
      parser = "css";

    // TODO: Do Prettier on the other supported languages
    if (
      language === "js" ||
      language === "html" ||
      language === "css" ||
      language === "scss" ||
      language === "less"
    ) {
      // prettier can throw hard errors if the parser fails.
      try {
        // replace entire document with prettified version
        const newDoc = prettier.format(value, {
          parser: parser,
          plugins: [parserBabel, parserHtml, parserCss],
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

  return <div ref={container} {...props}></div>;
}
