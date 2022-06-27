import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";

import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { INDENT_VALUES } from "../../../data/editorSettings";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

export function useIndentation(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const shouldIndentWithTab = editorSettings.indentUnit === INDENT_VALUES.TABS;
  const indentSize = editorSettings.indentWidth;

  useEffect(() => {
    const indentUnitValue = shouldIndentWithTab ? "\t" : " ".repeat(indentSize);

    updateCompartment([
      indentUnit.of(indentUnitValue),
      EditorState.tabSize.of(indentSize),
      indentationMarkers(),
    ]);
  }, [shouldIndentWithTab, indentSize, updateCompartment]);

  // TODO: convert tabs & spaces
  /*
 From: https://codemirror.net/examples/change/
  When dispatching a transaction, you can also pass an array of changes. The from/to in each of these changes refer to positions in the start document, not to the document created by previously listed changes.

  For example, to replace all tabs in a document with two spaces, you could do something like this:

  ```
  let text = view.state.doc.toString(), pos = 0
  let changes = []
  for (let next; (next = text.indexOf("\t", pos)) > -1;) {
    changes.push({from: next, to: next + 1, insert: "  "})
    pos = next + 1
  }
  view.dispatch({changes})
  ```
  */

  return compartment;
}
