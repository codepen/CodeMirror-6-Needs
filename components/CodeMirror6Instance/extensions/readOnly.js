import { useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useReadOnly({ readOnly }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(EditorState.readOnly.of(readOnly));
  }, [readOnly, updateCompartment]);

  return compartment;
}
