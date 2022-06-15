import { useEffect } from "react";
import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import {
  abbreviationTracker,
  expandAbbreviation,
} from "@emmetio/codemirror6-plugin";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { LANGUAGES } from "../../../data/languages";

const emmetSupportedModes = [
  LANGUAGES.HTML,
  LANGUAGES.PUG,
  LANGUAGES.CSS,
  LANGUAGES.SCSS,
  LANGUAGES.STYLUS,
  LANGUAGES.LESS,
  LANGUAGES.JSX,
  // "sass",
  // "vue", // Is the mode in the Vue custom editor actually "js"?
  // May need JS here? for JSX?
];

const validEmmetEditorMode = (mode) => {
  return emmetSupportedModes.includes(mode);
};

export function useEmmetExtension(language, editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const enabled = editorSettings.emmet;

  useEffect(() => {
    const useEmmet = enabled && validEmmetEditorMode(language);
    console.log({ language, useEmmet });
    updateCompartment(
      useEmmet
        ? [
            abbreviationTracker(),
            // Bind Expand Abbreviation command to keyboard shortcut
            // TODO: Regular tab shortcut
            keymap.of([
              {
                key: "Tab",
                run: expandAbbreviation,
              },
            ]),
          ]
        : []
    );
  }, [language, enabled, updateCompartment]);

  return compartment;
}
