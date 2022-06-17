import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { EditorView } from "codemirror";

export function useOnChange({ onChange }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(onChange ? EditorView.updateListener.of(onChange) : []);
  }, [onChange, updateCompartment]);

  return compartment;
}
