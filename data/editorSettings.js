// TODO: Abstract editor settings to object with defaults & values to build UI and hooks.

export const EDITOR_SETTINGS = {
  indentWidth: {
    label: "Indent Width",
    default: 2,
    options: [2, 4, 6, 8],
    supported: "PARTIAL_SUPPORT",
    notes:
      "Works by re-processing code through Prettier—but is there an official CodeMirror way of altering indent width of pre-authored code?",
  },

  /* https://codemirror.net/6/docs/ref/#gutter.lineNumbers */
  lineNumbers: {
    label: "Line Numbers",
    default: true,
    options: [true, false],
    supported: "PARTIAL_SUPPORT",
    notes: "Officially supported — we just need to implement",
  },

  lineWrapping: {
    label: "Line Wrapping",
    default: true,
    options: [true, false],
    supported: "PARTIAL_SUPPORT",
    notes:
      "Seems <a href='https://codemirror.net/6/docs/ref/#view.EditorView.moveToLineBoundary'>supported</a>, but unclear exactly how to do.",
  },

  codeFolding: {
    label: "Code Folding",
    default: true,
    options: [true, false],
    supported: "PARTIAL_SUPPORT",
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#fold'>Officially supported</a>, just need to implement.",
  },

  /* https://codemirror.net/6/docs/ref/#matchbrackets */
  /* https://codemirror.net/6/docs/ref/#closebrackets */
  matchBrackets: {
    label: "Match Brackets",
    default: true,
    options: [true, false],
    supported: "PARTIAL_SUPPORT",
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#matchbrackets'>Officially supported</a>, just need to implement. CodePen has traditionally paired this concept with <a href='https://codemirror.net/6/docs/ref/#closebrackets'>Close Brackets</a>, but they are different plugins, so gotta figure that out.",
  },

  /* https://codemirror.net/6/docs/ref/#autocomplete */
  autocomplete: {
    label: "Autocomplete",
    default: true,
    options: [true, false],
    supported: "PARTIAL_SUPPORT",
    notes:
      "<a href='https://codemirror.net/6/docs/ref/#autocomplete'>Officially supported</a>, just need to implement. Need to figure out which languages it works on.",
  },

  emmet: {
    label: "Emmet",
    default: true,
    options: [true, false],
    supported: "NOT_SUPPORTED",
    notes:
      "Might be being <a href='https://github.com/emmetio/codemirror-plugin/issues/13'>worked on</a> by Sergey.",
  },

  fontSize: {
    label: "Font Size",
    default: 16,
    options: [12, 14, 16, 18, 20],
    supported: "PARTIAL_SUPPORT",
    notes: "Does CodeMirror care? Or do we just alter some on-page CSS?",
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
    supported: "PARTIAL_SUPPORT",
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
    supported: "PARTIAL_SUPPORT",
    notes: "Lots of themes to port over.",
  },
};

export const EDITOR_SETTINGS_DEFAULTS = Object.entries(EDITOR_SETTINGS).reduce(
  (obj, [key, value]) => {
    obj[key] = value.default;
    return obj;
  },
  {}
);
