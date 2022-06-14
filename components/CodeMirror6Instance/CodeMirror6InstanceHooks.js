import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { useEmmetExtension } from "./extensions/emmet";
import { useLanguageExtension } from "./extensions/languages";
import { useThemeExtension } from "./extensions/themes";

export function useCodeMirror6Instance(props) {
  const ref = useRef();
  const [editorView, setEditorView] = useState(null);

  const emmet = useEmmetExtension({
    enabled: true,
    editorView,
  });

  const language = useLanguageExtension({
    language: props.language,
    editorView,
  });

  const theme = useThemeExtension({
    theme: props.theme,
    editorView,
  });

  // Initialize CodeMirror6 View
  useEffect(() => {
    let editorState = EditorState.create({
      doc: props.value,
      extensions: [basicSetup, theme, language, emmet],
    });

    let editorView = new EditorView({
      state: editorState,
      parent: ref.current,
    });

    setEditorView(editorView);

    // Destroy when unmounted.
    return () => {
      editorView.destroy();
    };
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
