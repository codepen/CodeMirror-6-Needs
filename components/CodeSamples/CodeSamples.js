import CodeEditor from "../CodeEditor";
import { CODE_SAMPLES } from "../../data/code";

import styles from "./CodeSamples.module.scss";

export default function CodeSamples({ editorSettings }) {
  return (
    <div className={styles.root}>
      {CODE_SAMPLES.map(({ label, code, language, notes, supported }) => {
        return (
          <div
            key={language}
            className={styles.sample}
            data-supported={supported}
          >
            <h2>{label}</h2>
            {notes && <p className={styles.notes}>{notes}</p>}
            <CodeEditor
              working={true}
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
