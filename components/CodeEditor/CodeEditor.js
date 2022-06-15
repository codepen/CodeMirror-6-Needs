import classNames from "classnames";
import CodeMirror6Instance from "../CodeMirror6Instance";

export default function CodeEditor({
  title,
  language,
  value,
  editorSettings,
  ...props
}) {
  return (
    <div {...props}>
      <CodeMirror6Instance
        value={value}
        language={language}
        editorSettings={editorSettings}
      />
    </div>
  );
}
