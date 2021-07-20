import { EDITOR_SETTINGS } from "../../data/editorSettings";
import styles from "./EditorSettings.module.scss";

export default function EditorSettings({ editorSettings, setEditorSettings }) {
  console.log(editorSettings);

  function changeEditorSetting(newSettings) {
    return setEditorSettings((editorSettings) => {
      return {
        ...editorSettings,
        ...newSettings,
      };
    });
  }

  return (
    <div className={styles.root}>
      {Object.entries(EDITOR_SETTINGS).map(([key, value]) => {
        const { label, options } = value;
        return (
          <div key={key} className={styles.option}>
            <label htmlFor={key}>{label}</label>
            <select
              id={key}
              value={editorSettings[key]}
              onChange={(e) => {
                changeEditorSetting({ [key]: e.target.value });
              }}
            >
              {options.map((option) => {
                let value = option.value || String(option);
                let label = option.label || value;

                return (
                  <option key={option} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
      <div>
        <label htmlFor="font">Font</label>
        <select id="font">
          <option>Source Code Pro</option>
          <option>Courier Prime</option>
        </select>
      </div>
      <div>
        {/* https://codemirror.net/6/examples/styling/ */}
        <label htmlFor="syntax-highlighting">Syntax Highlighting</label>
        <select id="syntax-highlighting">
          <optgroup label="Dark Themes">
            <option>Twilight</option>
            <option>Solarized Dark</option>
            <option>Tomorrow Night</option>
            <option>Oceanic Dark</option>
            <option>Panda DuoTone</option>
            <option>Dark High</option>
            <option>Contrast Dark</option>
          </optgroup>
          <optgroup label="Light Themes">
            <option>Classic</option>
            <option>Solarized Light</option>
            <option>XQ Light</option>
            <option>Oceanic Light</option>
            <option>MDN Like</option>
            <option>DuoTone Light</option>
            <option>High Contrast Light</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}
