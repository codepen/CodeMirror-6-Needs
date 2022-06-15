import { useEffect } from "react";
import { oneDark } from "@codemirror/theme-one-dark";

import { useExtensionCompartment } from "./useExtensionCompartment";

// TODO: Port themes
// https://codemirror.net/examples/styling/
// https://codemirror.net/docs/migration/#dom-structure

export function useThemeExtension(_, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(oneDark);
  }, [updateCompartment]);

  return compartment;
}
