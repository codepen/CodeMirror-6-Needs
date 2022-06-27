import { useMemo, useCallback } from "react";
import { Compartment } from "@codemirror/state";

export function useExtensionCompartment(editorView) {
  const compartment = useMemo(() => new Compartment(), []);

  const dispatch = editorView?.dispatch;
  const updateCompartment = useCallback(
    function updateCompartment(extension) {
      if (dispatch)
        dispatch({
          effects: compartment.reconfigure(extension),
        });
    },
    [compartment, dispatch]
  );

  return [
    // Initial value of [] to prevent extension errors
    compartment.of([]),
    updateCompartment,
  ];
}
