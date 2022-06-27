import { useEffect } from "react";
import { useExtensionCompartment } from "./useExtensionCompartment";

export function useExtraExtensions({ extensions }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    updateCompartment(extensions || []);
  }, [extensions, updateCompartment]);

  return compartment;
}
