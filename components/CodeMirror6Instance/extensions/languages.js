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
  }

  return language;
}

const htmlLanguage = languages.find((lang) => lang.name === "HTML");

function getCodeMirrorLanguageData(language, matchBrackets) {
  language = getLanguageFallback(language);

  let languageData = languages.find(
    (lang) => lang.name === language || lang.alias.includes(language)
  );

  if (languageData === htmlLanguage) {
    // For HTML, we need to manually override the loader here to turn off `matchClosingTags` and `autoCloseTags` so that we can enable them.
    // TODO: Should this be a distinct option, or paired with `matchBrackets` for simplicity?
    languageData.load = function () {
      return import("@codemirror/lang-html").then((m) =>
        m.html({
          // `matchClosingTags` is part of the language configuration, so we can't easily split that off into a standalone extension.
          matchClosingTags: matchBrackets,
          // `autoCloseTags` is a separate extension exported from `@codemirror/lang-html` so we could split that out, but it kinda makes sense to just leave it here.
          autoCloseTags: matchBrackets,
        })
      );
    };
  }

  return languageData;
}

export function useLanguageExtension({ language, editorSettings }, editorView) {
  const [languageCompartment, updateCompartment] =
    useExtensionCompartment(editorView);

  const matchBrackets = editorSettings?.matchBrackets ? true : false;

  useEffect(() => {
    async function loadLanguage() {
      const lang = getCodeMirrorLanguageData(language, matchBrackets);

      if (lang) {
        const languageExtension = await lang.load();
        updateCompartment(languageExtension);
      }
    }

    loadLanguage();
  }, [language, matchBrackets, updateCompartment]);

  return languageCompartment;
}
