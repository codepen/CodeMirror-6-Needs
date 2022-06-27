import {
  crosshairCursor,
  drawSelection,
  dropCursor,
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
  ...lintKeymap,

  // NOTE: This keymap refers to the `tab` key, NOT tabs vs spaces.
  // NOTE: `indentWithTab` should be loaded after Emmet to ensure Emmet completions can take precedence
  // NOTE: Warn users about ESC + Tab https://codemirror.net/examples/tab/
  indentWithTab,
]);

export const defaultExtensions = [
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  highlightSpecialChars(),
  history(),

  drawSelection(),
  // Multi cursor/select
  [
    EditorState.allowMultipleSelections.of(true),
    rectangularSelection(),
    crosshairCursor(),
  ],

  dropCursor(),
  indentOnInput(),
  defaultKeymaps,
];
