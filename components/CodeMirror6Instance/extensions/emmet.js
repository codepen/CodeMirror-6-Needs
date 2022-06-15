import { useEffect } from "react";
import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import { expandAbbreviation } from "@emmetio/codemirror6-plugin";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useEmmetExtension(editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const enabled = editorSettings.emmet;

  useEffect(() => {
    updateCompartment(
      enabled
        ? // TODO: Regular tab shortcut
          // Bind Expand Abbreviation command to keyboard shortcut
          keymap.of([
            {
              key: "Tab",
              run: expandAbbreviation,
            },
            // {
            //   key: "Cmd-/",
            //   run: toggleComment,
            // },
          ])
        : []
    );
  }, [enabled, updateCompartment]);

  return compartment;
}
