import { useEffect } from "react";
// import { oneDark } from "@codemirror/theme-one-dark";

import { useExtensionCompartment } from "./useExtensionCompartment";

import * as themeMirror from "thememirror";

// TODO: Port themes
// https://codemirror.net/examples/styling/
// https://codemirror.net/docs/migration/#dom-structure

export const THEMES = {
  TWILIGHT: "Twilight",
  ONE_DARK: "One Dark",
  // https://github.com/craftzdog/cm6-themes/
  SOLARIZED_DARK: "Solarized Dark",
  SOLARIZED_LIGHT: "Solarized Light",
  MATERIAL_DARK: "Material Dark",
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
  [THEMES.MATERIAL_DARK]: () =>
    import("cm6-theme-material-dark").then(({ materialDark }) => materialDark),

  // [THEMES.DRACULA]: () => import("thememirror").then(({ dracula }) => dracula),
};

// Automatically adding the ThemeMirror instead of manually setting up the lazy loading for each of these themes.
Object.entries(themeMirror).forEach(([key, theme]) => {
  if (key !== "createTheme") {
    THEMES[key] = key;
    THEME_LOADERS[key] = () => theme;
  }
});

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
