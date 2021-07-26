import { LANGUAGES } from "../../data/languages";

// TODO: Dynamic imports
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";

import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";

export function CodeMirrorLanguageByType(type) {
  switch (type) {
    // These seem fine
    case LANGUAGES.HTML:
      return html;
    case LANGUAGES.CSS:
      return css;
    case LANGUAGES.MARKDOWN:
      return markdown;

    // TODO Make JSX work
    case LANGUAGES.JAVASCRIPT:
    case LANGUAGES.JSX:
      return javascript;

    // TODO: Not quite right.
    case LANGUAGES.SCSS:
    case LANGUAGES.SASS:
    case LANGUAGES.LESS:
    case LANGUAGES.STYLUS:
      return css;

    // TODO entirely
    case LANGUAGES.HAML:
    case LANGUAGES.PUG:
    case LANGUAGES.SLIM:
    case LANGUAGES.NUNJUCKS:
      return html;

    case LANGUAGES.COFFEESCRIPT:
    case LANGUAGES.TYPESCRIPT:
    case LANGUAGES.LIVESCRIPT:
      return javascript;
  }
}

export function adjustIndentWidth({ language, value, indentWidth }) {
  // TODO: Only do Prettier on an Indent Width change.
  // TODO: See if CodeMirror has an official way of doing indentation changes.
  // Do Prettier!
  // https://prettier.io/docs/en/browser.html
  let parser = "babel";
  if (language === "html") parser = "html";
  if (language === "scss" || language === "css" || parser === "less")
    parser = "css";
  // TODO: Do Prettier on the other supported languages
  if (
    language === "js" ||
    language === "html" ||
    language === "css" ||
    language === "scss" ||
    language === "less"
  ) {
    // prettier can throw hard errors if the parser fails.
    try {
      // replace entire document with prettified version
      const formattedValue = prettier.format(value, {
        parser: parser,
        plugins: [parserBabel, parserHtml, parserCss],
        tabWidth: indentWidth,
        //    semi: true,
        trailingComma: "none",
        //    useTabs: indentWith === "tabs",
        bracketSpacing: true,
        jsxBracketSameLine: false,
      });
      return formattedValue;
    } catch (err) {
      console.error(err);
    }
  }
  return value;
}
