import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import {
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { searchKeymap } from "@codemirror/search";
import { lintKeymap } from "@codemirror/lint";

// Adapted from basicSetup. Using this custom setup instead to better support our Editor Settings and desired CodePen experience.
// https://codemirror.net/docs/ref/#codemirror.basicSetup
// https://github.com/codemirror/basic-setup/blob/main/src/codemirror.ts
// import { basicSetup } from "codemirror";

export const defaultKeymaps = keymap.of([
  ...defaultKeymap,
  ...searchKeymap,
  ...historyKeymap,
  // ...completionKeymap,
  ...lintKeymap,
  indentWithTab,
]);

export const defaultExtensions = [
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  highlightSpecialChars(),
  highlightActiveLine(),
  // https://codemirror.net/docs/ref/#view.highlightActiveLineGutter
  highlightActiveLineGutter(),
  history(),

  drawSelection(),
  // Multi cursor/select
  [
    EditorState.allowMultipleSelections.of(true),
    // https://codemirror.net/docs/ref/#view.rectangularSelection
    rectangularSelection(),
    // https://codemirror.net/docs/ref/#view.crosshairCursor
    crosshairCursor(),
  ],

  dropCursor(),
  indentOnInput(),
  defaultKeymaps,
];
