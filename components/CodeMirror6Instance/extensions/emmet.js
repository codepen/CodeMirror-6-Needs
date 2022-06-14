import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import { expandAbbreviation, toggleComment } from "@emmetio/codemirror6-plugin";

export function emmet() {
  // Bind Expand Abbreviation command to keyboard shortcut
  return keymap.of([
    {
      key: "Tab",
      run: expandAbbreviation,
    },
    // {
    //   key: "Cmd-/",
    //   run: toggleComment,
    // },
  ]);
}
