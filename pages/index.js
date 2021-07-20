import Head from "next/head";
import styles from "../styles/Home.module.scss";
import CodeEditor from "../components/CodeEditor";
import { useState } from "react";
import { EDITOR_SETTINGS_DEFAULTS } from "../data/editorSettings";
import EditorSettings from "../components/EditorSettings";

export default function Home() {
  // TODO: Get controls working via editorSettings object.
  const [editorSettings, setEditorSettings] = useState(
    EDITOR_SETTINGS_DEFAULTS
  );

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
        <h1>CodeMirror 6 Needs</h1>

        <EditorSettings
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />

        {/* Languages! https://codemirror.net/6/examples/lang-package/ */}

        <div className={styles.codeEditors}>
          <CodeEditor
            title={<h2>HTML</h2>}
            className={styles.codeEditor}
            type="html"
            indentWidth={editorSettings.indentWidth}
          />
          <CodeEditor
            title={<h2>CSS</h2>}
            className={styles.codeEditor}
            type="css"
            indentWidth={editorSettings.indentWidth}
          />
          <CodeEditor
            title={<h2>JavaScript / JSX</h2>}
            className={styles.codeEditor}
            type="js"
            indentWidth={editorSettings.indentWidth}
          />
          <CodeEditor
            title={
              <h2>
                <a href="https://www.markdownguide.org/">Markdown</a>
              </h2>
            }
            className={styles.codeEditor}
            type="markdown"
            indentWidth={editorSettings.indentWidth}
          />
          <CodeEditor
            title={
              <h2>
                <a href="https://haml.info/">Haml</a>
              </h2>
            }
            className={styles.codeEditor}
            type="haml"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://pugjs.org/api/getting-started.html">Pug</a>
              </h2>
            }
            className={styles.codeEditor}
            type="pug"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="http://slim-lang.com/">Slim</a>
              </h2>
            }
            className={styles.codeEditor}
            type="slim"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://sass-lang.com/">SCSS</a>
              </h2>
            }
            className={styles.codeEditor}
            type="scss"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://sass-lang.com/">Sass</a>
              </h2>
            }
            className={styles.codeEditor}
            type="sass"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://lesscss.org/#">Less</a>
              </h2>
            }
            className={styles.codeEditor}
            type="less"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://stylus-lang.com/">Stylus</a>
              </h2>
            }
            className={styles.codeEditor}
            type="stylus"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://coffeescript.org/">CoffeeScript</a>
              </h2>
            }
            className={styles.codeEditor}
            type="coffeescript"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://www.typescriptlang.org/">TypeScript</a>
              </h2>
            }
            className={styles.codeEditor}
            type="typescript"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://livescript.net/">LiveScript</a>
              </h2>
            }
            className={styles.codeEditor}
            type="livescript"
            indentWidth={editorSettings.indentWidth}
          />

          <CodeEditor
            title={
              <h2>
                <a href="https://mozilla.github.io/nunjucks/">Nunjucks</a>
              </h2>
            }
            className={styles.codeEditor}
            type="nunjucks"
            indentWidth={editorSettings.indentWidth}
          />
        </div>
      </main>
    </div>
  );
}
