import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { autocompletion } from "@codemirror/autocomplete";

export function useAutocomplete(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(editorSettings.autocomplete ? autocompletion() : []);
  }, [editorSettings.autocomplete, updateCompartment]);

  return compartment;
}
