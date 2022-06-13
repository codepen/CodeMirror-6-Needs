import classNames from "classnames";
import styles from "./CodeEditor.module.scss";
import CodeMirror6Instance from "../CodeMirror6Instance";

export default function CodeEditor({
  className,
  title,
  language,
  value,
  editorSettings,
  working,
  workingNotes,
  style,
  ...props
}) {
  return (
    <div
      {...props}
      className={classNames(className, styles.editor)}
      style={{
        ...style,
        "--font-size": `${editorSettings.fontSize}px`,
        "--font-family": `"${editorSettings.fontFamily}", monospace`,
      }}
    >
      <CodeMirror6Instance value={value} language={language} />
    </div>
  );
}
