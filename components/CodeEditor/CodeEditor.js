import CodeMirror6Instance from "../CodeMirror6Instance";

export default function CodeEditor({
  title,
  language,
  value,
  editorSettings,
  onInit,
  ...props
}) {
  return (
    <div {...props}>
      <CodeMirror6Instance
        value={value}
        language={language}
        editorSettings={editorSettings}
        onInit={onInit}
      />
    </div>
  );
}
