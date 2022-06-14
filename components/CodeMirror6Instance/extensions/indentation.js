import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";

import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { indentWithTab /*, indentSelection */ } from "@codemirror/commands";

// TODO: Indent with tab on tab press, update indentation on the current state value?
// https://discuss.codemirror.net/t/codemirror-6-auto-select-and-indent/4175/2
export function useIndentation({ indentWith, /* tabSize, */ editorView }) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    //,
    updateCompartment(
      indentWith === "tab"
        ? [keymap.of([indentWithTab]), EditorState.tabSize.of(8)]
        : null
    );
  }, [indentWith, updateCompartment]);

  return compartment;
}
