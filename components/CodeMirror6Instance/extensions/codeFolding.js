import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { codeFolding, foldGutter, foldKeymap } from "@codemirror/language";
import { keymap } from "@codemirror/view";

export function useCodeFolding(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(
      editorSettings.codeFolding
        ? [
            // https://codemirror.net/docs/ref/#language.codeFolding
            codeFolding(),
            keymap.of(foldKeymap),
            // https://codemirror.net/docs/ref/#language.foldGutter
            foldGutter(),
          ]
        : []
    );
  }, [editorSettings.codeFolding, updateCompartment]);

  return compartment;
}
