import { useRef, useEffect } from "react";
import classNames from "classnames";

import { editorSetup } from "./CodeEditorSetup";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultTabBinding } from "@codemirror/commands";

// TODO: Dynamic imports. Only import the themes and/or languages needed.
// import { oneDark } from "@codemirror/theme-one-dark";
import { twilight } from "../../themes/twilight";

import { adjustIndentWidth, CodeMirrorLanguageByType } from "./CodeEditorUtils";

import styles from "./CodeEditor.module.scss";

// TODO: EditorSettings - rebuild with new settings or try to update compartments?

export default function CodeEditor({
  className,
  title,
  language,
  value,
  editorSettings,
  working,
  workingNotes,
  style,
  ...props
}) {
  const indentWidth = Number(editorSettings.indentWidth);
  const container = useRef();
  const view = useRef();
  const compartments = {
    language: new Compartment(),
    tabSize: new Compartment(),
    // indentUnit: new Compartment(),
  };

  // TODO: Dynamic language switching without destroying the whole instance. Do we need lifecycle Component methods?
  useEffect(() => {
    // To prevent Next.js fast refresh from adding additional editors
    if (container.current.children[0]) container.current.children[0].remove();

    const lang = CodeMirrorLanguageByType(language);

    let startState = EditorState.create({
      doc: value,
      extensions: [
        editorSetup(editorSettings),
        keymap.of(defaultTabBinding),
        compartments.tabSize.of(EditorState.tabSize.of(indentWidth)),
        // compartments.indentUnit.of(EditorState.indentUnit.of(indentUnit)),
        compartments.language.of(lang && lang.call()),
        twilight,
      ],
    });

    let editorView = new EditorView({
      state: startState,
      parent: container.current,
      lineWrapping: editorSettings.lineWrapping,
    });

    view.current = editorView;

    return () => {
      editorView.destroy();
    };
  }, [
    indentWidth,
    editorSettings.indentUnit,
    editorSettings.lineWrapping,
    editorSettings.lineNumbers,
    editorSettings.codeFolding,
    editorSettings.autocomplete,
    editorSettings.matchBrackets,
  ]);

  useEffect(() => {
    console.log("second useeffect");
    if (view.current) {
      // TODO: Try to dispatch rather than rebuild.
      // view.current.dispatch({
      //   effects: compartments.tabSize.reconfigure(
      //     EditorState.tabSize.of(indentWidth)
      //   ),
      // });

      console.log("trying prettier");
      const formattedValue = adjustIndentWidth({
        indentWidth,
        language,
        value,
      });
      view.current.dispatch(
        view.current.state.update({
          changes: {
            from: 0,
            to: view.current.state.doc.length,
            insert: formattedValue,
          },
        })
      );
    }
  }, [indentWidth, language, value]);

  const { fontSize, fontFamily } = editorSettings;
  useEffect(() => {
    // Is there a better way to "refresh" the view if font-size and such change?
    view.current.requestMeasure();
  }, [fontSize, fontFamily]);

  return (
    <div
      {...props}
      ref={container}
      className={classNames(className, styles.editor)}
      style={{
        ...style,
        "--font-size": `${editorSettings.fontSize}px`,
        "--font-family": `"${editorSettings.fontFamily}", monospace`,
      }}
    ></div>
  );
}
