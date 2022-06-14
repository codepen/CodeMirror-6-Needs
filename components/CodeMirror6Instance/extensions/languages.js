import { Compartment } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";
import { useEffect, useMemo } from "react";

// TODO: Detect language by file extension
// TODO: Lazy Load with dynamic `import()`
function getCodeMirrorLanguage(language) {
  switch (language) {
    case "html":
    case "xhtml":
      return html();
    case "css":
      return css();
    case "javascript":
    case "js":
    case "jsx":
      return javascript();
    case "markdown":
    case "md":
      return markdown();
    default:
      return undefined;
  }
}

export function useLanguageExtension({ language, editorView }) {
  const languageCompartment = useMemo(() => new Compartment(), []);

  useEffect(() => {
    if (!editorView) return;
    const lang = getCodeMirrorLanguage(language);

    if (lang) {
      editorView.dispatch({
        effects: languageCompartment.reconfigure(lang),
      });
    }
  }, [language, languageCompartment, editorView]);

  return languageCompartment.of([]);
}
