import { basicSetup } from "codemirror";
import { useEmmetExtension } from "./emmet";
import { useLanguageExtension } from "./languages";
import { useThemeExtension } from "./themes";
import { useReadOnly } from "./readOnly";
import { useLineWrapping } from "./lineWrapping";
import { useIndentation } from "./indentation";
import { useFonts } from "./fonts";
import { useLineNumbers } from "./lineNumbers";
import { useCodeFolding } from "./codeFolding";

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
  const lineNumbers = useLineNumbers(editorSettings, editorView);
  const emmet = useEmmetExtension(editorSettings, editorView);
  const theme = useThemeExtension(editorSettings, editorView);
  const fonts = useFonts(editorSettings, editorView);
  const lineWrapping = useLineWrapping(editorSettings, editorView);
  const indentation = useIndentation(editorSettings, editorView);
  const codeFolding = useCodeFolding(editorSettings, editorView);

  return [
    lineNumbers,
    codeFolding,
    // basicSetup,
    language,
    readOnly,
    theme,
    fonts,
    lineWrapping,
    indentation,
    emmet,
  ];
}
