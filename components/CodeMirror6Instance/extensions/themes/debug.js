import { EditorView } from "codemirror";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Helpful "theme" to debug what Lezer tag properly matches each piece of the syntax.
// https://lezer.codemirror.net/docs/ref/#highlight.tags
const debugTheme = EditorView.theme({
  ".cm-line span": {
    position: "relative",
  },
  ".cm-line span:hover::after": {
    position: "absolute",
    bottom: "100%",
    left: 0,
    background: "black",
    color: "white",
    border: "solid 2px",
    borderRadius: "5px",
    content: "var(--tags)",
    width: `max-content`,
    padding: "1px 4px",
    zIndex: 10,
    pointerEvents: "none",
  },
});
const debugHighlightStyle = HighlightStyle.define(
  Object.entries(tags).map(([key, value]) => {
    return { tag: value, "--tags": `"tag.${key}"` };
  })
);

const debug = [debugTheme, syntaxHighlighting(debugHighlightStyle)];

export { debug, debugTheme, debugHighlightStyle };
