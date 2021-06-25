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

%blockquote Hello, World!  `,
};
