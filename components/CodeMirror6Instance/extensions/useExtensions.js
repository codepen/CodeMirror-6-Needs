import { useEffect } from "react";
import { basicSetup } from "codemirror";
import { useEmmetExtension } from "./emmet";
import { useLanguageExtension } from "./languages";
import { useThemeExtension } from "./themes";
import { useReadOnly } from "./readOnly";
import { useLineWrapping } from "./lineWrapping";
import { useIndentation } from "./indentation";
import { useFonts } from "./fonts";

export function useExtensions(props, editorView) {
  const language = useLanguageExtension(
    {
      language: props.language,
    },
    editorView
  );

  const { editorSettings } = props;
  // console.log("useExtensions", editorSettings);

  const readOnly = useReadOnly(editorSettings, editorView);
  const emmet = useEmmetExtension(editorSettings, editorView);
  const theme = useThemeExtension(editorSettings, editorView);
  const fonts = useFonts(editorSettings, editorView);
  const lineWrapping = useLineWrapping(editorSettings, editorView);
  const indentation = useIndentation(editorSettings, editorView);

  // useEffect(() => {
  //   editorView && editorView.requestMeasure();
  // }, [editorView, editorSettings.fontSize, editorSettings.fontFamily]);

  return [
    basicSetup,
    readOnly,
    theme,
    fonts,
    lineWrapping,
    indentation,
    language,
    emmet,
  ];
}
