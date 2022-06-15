import { useEffect } from "react";
import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import {
  abbreviationTracker,
  expandAbbreviation,
} from "@emmetio/codemirror6-plugin";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useEmmetExtension(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const enabled = editorSettings.emmet;

  useEffect(() => {
    updateCompartment(
      enabled
        ? [
            abbreviationTracker(),
            // Bind Expand Abbreviation command to keyboard shortcut
            // TODO: Regular tab shortcut
            keymap.of([
              {
                key: "Tab",
                run: expandAbbreviation,
              },
              // {
              //   key: "Cmd-/",
              //   run: toggleComment,
              // },
            ]),
          ]
        : []
    );
  }, [enabled, updateCompartment]);

  return compartment;
}
