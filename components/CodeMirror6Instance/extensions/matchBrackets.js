import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { bracketMatching } from "@codemirror/language";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { keymap } from "@codemirror/view";

export function useMatchBrackets({ matchBrackets }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(
      matchBrackets
        ? [bracketMatching(), closeBrackets(), keymap.of(closeBracketsKeymap)]
        : []
    );
  }, [matchBrackets, updateCompartment]);

  return compartment;
}
