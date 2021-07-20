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
        <h1>CodeMirror 6 Needs on CodePen</h1>

        <EditorSettings
          editorSettings={editorSettings}
          setEditorSettings={setEditorSettings}
        />

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
