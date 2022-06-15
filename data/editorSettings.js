import { THEMES } from "../components/CodeMirror6Instance/extensions/themes";
import { SUPPORT_LEVELS } from "./supportLevels";

export const EDITOR_SETTINGS = {
  theme: {
    label: "Syntax Highlighting",
    default: THEMES.TWILIGHT,
    options: Object.values(THEMES), // [THEMES.ONE_DARK, THEMES.TWILIGHT], //Object.values(THEMES),
    // "Solarized Dark",
    // "Tomorrow Night",
    // "Oceanic Dark",
    // "Panda",
    // "DuoTone Dark",
    // "High Contrast Dark",
    // "Classic",
    // "Solarized Light",
    // "XQ Light",
    // "Oceanic Light",
    // "MDN Like",
    // "DuoTone Light",
    // "High Contrast Light",

    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: "We have lots of themes to port over; may want to drop ",
  },

  fontSize: {
    label: "Font Size",
    default: 14,
    options: [10, 12, 14, 16, 18, 20, 22, 24],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: (
      <>
        <a href="https://discuss.codemirror.net/t/changing-the-font-size-of-cm6/2935">
          Implemented via Theme
        </a>
      </>
    ),
  },

  lineHeight: {
    label: "Line Height",
    default: 1.4,
    options: [1, 1.2, 1.4, 1.6, 1.8, 2],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: null,
  },

  fontFamily: {
    label: "Font",
    default: "Source Code Pro",
    options: [
      "Monaco",
      "Hack",
      "Inconsolata",
      "Source Code Pro",
      "Monoid",
      "Fantasque Sans Mono",
      "Input Mono",
      "DejaVu Sans Mono",
      "FireCode Medium",
      "Operator Mono",
      "Dank Mono",
      "Gintronic",
      "Courier Prime",
      "JetBrains Mono",
      "Recursive",
      "MonoLisa",
      "Codelia",
      "Comic Code",
    ],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: null,
  },

  indentWidth: {
    label: "Indent Width",
    default: 2,
    options: [2, 4, 6, 8],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    implemented: false,
    notes: (
      <>
        Works by re-processing code through{" "}
        <a href="https://prettier.io/docs/en/api.html">Prettier</a> — but is
        there an official CodeMirror way of altering indent width of
        pre-authored code?
      </>
    ),
  },

  indentUnit: {
    label: "Tabs or Spaces",
    default: "  ",
    options: [" ", "  "],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    implemented: false,
    notes: (
      <>
        Not working.{" "}
        <a href="https://codemirror.net/6/docs/ref/#language.indentUnit">
          Docs?
        </a>
        . What do you pass and where? Can it be dispatched?
      </>
    ),
  },

  lineNumbers: {
    label: "Line Numbers",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: (
      <>
        <a href="https://codemirror.net/6/docs/ref/#gutter.lineNumbers">
          Officially supported
        </a>
      </>
    ),
  },

  lineWrapping: {
    label: "Line Wrapping",
    default: true,
    options: ["true", "false"],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: (
      <>
        <a href="https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping">
          Officially supported
        </a>
      </>
    ),
  },

  codeFolding: {
    label: "Code Folding",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: (
      <>
        <a href="https://codemirror.net/6/docs/ref/#fold">
          Officially supported.
        </a>
      </>
    ),
  },

  matchBrackets: {
    label: "Match & Close Brackets",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    implemented: true,
    notes: (
      <>
        <p>
          <a href="https://codemirror.net/docs/ref/#language.bracketMatching">
            Officially supported.
          </a>
        </p>
        <p>
          Seems that languages themselves may automatically add `matchBrackets`
          and/or `closeBrackets` without a way to override them... Can this be
          disabled in some way?
        </p>
        <p>
          TODO: CodePen has traditionally paired this concept with{" "}
          <a href="https://codemirror.net/docs/ref/#autocomplete.closeBrackets">
            Close Brackets
          </a>
          , but they are different plugins in CodeMirror. Should we separate or
          combine?
        </p>
      </>
    ),
  },

  /* https://codemirror.net/6/docs/ref/#autocomplete */
  autocomplete: {
    label: "Autocomplete",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    implemented: true,
    notes: (
      <>
        <a href="https://codemirror.net/6/docs/ref/#autocomplete">
          Officially supported
        </a>
        . Need to figure out which languages it works on. Doesn&apos;t seem to
        do simple stuff in JavaScript like `document`, or `querySelector`. Also
        we need to pipe in authored JavaScript, so autocomplete works on
        user-authored code.
      </>
    ),
  },

  emmet: {
    label: "Emmet",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.SUPPORTED,
    implemented: true,
    notes: (
      <>
        <a href="https://github.com/emmetio/codemirror6-plugin">
          Implemented as a plugin
        </a>{" "}
        by Sergey.
      </>
    ),
  },
};

export const EDITOR_SETTINGS_DEFAULTS = Object.entries(EDITOR_SETTINGS).reduce(
  (obj, [key, value]) => {
    obj[key] = value.default;
    return obj;
  },
  {}
);
