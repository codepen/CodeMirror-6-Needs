import { LANGUAGES } from "./languages";
import { SUPPORT_LEVELS } from "./supportLevels";

/* Languages! https://codemirror.net/6/examples/lang-package/ */
export const CODE_SAMPLES = [
  {
    language: LANGUAGES.HTML,
    label: "HTML",
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: null,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>A Great Demo on CodePen</title>
</head>
<body>

</body>
</html>`,
  },
  {
    language: LANGUAGES.CSS,
    label: "CSS",
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: null,
    code: `body {
  background: red;
  margin: 0;
}`,
  },
  {
    language: LANGUAGES.JAVASCRIPT,
    label: "JavaScript",
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: null,
    code: `import gsap from 'gsap';

  let foo = "bar";

const data = {
  age: 12
};

console.log(data.age);
`,
  },
  {
    language: LANGUAGES.JSX,
    label: "JSX",
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: null,
    code: `import React from 'react';

function App() {
  return <div>text</div>;
}

export default App;
`,
  },
  {
    language: LANGUAGES.MARKDOWN,
    label: "Markdown",
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: "Limited highlighting",
    code: `# This is markdown

Just some *copy* here with a [link](https://codepen.io) in it.

> blockquote

Ordered List
1. First item
2. Second item
3. Third item

Unordered List
- First item
- Second item
- Third item
`,
  },
  {
    language: LANGUAGES.HAML,
    label: <a href="https://haml.info/">Haml</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes: null,
    code: `- (1..16).each do |i|
  %div #{i}

%blockquote Hello, World!`,
  },
  {
    language: LANGUAGES.PUG,
    label: <a href="https://pugjs.org/api/getting-started.html">Pug</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    code: `-
  var list = ["Uno", "Dos", "Tres",
          "Cuatro", "Cinco", "Seis"]
each item in list
  li= item

p
  | The pipe always goes at the beginning of its own line,
  | not counting indentation.`,
  },
  {
    language: LANGUAGES.SLIM,
    label: <a href="http://slim-lang.com/">Slim</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes: null,
    code: `doctype html
html
  head
    title Slim Examples
    meta name="keywords" content="template language"
    meta name="author" content=author
    javascript:
      alert('Slim supports embedded javascript!')

  body
    h1 Markup examples

    #content
      p This example shows you what a basic Slim file looks like.

      == yield

      - unless items.empty?
        table
          - items.each do |item|
            tr
              td.name = item.name
              td.price = item.price
      - else
        p
         | No items found.  Please add some inventory.
           Thank you!

    div id="footer"
      = render 'footer'
      | Copyright © #{year} #{author}`,
  },
  {
    language: LANGUAGES.SCSS,
    label: <a href="https://sass-lang.com/">SCSS</a>,
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: null,
    code: `@mixin cool {
  padding: 1rem;
}

.options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin: 0 0 1rem 0;
  > div {
    flex: 1;
  }
  label {
    display: block;
  }
  select {
    width: 100%;
  }
}
`,
  },
  {
    language: LANGUAGES.SASS,
    label: <a href="https://sass-lang.com/">Sass</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    code: `// SASS SYNTAX
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color`,
  },
  {
    language: LANGUAGES.SCSS,
    label: <a href="https://lesscss.org/#">Less</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes: null,
    code: `// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);

// Usage
a,
.link {
  color: @link-color;
}
a:hover {
  color: @link-color-hover;
}
.widget {
  color: #fff;
  background: @link-color;
}`,
  },
  {
    language: LANGUAGES.STYLUS,
    label: <a href="https://stylus-lang.com/">Stylus</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes: null,
    code: `border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

body
  font: 12px Helvetica, Arial, sans-serif

a.button
  border-radius(5px)`,
  },
  {
    language: LANGUAGES.COFFEESCRIPT,
    label: <a href="https://coffeescript.org/">CoffeeScript</a>,
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes: "Not an official mode but seems to work fairly well?",
    code: `# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)`,
  },
  {
    language: LANGUAGES.TYPESCRIPT,
    label: <a href="https://www.typescriptlang.org/">TypeScript</a>,
    supported: SUPPORT_LEVELS.SUPPORTED,
    notes: null,
    code: `type Cat = { meows: true };
type Dog = { barks: true };
type Cheetah = { meows: true; fast: true };
type Wolf = { barks: true; howls: true };

// We can create a conditional type which lets extract
// types which only conform to something which barks.

type ExtractDogish<A> = A extends { barks: true } ? A : never;

// Then we can create types which ExtractDogish wraps:

// A cat doesn't bark, so it will return never
type NeverCat = ExtractDogish<Cat>;
// A wolf will bark, so it returns the wolf shape
type Wolfish = ExtractDogish<Wolf>;
`,
  },
  {
    language: LANGUAGES.LIVESCRIPT,
    label: <a href="https://livescript.net/">LiveScript</a>,
    supported: SUPPORT_LEVELS.PARTIAL_SUPPORT,
    notes: "Perhaps works well enough for this little-used language.",
    code: `# Easy listing of implicit objects
table1 =
  * id: 1
    name: 'george'
  * id: 2
    name: 'mike'
  * id: 3
    name: 'donald'

table2 =
  * id: 2
    age: 21
  * id: 1
    age: 20
  * id: 3
    age: 26`,
  },
  {
    language: LANGUAGES.NUNJUCKS,
    label: <a href="https://mozilla.github.io/nunjucks/">Nunjucks</a>,
    supported: SUPPORT_LEVELS.NOT_SUPPORTED,
    notes: null,
    code: `{% extends "base.html" %}

{% block header %}
<h1>{{ title }}</h1>
{% endblock %}

{% block content %}
<ul>
  {% for name, item in items %}
  <li>{{ name }}: {{ item }}</li>
  {% endfor %}
</ul>
{% endblock %}`,
  },
];
