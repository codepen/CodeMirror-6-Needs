import { useEffect } from "react";

import { useExtensionCompartment } from "./useExtensionCompartment";

import { oneDark } from "@codemirror/theme-one-dark";

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
