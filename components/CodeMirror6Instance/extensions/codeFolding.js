import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { codeFolding, foldGutter } from "@codemirror/language";

export function useCodeFolding(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(
      editorSettings.codeFolding
        ? [
            // https://codemirror.net/docs/ref/#language.codeFolding
            codeFolding(),
            // https://codemirror.net/docs/ref/#language.foldGutter
            foldGutter(),
          ]
        : []
    );
  }, [editorSettings.codeFolding, updateCompartment]);

  return compartment;
}
