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

- **Bundle Size**: With all the various packages needed for CM6, will the final bundle come down to an acceptable size? Rough estimate shows around 2mb worth of JS in this simple setup.

- **Key Bindings**: CodeMirror 5 support Sublime Text and Vim key bindings. It's not clear if CodeMirror 6 does. Do we absolutely need them or not?
