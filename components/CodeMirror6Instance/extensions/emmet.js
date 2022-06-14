import { useEffect } from "react";
import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import { expandAbbreviation } from "@emmetio/codemirror6-plugin";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useEmmetExtension({ enabled }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(
      enabled
        ? // Bind Expand Abbreviation command to keyboard shortcut
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
