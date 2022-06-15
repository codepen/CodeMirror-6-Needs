import classNames from "classnames";
import styles from "./CodeEditor.module.scss";
import CodeMirror6Instance from "../CodeMirror6Instance";

export default function CodeEditor({
  className,
  title,
  language,
  value,
  editorSettings,
  ...props
}) {
  return (
    <div {...props} className={classNames(className, styles.editor)}>
      <CodeMirror6Instance
        value={value}
        language={language}
        editorSettings={editorSettings}
      />
    </div>
  );
}
