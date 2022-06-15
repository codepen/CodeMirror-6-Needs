import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "codemirror";
import { useExtensions } from "./extensions/useExtensions";

export function useCodeMirror6Instance(props) {
  const ref = useRef();
  const [editorView, setEditorView] = useState(null);

  const extensions = useExtensions(props, editorView);

  // Initialize CodeMirror6 View
  useEffect(() => {
    // TODO: Handle FileDoc scenario of shared state https://codemirror.net/examples/split/
    const editorState = EditorState.create({
      doc: props.value,
      extensions,
    });

    const editorView = new EditorView({
      state: editorState,
      parent: ref.current,
    });

    // NOTE: State is available as `editorView.state`
    setEditorView(editorView);

    // Destroy when unmounted.
    return () => editorView.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { value } = props;
  useEffect(() => {
    if (!editorView) return;
    // TODO: If value !== current value
    // https://codemirror.net/docs/migration/#making-changes
    editorView.dispatch({
      changes: { from: 0, to: editorView.state.doc.length, insert: value },
    });
  }, [value, editorView]);

  return { ref };
}
