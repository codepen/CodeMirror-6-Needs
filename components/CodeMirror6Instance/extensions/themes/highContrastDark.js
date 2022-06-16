import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

// TODO: Confirm a match between old & new
const COLORS = {
  black: "#131417",
  darkestGray: "#1e2129",
  darkerGray: "#272c3b",
  white: "#fff",
  yellow: "#ffdd40",
  green: "#a3d65a",
  teal: "#2bc7b9",
  blue: "#5e91f2",
  purple: "#ae63e4",
  blueSlate: "#88afbf",
  red: "#ff3c41",
  orange: "#ff8d41",
  pink: "#d75093",
  gray: "#c7c9d3",
  darkGray: "#9b9dad",
};

const highContrastDarkTheme = EditorView.theme(
  {
    "&": {
      color: COLORS.white,
      backgroundColor: COLORS.black,
    },
    ".cm-content": {
      caretColor: COLORS.white,
    },
    "&.cm-focused .cm-cursor": { borderLeftColor: COLORS.white },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":
      { backgroundColor: COLORS.darkerGray },
    ".cm-panels": { backgroundColor: COLORS.black, color: COLORS.white },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: COLORS.blue,
      color: COLORS.white,
      outline: `1px solid ${COLORS.blue}`,
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    ".cm-matchingBracket, .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
      outline: `1px solid ${COLORS.darkGray}`,
    },
    ".cm-gutters": {
      backgroundColor: COLORS.black,
      color: COLORS.darkGray,
      border: "none",
    },
    ".cm-activeLineGutter": {
      color: COLORS.gray,
    },
    ".cm-activeLine, .cm-activeLineGutter": {
      backgroundColor: COLORS.darkestGray,
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },
    ".cm-tooltip": {
      border: `1px solid ${COLORS.darkGray}`,
      backgroundColor: COLORS.black,
    },
    // ".cm-tooltip-autocomplete": {
    //   "& > ul > li[aria-selected]": {
    //     backgroundColor: "#1d1e22",
    //     color: COLORS.white,
    //   },
    // },
  },
  { dark: true }
);

// https://lezer.codemirror.net/docs/ref/#highlight.tags
const highContrastDarkHighlightStyle = HighlightStyle.define(
  [
    // @mixin cool, rem, function, return, let, const
    { tag: tags.keyword, color: COLORS.yellow },

    // property name, attribute name, variable name
    {
      tag: tags.name,
      color: COLORS.blue,
    },

    // JavaScript property name
    {
      tag: tags.propertyName,
      color: COLORS.blue,
    },

    // ???
    {
      tag: [tags.character, tags.macroName],
      color: COLORS.blue,
    },

    // JavaScript function name
    {
      tag: [tags.function(tags.variableName), tags.labelName],
      color: COLORS.gray,
    },

    // ???
    {
      tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
      color: COLORS.yellow,
    },

    // variable name
    {
      tag: [tags.definition(tags.name)],
      color: COLORS.gray,
    },

    // Semicolon
    {
      tag: [tags.separator],
      color: COLORS.white,
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
      color: COLORS.yellow,
    },

    // 0
    { tag: [tags.number], color: COLORS.teal },

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
      color: COLORS.pink,
    },

    // Comments
    { tag: [tags.meta, tags.comment], color: COLORS.blueSlate },

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
      color: COLORS.yellow,
    },

    // "bar", quoted HTML attribute value
    {
      tag: [tags.processingInstruction, tags.string, tags.inserted],
      color: COLORS.teal,
    },

    // Errors
    { tag: [tags.invalid, tags.deleted], color: COLORS.red },
  ],
  { dark: true }
);

const highContrastDark = [
  highContrastDarkTheme,
  syntaxHighlighting(highContrastDarkHighlightStyle),
];

export {
  highContrastDark,
  highContrastDarkHighlightStyle,
  highContrastDarkTheme,
};
