import { EDITOR_SETTINGS } from "../../data/editorSettings";
import styles from "./EditorSettings.module.scss";

export default function EditorSettings({ editorSettings, setEditorSettings }) {
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
        const { label, options, supported, notes, implemented } = value;
        return (
          <div
            key={key}
            className={styles.option}
            data-supported={supported}
            data-implemented={implemented}
          >
            <label htmlFor={key}>{label}</label>
            <select
              id={key}
              value={editorSettings[key]}
              onChange={(e) => {
                let value = e.target.value;
                if (value === "true") value = true;
                if (value === "false") value = false;
                changeEditorSetting({ [key]: value });
                console.log(key, value);
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

            {notes && <div className={styles.notes}>{notes}</div>}
          </div>
        );
      })}
    </div>
  );
}
