import { basicSetup } from "codemirror";
import { useEmmetExtension } from "./emmet";
import { useLanguageExtension } from "./languages";
import { useThemeExtension } from "./themes";
import { useReadOnly } from "./readOnly";
import { useLineWrapping } from "./lineWrapping";
import { useIndentation } from "./indentation";

export function useExtensions(props, editorView) {
  const emmet = useEmmetExtension({
    enabled: true,
    editorView,
  });

  const language = useLanguageExtension({
    language: props.language,
    editorView,
  });

  const theme = useThemeExtension({
    theme: props.theme,
    editorView,
  });

  const readOnly = useReadOnly({
    readOnly: props.readOnly,
    editorView,
  });

  const lineWrapping = useLineWrapping({
    lineWrapping: props.lineWrapping || true,
    editorView,
  });

  const indentation = useIndentation({
    indentWith: props.indentWith || "tab",
    editorView,
  });

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
