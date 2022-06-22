import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { useExtensionCompartment } from "./useExtensionCompartment";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";

const hideCursorTheme = EditorView.theme({
  ".cm-cursor-primary": {
    display: "none",
    opacity: 0,
  },
});

export function useReadOnly({ readOnly }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    const value = [EditorState.readOnly.of(readOnly)];
    if (readOnly) {
      // Hide cursor if read only
      value.push(hideCursorTheme);
    } else {
      // Highlight active lines if not read only
      value.push(highlightActiveLine(), highlightActiveLineGutter());
    }
    updateCompartment(value);
  }, [readOnly, updateCompartment]);

  return compartment;
}
