import { LANGUAGES } from "../../data/languages";

// TODO: Dynamic imports
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";

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
