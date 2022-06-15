import { useEffect, useMemo } from "react";
import { EditorView } from "codemirror";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useFonts({ fontSize, fontFamily, lineHeight }, editorView) {
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
      ".cm-scroller": {
        fontFamily: fontFamily,
        lineHeight: lineHeight,
      },
    });
    updateCompartment([Theme]);
  }, [lineHeight, fontSize, fontFamily, updateCompartment]);

  return compartment;
}
