import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

const twilightTheme = EditorView.theme(
  {
    "&": {
      color: "white",
      backgroundColor: "#1d1e22",
    },
    ".cm-content": {
      caretColor: "white",
    },
    "&.cm-focused .cm-cursor": { borderLeftColor: "white" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":
      { backgroundColor: "#343539" },
    ".cm-panels": { backgroundColor: "#1d1e22", color: "white" },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },
    ".cm-activeLine": { backgroundColor: "#333438" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    ".cm-matchingBracket, .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
      outline: "1px solid #515a6b",
    },
    ".cm-gutters": {
      backgroundColor: "#1d1e22",
      color: "#34363e",
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#333438",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },
    ".cm-tooltip": {
      border: "1px solid #181a1f",
      backgroundColor: "#1d1e22",
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: "#1d1e22",
        color: "white",
      },
    },
  },
  { dark: true }
);

const twilightHighlightStyle = HighlightStyle.define([
  // @mixin cool, rem, function, return, let, const
  { tag: tags.keyword, color: "#ddca7e" },

  // property name, attribute name, variable name
  {
    tag: tags.name,
    color: "#9a8297",
  },

  // JavaScript property name
  {
    tag: tags.propertyName,
    color: "#9a8297",
  },

  // ???
  {
    tag: [tags.character, tags.macroName],
    color: "blue",
  },

  // JavaScript function name
  {
    tag: [tags.function(tags.variableName), tags.labelName],
    color: "#809bbd",
  },

  // ???
  {
    tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
    color: "#a7925a",
  },

  // variable name
  {
    tag: [tags.definition(tags.name)],
    color: "#809bbd",
  },

  // Semicolon
  {
    tag: [tags.separator],
    color: "white",
  },

  // HTML tag names, selectors
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace,
    ],
    color: "#ddca7e",
  },

  // 0
  { tag: [tags.number], color: "#d0782a" },

  // +
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string),
    ],
    color: "#809bbd",
  },

  // Comments
  { tag: [tags.meta, tags.comment], color: "#717790" },

  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.link, color: "#eee", textDecoration: "underline" },
  {
    tag: tags.heading,
    fontWeight: "bold",
    color: "#eee",
  },
  {
    tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
    color: "#ddca7e",
  },

  // "bar", quoted HTML attribute value
  {
    tag: [tags.processingInstruction, tags.string, tags.inserted],
    color: "#96b38a",
  },

  // Errors
  { tag: [tags.invalid, tags.deleted], color: "red" },
]);

const twilight = [twilightTheme, syntaxHighlighting(twilightHighlightStyle)];

export { twilight, twilightHighlightStyle, twilightTheme };
