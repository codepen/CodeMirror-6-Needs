import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";

import {
  EditorState,
  keymap,
  indentWithTab /*, indentSelection */,
} from "codemirror";

import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { INDENT_VALUES } from "../../../data/editorSettings";

// TODO: Indent with tab on tab press, update indentation on the current state value?
// https://discuss.codemirror.net/t/codemirror-6-auto-select-and-indent/4175/2
export function useIndentation({ indentUnit /* tabSize, */ }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    //,
    updateCompartment(
      indentUnit === INDENT_VALUES.TABS
        ? [
            keymap.of([indentWithTab]),
            EditorState.tabSize.of(8),
            indentationMarkers(),
          ]
        : [indentationMarkers()]
    );
  }, [indentUnit, updateCompartment]);

  return compartment;
}
