import { useEffect, useMemo } from "react";
import { EditorView } from "@codemirror/view";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useFonts({ fontSize, fontFamily }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  // const Theme = useMemo(
  //   () =>
  //   []
  // );

  useEffect(() => {
    const Theme = EditorView.theme({
      "&": {
        fontSize: `${fontSize}px`,
      },
      ".cm-content": {
        fontFamily: fontFamily,
      },
    });
    console.log("updating font", fontSize, fontFamily);
    updateCompartment([Theme]);
  }, [fontSize, fontFamily, updateCompartment]);

  return compartment;
}
