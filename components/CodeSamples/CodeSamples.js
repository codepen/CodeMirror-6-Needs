import { useState } from "react";

import CodeEditor from "../CodeEditor";
import { CODE_SAMPLES } from "../../data/code";
import { SUPPORT_LEVELS } from "../../data/supportLevels";

import styles from "./CodeSamples.module.scss";

export default function CodeSamples({ editorSettings }) {
  const [supportedFilter, setSupportedFilter] = useState("ALL");
  const [nameFilter, setNameFilter] = useState("");

  let filteredSamples = [...CODE_SAMPLES];

  if (supportedFilter && supportedFilter !== "ALL") {
    filteredSamples = filteredSamples.filter(
      (sample) => sample.supported === supportedFilter
    );
  }

  if (nameFilter) {
    filteredSamples = filteredSamples.filter((sample) =>
      sample.language.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <label>
          <div>Support Level</div>
          <select onChange={(e) => setSupportedFilter(e.currentTarget.value)}>
            <option value="ALL">All</option>
            {Object.entries(SUPPORT_LEVELS).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label>
          <div>Name</div>
          <input
            type="search"
            onChange={(e) => setNameFilter(e.currentTarget.value)}
          />
        </label>
      </div>
      {filteredSamples.map(({ label, code, language, notes, supported }, i) => {
        return (
          <div
            key={language + i}
            className={styles.sample}
            data-supported={supported}
          >
            <h2>{label}</h2>
            {notes && <p className={styles.notes}>{notes}</p>}
            <CodeEditor
              className={styles.codeEditor}
              language={language}
              value={code}
              editorSettings={editorSettings}
            />
          </div>
        );
      })}
    </div>
  );
}
