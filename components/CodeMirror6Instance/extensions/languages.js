import { useEffect } from "react";
import { languages } from "@codemirror/language-data";
import { useExtensionCompartment } from "./useExtensionCompartment";

// TODO: Detect language by file extension
// NOTE: May be able to use @codemirror/language-data for file extensions and lazy loading certain languages https://codemirror.net/docs/ref/#language.LanguageDescription
function getCodeMirrorLanguageData(language) {
  const languageData = languages.find(
    (lang) => lang.name === language || lang.alias.includes(language)
  );

  return languageData;
}

export function useLanguageExtension({ language, editorView }) {
  const [languageCompartment, updateCompartment] =
    useExtensionCompartment(editorView);

  useEffect(() => {
    async function loadLanguage() {
      const lang = getCodeMirrorLanguageData(language);

      if (lang) {
        const languageExtension = await lang.load();
        updateCompartment(languageExtension);
      }
    }

    loadLanguage();
  }, [language, languageCompartment, updateCompartment]);

  return languageCompartment;
}
