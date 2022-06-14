import { useEffect } from "react";

import { useExtensionCompartment } from "./useExtensionCompartment";

import { oneDark } from "@codemirror/theme-one-dark";

export function useThemeExtension({ editorView }) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    console.log({ oneDark });
    updateCompartment(oneDark);
  }, [updateCompartment]);

  return compartment;
}
