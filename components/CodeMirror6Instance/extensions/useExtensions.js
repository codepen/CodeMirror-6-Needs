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
import { useAutocomplete } from "./autocomplete";
import { useOnChange } from "./onChange";
import { useExtraExtensions } from "./extensions";

export function useExtensions(props, editorView) {
  const languageExtension = useLanguageExtension(props, editorView);

  const editorSettings = props.editorSettings || {};
  // console.log("useExtensions", editorSettings);

  const lineNumbersExtension = useLineNumbers(editorSettings, editorView);
  const codeFoldingExtension = useCodeFolding(editorSettings, editorView);
  const themeExtension = useThemeExtension(editorSettings, editorView);
  const fontsExtension = useFonts(editorSettings, editorView);
  const lineWrappingExtension = useLineWrapping(editorSettings, editorView);
  const indentationExtension = useIndentation(editorSettings, editorView);
  const matchBracketsExtension = useMatchBrackets(editorSettings, editorView);
  const autocompleteExtension = useAutocomplete(editorSettings, editorView);
  const emmetExtension = useEmmetExtension(
    props.language,
    editorSettings,
    editorView
  );
  const readOnlyExtension = useReadOnly(props, editorView);
  const onChangeExtension = useOnChange(props, editorView);
  const extraExtensions = useExtraExtensions(props, editorView);

  return [
    // Order for Emmet & default is important to allow `tab` key indentation to work.
    emmetExtension,
    defaultExtensions,

    // Order can affect gutter layout and cascade precedence.
    lineNumbersExtension,
    codeFoldingExtension,
    languageExtension,

    matchBracketsExtension,
    autocompleteExtension,
    readOnlyExtension,
    themeExtension,
    fontsExtension,
    lineWrappingExtension,
    indentationExtension,
    onChangeExtension,
    extraExtensions,
  ];
}
