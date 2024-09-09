import { useEffect } from "react";
import { keymap } from "@codemirror/view";

// Import Expand Abbreviation command
import {
  abbreviationTracker,
  emmetConfig,
  expandAbbreviation,
} from "@emmetio/codemirror6-plugin";
import { useExtensionCompartment } from "./useExtensionCompartment";
import { LANGUAGES } from "../../../data/languages";
import { Prec } from "@codemirror/state";

const emmetSupportedModes = [
  LANGUAGES.HTML,
  LANGUAGES.PUG,
  LANGUAGES.CSS,
  LANGUAGES.SCSS,
  LANGUAGES.STYLUS,
  LANGUAGES.LESS,
  LANGUAGES.JSX,
  // "sass",
  // "vue", // Is the mode in the Vue custom editor actually "js"?
  // May need JS here? for JSX?
];

const validEmmetEditorMode = (mode) => {
  return emmetSupportedModes.includes(mode);
};

import { EmmetKnownSyntax } from "@emmetio/codemirror6-plugin";

export const LANGUAGES_TO_EMMET_SYNTAX = {
  [LANGUAGES.CSS]: EmmetKnownSyntax.css,
  [LANGUAGES.HAML]: EmmetKnownSyntax.haml,
  [LANGUAGES.HTML]: EmmetKnownSyntax.html,
  [LANGUAGES.JSX]: EmmetKnownSyntax.jsx,
  [LANGUAGES.LESS]: EmmetKnownSyntax.css,
  [LANGUAGES.MARKDOWN]: EmmetKnownSyntax.html,
  [LANGUAGES.NUNJUCKS]: EmmetKnownSyntax.html,
  [LANGUAGES.VUE]: EmmetKnownSyntax.vue,
  [LANGUAGES.PUG]: EmmetKnownSyntax.pug,
  [LANGUAGES.SASS]: EmmetKnownSyntax.sass,
  [LANGUAGES.SCSS]: EmmetKnownSyntax.scss,
  [LANGUAGES.SLIM]: EmmetKnownSyntax.slim,
  [LANGUAGES.STYLUS]: EmmetKnownSyntax.stylus,
};

export function getEmmetSyntax(language) {
  const lang = language; // Gotta tell TypeScript to knock it off :rolling_eyes:
  if (lang && lang in LANGUAGES_TO_EMMET_SYNTAX) {
    return LANGUAGES_TO_EMMET_SYNTAX[lang];
  }

  return false;
}

export function useEmmetExtension(language, editorSettings, editorView) {
  const [compartment, updateCompartment] = useExtensionCompartment(editorView);

  const enabled = editorSettings.emmet;

  useEffect(() => {
    // Emmet only works properly on certain languages
    const canUseEmmet = enabled && validEmmetEditorMode(language);

    updateCompartment(
      canUseEmmet
        ? [
            emmetConfig.of({
              syntax: getEmmetSyntax(language),
              preview: true,
              config: {
                markup: {
                  snippets: {
                    foo: "invalid snippet",
                    // The above will break this VALID snippet below:
                    foo2: "button",
                  },
                },
                stylesheet: {
                  snippets: {},
                },
              },
            }),

            Prec.high(abbreviationTracker()),
          ]
        : []
    );
  }, [language, enabled, updateCompartment]);

  return compartment;
}
