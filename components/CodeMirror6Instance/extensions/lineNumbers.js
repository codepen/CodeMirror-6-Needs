import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { lineNumbers } from "@codemirror/view";

export function useLineNumbers(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(
      editorSettings.lineNumbers
        ? // https://codemirror.net/docs/ref/#view.lineNumbers
          lineNumbers()
        : []
    );
  }, [editorSettings.lineNumbers, updateCompartment]);

  return compartment;
}
