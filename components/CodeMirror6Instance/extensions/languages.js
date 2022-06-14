import { useEffect, useMemo } from "react";
import { Compartment } from "@codemirror/state";
import { StreamLanguage } from "@codemirror/language";

import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript";
import { liveScript } from "@codemirror/legacy-modes/mode/livescript";
import { stylus } from "@codemirror/legacy-modes/mode/stylus";

import { LANGUAGES } from "../../../data/languages";

// TODO: Detect language by file extension
// TODO: Lazy Load with dynamic `import()`
// NOTE: May be able to use @codemirror/language-data for file extensions and lazy loading certain languages https://codemirror.net/docs/ref/#language.LanguageDescription
function getCodeMirrorLanguage(language) {
  switch (language) {
    case LANGUAGES.HTML:
      return html();
    case LANGUAGES.CSS:
      return css();
    case LANGUAGES.JAVASCRIPT:
      return javascript();
    case LANGUAGES.JSX:
      return javascript({ jsx: true });
    case LANGUAGES.TYPESCRIPT:
      return javascript({ typescript: true });

    case LANGUAGES.MARKDOWN:
      return markdown();

    // LEGACY MODES
    case LANGUAGES.COFFEESCRIPT:
      return StreamLanguage.define(coffeeScript);

    case LANGUAGES.LIVESCRIPT:
      return StreamLanguage.define(liveScript);

    case LANGUAGES.STYLUS:
      return StreamLanguage.define(stylus);

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
