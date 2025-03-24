
# [S](https://github.com/adamhaile/S/tree/master)

S.js - Simple, Clean, Fast Reactive Programming in Javascript

## Features
S.js is a small reactive programming library. It combines an automatic dependency graph with a synchronous execution engine. The goal is to make reactive programming simple, clean, and fast.

- data signals are created with S.data(<value>). They are small containers for a piece of data that may change.
- computations are created with S(() => <code>). They are kept up-to-date as data signals change.

## Test

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./s.js"></script>
</head>
<body>
  <div id="app">SSS</div>
  <button onclick="changeData()">button</button>
  <script>
    let greeting = S.data("Hello"),
    name = S.data("world");

    S(() => document.getElementById('app').textContent = `${greeting()}, ${name()}!`);

    function changeData() {
      name(Math.random())
    }
  </script>
</body>
</html>
```



