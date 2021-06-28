export const DATA = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>A Great Demo on CodePen</title>
</head>
<body>

</body>
</html>`,

  css: `body {
  background: red;
  margin: 0;
}`,

  js: `let foo = "bar";

const data = {
  age: 12
};

console.log(data.age);

function render() {
  return <div>text</div>;
}`,

  markdown: `# This is markdown

Just some *copy* here.`,

  haml: `- (1..16).each do |i|
  %div #{i}

%blockquote Hello, World!`,

  pug: `-
  var list = ["Uno", "Dos", "Tres",
          "Cuatro", "Cinco", "Seis"]
each item in list
  li= item
  
p
  | The pipe always goes at the beginning of its own line,
  | not counting indentation.`,

  slim: `doctype html
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

  scss: `@mixin cool {
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

  sass: `// SASS SYNTAX
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color`,

  less: `// Variables
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

  stylus: `border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

body
  font: 12px Helvetica, Arial, sans-serif

a.button
  border-radius(5px)`,

  coffeescript: `# Assignment:
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

  typescript: `type Cat = { meows: true };
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

  livescript: `# Easy listing of implicit objects
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

  nunjucks: `{% extends "base.html" %}

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
};
