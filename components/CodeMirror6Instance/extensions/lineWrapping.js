import { useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useLineWrapping({ lineWrapping }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    console.log("updating line wrapping", lineWrapping);
    updateCompartment(lineWrapping ? EditorView.lineWrapping : null);
  }, [lineWrapping, updateCompartment]);

  return compartment;
}
