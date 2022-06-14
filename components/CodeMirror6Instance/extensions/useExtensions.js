import { useEffect } from "react";
import { basicSetup } from "codemirror";
import { useEmmetExtension } from "./emmet";
import { useLanguageExtension } from "./languages";
import { useThemeExtension } from "./themes";
import { useReadOnly } from "./readOnly";
import { useLineWrapping } from "./lineWrapping";
import { useIndentation } from "./indentation";

export function useExtensions(props, editorView) {
  const language = useLanguageExtension(
    {
      language: props.language,
    },
    editorView
  );

  const { editorSettings } = props;
  // console.log("useExtensions", editorSettings);

  const emmet = useEmmetExtension(
    {
      enabled: editorSettings.emmet,
    },
    editorView
  );

  const theme = useThemeExtension(
    {
      theme: editorSettings.theme,
    },
    editorView
  );

  const readOnly = useReadOnly(
    {
      readOnly: editorSettings.readOnly,
    },
    editorView
  );

  const lineWrapping = useLineWrapping(
    {
      lineWrapping: editorSettings.lineWrapping,
    },
    editorView
  );

  const indentation = useIndentation(
    {
      indentWidth: editorSettings.indentWidth,
      indentUnit: editorSettings.indentUnit || "tab",
    },
    editorView
  );

  useEffect(() => {
    editorView && editorView.requestMeasure();
  }, [editorView, editorSettings.fontSize, editorSettings.fontFamily]);

  return [
    basicSetup,
    readOnly,
    lineWrapping,
    indentation,
    theme,
    language,
    emmet,
  ];
}
