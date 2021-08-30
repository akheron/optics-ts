# optics-ts

[![Build](https://github.com/akheron/optics-ts/workflows/tests/badge.svg)](https://github.com/akheron/optics-ts/actions/workflows/tests.yml)

`optics-ts` provides type-safe, ergonomic, polymorphic optics for TypeScript:

- **Optics** allow you to read or modify values from deeply nested data
  structures, while keeping all data immutable.
- **Ergonomic**: Optics are composed with method chaining, making it easy and
  fun!
- **Polymorphic**: When writing through the optics, you can change the data
  types in the nested structure.
- **Type-safe**: The compiler will type check all operations you do. No `any`,
  ever.

## Features

`optics-ts` supports lenses, prisms, traversals, removing items from containers,
and much more!

Since optics-ts v2.2.0, there are two syntaxes for defining optics: method
chaining (the default) and standalone optics (experimental). See
[the docs](https://akheron.github.io/optics-ts) for more info!

## Getting started

Installation:

```
npm install optics-ts
```

or

```
yarn add optics-ts
```

Here's a simple example demonstrating how lenses can be used to drill into a
nested data structure:

```typescript
import * as O from 'optics-ts'

type Book = {
  title: string
  isbn: string
  author: {
    name: string
  }
}

// Create a lens that focuses on author.name
const optic = O.optic_<Book>()
  .prop('author')
  .prop('name')

// This is the input data
const input: Book = {
  title: "The Hitchhiker's Guide to the Galaxy"
  isbn: "978-0345391803",
  author: {
    name: "Douglas Adams"
  }
}

// Read through the optic
O.get(optic)(input)
// "Douglas Adams"

// Write through the optic
O.set(optic)("Arthur Dent")(input)
// {
//   title: "The Hitchhiker’s Guide to the Galaxy"
//   isbn: "978-0345391803",
//   author: {
//     name: "Arthur Dent"
//   }
// }

// Update the existing value through the optic, while also changing the data type
O.modify(optic)(str => str.length + 29)(input)
// {
//   title: "The Hitchhiker’s Guide to the Galaxy"
//   isbn: "978-0345391803",
//   author: {
//     name: 42
//   }
// }
```

Another example that converts all words longer than 5 characters to upper case:

```typescript
import * as O from 'optics-ts/standalone'

const optic = O.optic<string>().words().when(s => s.length >= 5)

const input = 'This is a string with some shorter and some longer words'
O.modify(optic)((s) => s.toUpperCase()(input)
// "This is a STRING with some SHORTER and some LONGER WORDS"
```

See the [documentation](https://akheron.github.io/optics-ts) for a tutorial and
a detailed reference of all supported optics.

## Development

Run `yarn` to install dependencies.

### Running the test suite

Run `yarn test`.

For compiling and running the tests when files change, run these commands in
separate terminals:

```
yarn build:test --watch
yarn jest dist-test/ --watchAll
```

### Documentation

You need Python 3 to build the docs.

```
python3 -m venv venv
./venv/bin/pip install mkdocs-material
```

Run a live reloading server for the documentation:

```
./venv/bin/mkdocs serve
```

Open http://localhost:8000/ in the browser.

### Releasing

```
$ yarn version --new-version <major|minor|patch>
$ yarn publish
$ git push origin main --tags
```

Open https://github.com/akheron/optics-ts/releases, edit the draft release,
select the newest version tag, adjust the description as needed.
