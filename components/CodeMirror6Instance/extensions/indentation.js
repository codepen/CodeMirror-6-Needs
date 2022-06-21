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

  return compartment;
}
