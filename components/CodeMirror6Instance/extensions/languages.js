import { useEffect } from "react";
import { languages } from "@codemirror/language-data";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { LANGUAGES } from "../../../data/languages";

// TODO: Detect language by file extension
// NOTE: May be able to use @codemirror/language-data for file extensions and lazy loading certain languages https://codemirror.net/docs/ref/#language.LanguageDescription

function getLanguageFallback(language) {
  switch (language) {
    case LANGUAGES.NUNJUCKS:
    case LANGUAGES.PUG:
    case LANGUAGES.HAML:
    case LANGUAGES.SLIM:
      return LANGUAGES.HTML;

    case LANGUAGES.SASS:
      return LANGUAGES.SCSS;
  }

  return language;
}

function getCodeMirrorLanguageData(language) {
  language = getLanguageFallback(language);

  const languageData = languages.find(
    (lang) => lang.name === language || lang.alias.includes(language)
  );

  return languageData;
}

export function useLanguageExtension({ language }, editorView) {
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
  }, [language, updateCompartment]);

  return languageCompartment;
}
