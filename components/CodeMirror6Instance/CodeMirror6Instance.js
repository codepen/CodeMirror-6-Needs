import { Component, createRef } from "react";

import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import { expandAbbreviation, toggleComment } from "@emmetio/codemirror6-plugin";

class CodeMirror6Instance extends Component {
  constructor(props) {
    super(props);
    this.container = createRef();
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (!this.editorState) return null;

    const { editorView } = this;

    const { value } = this.props;
    if (prevProps.value !== value) {
      // https://codemirror.net/docs/migration/#making-changes
      editorView.dispatch({
        changes: { from: 0, to: cm.state.doc.length, insert: value },
      });
    }
  }

  componentWillUnmount() {
    this.editorView.destroy();
  }

  editorState = null;
  editorView = null;
  init() {
    this.editorState = EditorState.create({
      doc: this.props.value,
      extensions: [
        basicSetup,
        // Bind Expand Abbreviation command to keyboard shortcut
        keymap.of([
          {
            key: "Cmd-e",
            run: expandAbbreviation,
          },
          {
            key: "Cmd-/",
            run: toggleComment,
          },
        ]),
      ],
    });

    this.editorView = new EditorView({
      state: this.editorState,
      parent: this.container.current,
    });
  }

  render() {
    const { value, ...props } = this.props;
    return <div ref={this.container} {...props}></div>;
  }
}

export default CodeMirror6Instance;
