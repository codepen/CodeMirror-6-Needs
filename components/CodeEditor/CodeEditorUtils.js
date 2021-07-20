// TODO: Dynamic imports
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";

export function CodeMirrorLanguageByType(type) {
  switch (type) {
    // These seem fine
    case "html":
      return html;
    case "css":
      return css;
    case "markdown":
      return markdown;

    // TODO Make JSX work
    case "js":
    case "jsx":
      return javascript;

    // TODO: Not quite right.
    case "scss":
    case "sass":
    case "less":
    case "stylus":
      return css;

    // TODO entirely
    case "haml":
    case "pug":
    case "slim":
    case "nunjucks":
      return html;

    case "coffeescript":
    case "typescript":
    case "livescript":
      return javascript;
  }
}
