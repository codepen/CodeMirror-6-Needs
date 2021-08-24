# A Playground to Figure Out Everything We Need Out of CodeMirror 6

It's a [Next.js](https://nextjs.org/docs) app as that is the context we hope to be using [CodeMirror 6](https://codemirror.net/6/) in.

Here's [a quick Netlify deployment](https://objective-blackwell-d4efc9.netlify.app/) to see what we mean.

# TODOs

- [ ] Port all our [existing syntax highlighting](https://github.com/codepen/CodeMirror-6-Needs/tree/main/styles/OLD-THEMES) themes to the [new format](https://github.com/codepen/CodeMirror-6-Needs/blob/main/themes/twilight.js).

- [ ] Make [language packages](https://codemirror.net/6/examples/lang-package/) for...

  - [ ] Haml
  - [ ] Slim
  - [ ] Nunjucks
  - [ ] Sass (.scss format)
  - [ ] Sass (.sass format)
  - [ ] Less
  - [ ] Stylus
  - [ ] JSX (supported with JS package?)
  - [ ] CoffeeScript
  - [ ] TypeScript
  - [ ] LiveScript

- [ ] Make [Emmet Work](https://github.com/emmetio/codemirror-plugin/issues/13)

- [ ] [Search functionality](https://codemirror.net/6/docs/ref/#search)

- [ ] [Commenting Functionality](https://codemirror.net/6/docs/ref/#comment)

- [ ] Decide on supporting [Rectangular Selection](https://codemirror.net/6/docs/ref/#rectangular-selection)

# Concerns

- **Bundle Size**: With all the various packages needed for CM6, will the final bundle come down to an acceptable size? This repo is odd in that it includes Prettier at the moment to replicate our cody tidying features and for changing indentation, and that represents most of the JavaScript in the bundle. How can we see _only_ what CodeMirror contributes? `yarn run analyze` makes a visualization, so if we could remove Prettier from that it would be more accurate.

- **Key Bindings**: CodeMirror 5 support Sublime Text and Vim key bindings. It's not clear if CodeMirror 6 does. Do we absolutely need them or not?

# Notes from Marijn Haverbeke we need to look at

- "Indent Width" is controlled with the `indentUnit` [1] facet. There's autoindentation logic and an `indentSelection` command, but I don't think there currently is a convenient way to reindent the entire document. Not sure if doing that implicitly would be a good idea—it might mess up manual formatting or even break things in whitespace-sensitive languages.

- "Tabs or Spaces" whether autoindentation uses tabs or spaces is also controlled by `indentUnit` [1]. The column width of tabs is controlled by `EditorState.tabSize` [2]

- "Line Wrapping" is enabled with the `EditorView.lineWrapping` extension [3].

- "Autocomplete" -- there's a rather solid module for handling autocompletion, but only robust completion sources for a few languages (HTML, XML, SQL). I have some unconcrete plans for adding some form of scope tracking to the system, which could help a lot with completion in languages like JS, but I don't know if/when that will materialize.

- "Font Size" you can just change with CSS, and then follow up with a call to `requestMeasure` [4] to make sure the editor adjusts its internal info about the layout.

- "Do we have to re-initialize the editor to change the theme or can we dispatch a change for a dynamically imported theme?" if you reconfigure [5] your theme extension, the highlighting will update immediately.

- "Key bindings": There's some people working on vim bindings, but I don't have plans to port over the Sublime and Emacs bindings in the near future. The default bindings are based on VS Code (though they don't cover everything VS Code does).

[1]: https://codemirror.net/6/docs/ref/#language.indentUnit
[2]: https://codemirror.net/6/docs/ref/#state.EditorState%5EtabSize
[3]: https://codemirror.net/6/docs/ref/#view.EditorView^lineWrapping
[4]: https://codemirror.net/6/docs/ref/#view.EditorView.requestMeasure
[5]: https://codemirror.net/6/examples/config/#dynamic-configuration
