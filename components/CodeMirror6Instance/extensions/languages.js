import { useEffect, useMemo } from "react";
import { Compartment } from "@codemirror/state";
import { languages } from "@codemirror/language-data";

// TODO: Detect language by file extension
// NOTE: May be able to use @codemirror/language-data for file extensions and lazy loading certain languages https://codemirror.net/docs/ref/#language.LanguageDescription
function getCodeMirrorLanguageData(language) {
  const languageData = languages.find(
    (lang) => lang.name === language || lang.alias.includes(language)
  );

  console.log(language, languageData);

  return languageData;
}

export function useLanguageExtension({ language, editorView }) {
  const languageCompartment = useMemo(() => new Compartment(), []);

  useEffect(() => {
    if (!editorView) return;

    async function loadLanguage() {
      const lang = getCodeMirrorLanguageData(language);

      if (lang) {
        const languageExtension = await lang.load();
        editorView.dispatch({
          effects: languageCompartment.reconfigure(languageExtension),
        });
      }
    }

    loadLanguage();
  }, [language, languageCompartment, editorView]);

  return languageCompartment.of([]);
}
