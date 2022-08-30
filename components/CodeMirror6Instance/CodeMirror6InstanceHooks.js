import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { useExtensions } from "./extensions/useExtensions";

export function useCodeMirror6Instance(props) {
  const ref = useRef();
  const [editorView, setEditorView] = useState(null);

  const extensions = useExtensions(props, editorView);

  // Initialize CodeMirror6 View
  useEffect(() => {
    const editorState =
      props.state ||
      EditorState.create({
        doc: props.value,
        extensions,
      });

    const editorView = new EditorView({
      state: editorState,
      parent: ref.current,
    });

    // NOTE: State is available as `editorView.state`
    setEditorView(editorView);

    props.onInit && props.onInit(editorView);

    // Destroy when unmounted.
    return () => editorView.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { value } = props;
  useEffect(() => {
    const validValue = value || value === "";
    if (!editorView || !validValue) return;

    const currentValue = editorView.state.doc.toString();
    if (value !== currentValue) {
      // https://codemirror.net/docs/migration/#making-changes
      // NOTE: "To completely reset a state—for example to load a new document—it is recommended to create a new state instead of a transaction. That will make sure no unwanted state (such as undo history events) sticks around."
      // editorView.setState(EditorState.create())
      editorView.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: value },
      });
    }
  }, [value, editorView]);

  // Swap out state
  useEffect(() => {
    if (props.state && props.state !== editorView.state) {
      editorView.setState(props.state);
    }
  }, [props.state, editorView]);

  return { ref };
}
