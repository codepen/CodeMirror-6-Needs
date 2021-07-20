// TODO: Abstract editor settings to object with defaults & values to build UI and hooks.

export const EDITOR_SETTINGS = {
  indentWidth: {
    label: "Indent Width",
    default: 2,
    options: [2, 4, 6, 8],
  },

  /* https://codemirror.net/6/docs/ref/#gutter.lineNumbers */
  lineNumbers: {
    label: "Line Numbers",
    default: true,
    options: [true, false],
  },

  lineWrapping: {
    label: "Line Wrapping",
    default: true,
    options: [true, false],
  },

  /* https://codemirror.net/6/docs/ref/#fold */
  codeFolding: {
    label: "Code Folding",
    default: true,
    options: [true, false],
  },

  /* https://codemirror.net/6/docs/ref/#matchbrackets */
  /* https://codemirror.net/6/docs/ref/#closebrackets */
  matchBrackets: {
    label: "Match Brackets",
    default: true,
    options: [true, false],
  },

  /* https://codemirror.net/6/docs/ref/#autocomplete */
  autocomplete: {
    label: "Autocomplete",
    default: true,
    options: [true, false],
  },

  emmet: {
    label: "Emmet",
    default: true,
    options: [true, false],
  },

  fontSize: {
    label: "Font Size",
    default: 16,
    options: [12, 14, 16, 18, 20],
  },

  // TODO: Font
  // TODO: Theme
};

export const EDITOR_SETTINGS_DEFAULTS = Object.entries(EDITOR_SETTINGS).reduce(
  (obj, [key, value]) => {
    obj[key] = value.default;
    return obj;
  },
  {}
);
