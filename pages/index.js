import Head from "next/head";
import styles from "../styles/Home.module.scss";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";

export default function Home() {
  // TODO: Get controls working via editorSettings object.
  const [editorSettings, setEditorSettings] = useState({
    fontSize: 16,
    indentWidth: 2,
    theme: "twilight",
  });

  function changeEditorSetting(newSettings) {
    return setEditorSettings((editorSettings) => {
      return {
        ...editorSettings,
        ...newSettings,
      };
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CodeMirror 6 Needs</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1>CodeMirror 6 Needs on CodePen</h1>

        <div className={styles.options}>
          <div>
            <label htmlFor="indent-width">Indent Width</label>
            <select
              id="indent-width"
              value={editorSettings.indentWidth}
              onChange={(e) => {
                changeEditorSetting({ indentWidth: e.target.value });
              }}
            >
              <option>2</option>
              <option>4</option>
              <option>6</option>
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
          <div>
            <label htmlFor="font">Font</label>
            <select id="font">
              <option>Source Code Pro</option>
              <option>Courier Prime</option>
            </select>
          </div>
          <div>
            <label htmlFor="font-size">Font Size</label>
            <select
              id="font-size"
              value={editorSettings.fontSize}
              onChange={(e) => {
                changeEditorSetting({ fontSize: e.target.value });
              }}
            >
              <option value="16">16px</option>
              <option value="20">20px</option>
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
            {/* https://codemirror.net/6/docs/ref/#gutter.lineNumbers */}
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
            {/* https://codemirror.net/6/docs/ref/#fold */}
            <label htmlFor="code-folding">Code Folding</label>
            <select id="code-folding">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            {/* https://codemirror.net/6/docs/ref/#matchbrackets */}
            {/* https://codemirror.net/6/docs/ref/#closebrackets */}
            <label htmlFor="match-brackets">Match Brackets/Tags</label>
            <select id="match-brackets">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
          <div>
            {/* https://codemirror.net/6/docs/ref/#autocomplete */}
            <label htmlFor="autocomplete">Autocomplete</label>
            <select id="autocomplete">
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
        </div>

        {/* Languages! https://codemirror.net/6/examples/lang-package/ */}

        <div className={styles.codeEditors}>
          <CodeEditor
            working={true}
            title={<h2>HTML</h2>}
            className={styles.codeEditor}
            type="html"
            editorSettings={editorSettings}
          />
          <CodeEditor
            working={true}
            title={<h2>CSS</h2>}
            className={styles.codeEditor}
            type="css"
            editorSettings={editorSettings}
          />
          <CodeEditor
            working="partial"
            workingNotes="JSX doesn't seem to highlight well."
            title={<h2>JavaScript / JSX</h2>}
            className={styles.codeEditor}
            type="js"
            editorSettings={editorSettings}
          />
          <CodeEditor
            working="partial"
            workingNotes="Seems to be very limited highlighting."
            title={
              <h2>
                <a href="https://www.markdownguide.org/">Markdown</a>
              </h2>
            }
            className={styles.codeEditor}
            type="markdown"
            editorSettings={editorSettings}
          />
          <CodeEditor
            working={false}
            title={
              <h2>
                <a href="https://haml.info/">Haml</a>
              </h2>
            }
            className={styles.codeEditor}
            type="haml"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="false"
            title={
              <h2>
                <a href="https://pugjs.org/api/getting-started.html">Pug</a>
              </h2>
            }
            className={styles.codeEditor}
            type="pug"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="false"
            title={
              <h2>
                <a href="http://slim-lang.com/">Slim</a>
              </h2>
            }
            className={styles.codeEditor}
            type="slim"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="true"
            title={
              <h2>
                <a href="https://sass-lang.com/">SCSS</a>
              </h2>
            }
            className={styles.codeEditor}
            type="scss"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="false"
            title={
              <h2>
                <a href="https://sass-lang.com/">Sass</a>
              </h2>
            }
            className={styles.codeEditor}
            type="sass"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="false"
            workingNotes="Shouldn't this essentially be the same as SCSS?"
            title={
              <h2>
                <a href="https://lesscss.org/#">Less</a>
              </h2>
            }
            className={styles.codeEditor}
            type="less"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="false"
            title={
              <h2>
                <a href="https://stylus-lang.com/">Stylus</a>
              </h2>
            }
            className={styles.codeEditor}
            type="stylus"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="partial"
            workingNotes="Not an official mode but seems to work fairly well?"
            title={
              <h2>
                <a href="https://coffeescript.org/">CoffeeScript</a>
              </h2>
            }
            className={styles.codeEditor}
            type="coffeescript"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="true"
            title={
              <h2>
                <a href="https://www.typescriptlang.org/">TypeScript</a>
              </h2>
            }
            className={styles.codeEditor}
            type="typescript"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="partial"
            workingNotes="Perhaps works well enough for this little-used language."
            title={
              <h2>
                <a href="https://livescript.net/">LiveScript</a>
              </h2>
            }
            className={styles.codeEditor}
            type="livescript"
            editorSettings={editorSettings}
          />

          <CodeEditor
            working="false"
            title={
              <h2>
                <a href="https://mozilla.github.io/nunjucks/">Nunjucks</a>
              </h2>
            }
            className={styles.codeEditor}
            type="nunjucks"
            editorSettings={editorSettings}
          />
        </div>
      </main>
    </div>
  );
}
