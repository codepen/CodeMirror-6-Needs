// import { basicSetup } from "codemirror";
import { defaultExtensions } from "./defaultExtensions";
import { useEmmetExtension } from "./emmet";
import { useLanguageExtension } from "./languages";
import { useThemeExtension } from "./themes";
import { useReadOnly } from "./readOnly";
import { useLineWrapping } from "./lineWrapping";
import { useIndentation } from "./indentation";
import { useFonts } from "./fonts";
import { useLineNumbers } from "./lineNumbers";
import { useCodeFolding } from "./codeFolding";
import { useMatchBrackets } from "./matchBrackets";

export function useExtensions(props, editorView) {
  const language = useLanguageExtension(props, editorView);

  const { editorSettings } = props;
  // console.log("useExtensions", editorSettings);

  const lineNumbers = useLineNumbers(editorSettings, editorView);
  const codeFolding = useCodeFolding(editorSettings, editorView);
  const readOnly = useReadOnly(editorSettings, editorView);
  const emmet = useEmmetExtension(editorSettings, editorView);
  const theme = useThemeExtension(editorSettings, editorView);
  const fonts = useFonts(editorSettings, editorView);
  const lineWrapping = useLineWrapping(editorSettings, editorView);
  const indentation = useIndentation(editorSettings, editorView);
  const matchBrackets = useMatchBrackets(editorSettings, editorView);

  return [
    defaultExtensions,
    readOnly,

    // Order can affect gutter layout and cascade precedence.
    lineNumbers,
    codeFolding,
    language,

    // TODO: language overrides matchBrackets ??
    matchBrackets,
    theme,
    fonts,
    lineWrapping,
    indentation,
    emmet,
  ];
}
