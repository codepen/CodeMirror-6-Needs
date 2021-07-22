import { SUPPORT_LEVELS } from "./supportLevels";

export const EDITOR_SETTINGS = {
  indentWidth: {
    label: "Indent Width",
    default: 2,
    options: [2, 4, 6, 8],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes:
      "Works by re-processing code through <a href='https://prettier.io/docs/en/api.html'>Prettier</a> — but is there an official CodeMirror way of altering indent width of pre-authored code?",
  },

  indentUnit: {
    label: "Tabs or Spaces",
    default: "  ",
    options: [" ", "  "],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes:
      "Not working. <a href='https://codemirror.net/6/docs/ref/#language.indentUnit'>Docs?</a>. What do you pass and where? Can it be dispatched?",
  },

  /* https://codemirror.net/6/docs/ref/#gutter.lineNumbers */
  lineNumbers: {
    label: "Line Numbers",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#gutter.lineNumbers'>Officially supported</a>",
  },

  lineWrapping: {
    label: "Line Wrapping",
    default: true,
    options: ["true", "false"],
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes:
      "Seems <a href='https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping'>supported</a>, but unclear exactly how to make it work or dispatch changes. We tried passing `pre` and `pre-wrap` as well as true/false.",
  },

  codeFolding: {
    label: "Code Folding",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#fold'>Officially supported</a>, just need to implement.",
  },

  matchBrackets: {
    label: "Match & Close Brackets",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#matchbrackets'>Officially supported</a>, just need to implement. CodePen has traditionally paired this concept with <a href='https://codemirror.net/6/docs/ref/#closebrackets'>Close Brackets</a>, but they are different plugins, so we'll need to decide if we want to keep the settings combined or separate.",
  },

  /* https://codemirror.net/6/docs/ref/#autocomplete */
  autocomplete: {
    label: "Autocomplete",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#autocomplete'>Officially supported</a>. Need to figure out which languages it works on. Doesn't seem to do simple stuff in JavaScript like `var`, `const`, or `querySelector`. Also we need to pipe in authored JavaScript.",
  },

  emmet: {
    label: "Emmet",
    default: true,
    options: [true, false],
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes:
      "Might be being <a href='https://github.com/emmetio/codemirror-plugin/issues/13'>worked on</a> by Sergey.",
  },

  fontSize: {
    label: "Font Size",
    default: 16,
    options: [12, 14, 16, 18, 20],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes:
      "Does CodeMirror care? Or do we just alter some on-page CSS? It probably effects line wrapping so at least we'd need to “refresh” the editors?",
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
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes:
      "Need to lazy-load the font files and alter some <a href='https://codemirror.net/6/examples/styling/'>on-page CSS</a>.",
  },

  theme: {
    label: "Syntax Highlighting",
    default: "Twilight",
    options: [
      "Twilight",
      "Solarized Dark",
      "Tomorrow Night",
      "Oceanic Dark",
      "Panda",
      "DuoTone Dark",
      "High Contrast Dark",
      "Classic",
      "Solarized Light",
      "XQ Light",
      "Oceanic Light",
      "MDN Like",
      "DuoTone Light",
      "High Contrast Light",
    ],
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes:
      "Lots of themes to port over. And probably support any good looking pre-built themes.",
  },
};

export const EDITOR_SETTINGS_DEFAULTS = Object.entries(EDITOR_SETTINGS).reduce(
  (obj, [key, value]) => {
    obj[key] = value.default;
    return obj;
  },
  {}
);
