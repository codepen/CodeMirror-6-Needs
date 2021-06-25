import Head from "next/head";
import styles from "../styles/Home.module.scss";
import CodeEditor from "../components/CodeEditor";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CodeMirror 6 Needs</title>
      </Head>

      <main className={styles.main}>
        <h1>CodeMirror 6 Needs</h1>

        <div className={styles.options}>
          <div>
            <label htmlFor="indent-width">Indent Width</label>
            <select id="indent-width">
              <option>2</option>
              <option>4</option>
              <option>6</option>
            </select>
          </div>
          <div>
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
          <div>
            <label htmlFor="font">Font</label>
            <select id="font">
              <option>Source Code Pro</option>
              <option>Courier Prime</option>
            </select>
          </div>
          <div>
            <label htmlFor="font-size">Font Size</label>
            <select id="font-size">
              <option>16px</option>
              <option>20px</option>
            </select>
          </div>
          <div>
            <label htmlFor="emmet">Emmet</label>
            <select id="emmet">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="line-numbers">Line Numbers</label>
            <select id="line-numbers">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="line-wrapping">Line Wrapping</label>
            <select id="line-wrapping">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="code-folding">Code Folding</label>
            <select id="code-folding">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="match-brackets">Match Brackets/Tags</label>
            <select id="match-brackets">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="autocomplete">Autocomplete</label>
            <select id="autocomplete">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
        </div>

        <div className={styles.codeEditors}>
          <CodeEditor className={styles.codeEditor} type="html" tabSize={2} />
          <CodeEditor className={styles.codeEditor} type="css" tabSize={2} />
          <CodeEditor className={styles.codeEditor} type="js" tabSize={2} />
        </div>
      </main>
    </div>
  );
}
