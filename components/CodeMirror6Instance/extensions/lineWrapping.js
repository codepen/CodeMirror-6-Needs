import { useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useLineWrapping({ lineWrapping }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(lineWrapping ? EditorView.lineWrapping : null);
  }, [lineWrapping, updateCompartment]);

  return compartment;
}
