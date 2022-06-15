import { useEffect } from "react";
// import { oneDark } from "@codemirror/theme-one-dark";

import { useExtensionCompartment } from "./useExtensionCompartment";

// TODO: Port themes
// https://codemirror.net/examples/styling/
// https://codemirror.net/docs/migration/#dom-structure

export const THEMES = {
  TWILIGHT: "Twilight",
  ONE_DARK: "One Dark",
  SOLARIZED_DARK: "Solarized Dark",
  SOLARIZED_LIGHT: "Solarized Light",
  DRACULA: "Dracula",
};

export const THEME_LOADERS = {
  [THEMES.ONE_DARK]: () =>
    import("@codemirror/theme-one-dark").then(({ oneDark }) => oneDark),
  [THEMES.TWILIGHT]: () =>
    import("./themes/twilight").then(({ twilight }) => twilight),
  [THEMES.SOLARIZED_DARK]: () =>
    import("cm6-theme-solarized-dark").then(
      ({ solarizedDark }) => solarizedDark
    ),
  [THEMES.SOLARIZED_LIGHT]: () =>
    import("cm6-theme-solarized-light").then(
      ({ solarizedLight }) => solarizedLight
    ),
  [THEMES.DRACULA]: () => import("thememirror").then(({ dracula }) => dracula),
};

export function useThemeExtension({ theme }, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  useEffect(() => {
    async function loadTheme() {
      const themeLoader = THEME_LOADERS[theme];
      if (themeLoader) {
        const loadedTheme = await themeLoader();
        updateCompartment(loadedTheme);
      }
    }

    loadTheme();
  }, [theme, updateCompartment]);

  return compartment;
}
