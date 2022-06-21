import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";

import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { INDENT_VALUES } from "../../../data/editorSettings";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";

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
      // NOTE: We need to inform users that with this keymapping active, they must use `Esc` key to exit out of the editor for `tab` to work as expected in the page.
      // NOTE: This keymap refers to the `tab` key, NOT tabs vs spaces.
      keymap.of([indentWithTab]),
    ]);
  }, [shouldIndentWithTab, indentSize, updateCompartment]);

  return compartment;
}
