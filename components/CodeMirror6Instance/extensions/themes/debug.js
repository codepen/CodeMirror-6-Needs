import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Helpful "theme" to debug what Lezer tag properly matches each piece of the syntax.
// https://lezer.codemirror.net/docs/ref/#highlight.tags
console.log(tags);
const debugHighlightStyle = HighlightStyle.define(
  Object.entries(tags).map(([key, value]) => {
    return { tag: value, "--tag": `tag.${key}` };
  })
);

const debugTheme = [syntaxHighlighting(debugHighlightStyle)];

export { debugTheme, debugHighlightStyle };
