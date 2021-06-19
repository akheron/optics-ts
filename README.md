# optics-ts

![Build](https://github.com/akheron/optics-ts/workflows/tests/badge.svg)

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
and much more! See the [documentation](https://akheron.github.io/optics-ts) for
a tutorial and a detailed reference of all supported optics.

There are currently two "syntaxes" for defining optics: method chaining and
standalone optics. Method chaining is still the default syntax and standalone
syntax is considered experimental, but will probably become the default in the
future.

Here's a standalone optics example, demonstrating how to drill in to a nested
data structure:

```typescript
// Import the standalone library
import * as O from 'optics-ts/floating'

// Create a lens that focuses on author.name. Plain strings works like O.prop().
const optic = O.compose('author', 'name')

// This is the input data
const input = {
  title: "The Hitchhiker's Guide to the Galaxy"
  isbn: "978-0345391803",
  author: {
    name: "Douglas Adams"
  }
}

// Read through the optic
O.get(optic, input)
// "Douglas Adams"

// Write through the optic
O.set(optic, "Arthur Dent", input)
// {
//   title: "The Hitchhiker’s Guide to the Galaxy"
//   isbn: "978-0345391803",
//   author: {
//     name: "Arthur Dent"
//   }
// }

// Update the existing value through the optic, while also changing the data type
O.modify(optic, str => str.length + 29, input)
// {
//   title: "The Hitchhiker’s Guide to the Galaxy"
//   isbn: "978-0345391803",
//   author: {
//     name: 42
//   }
// }
```

Here's the same example with optics defined by method chaining:

```typescript
// Importing from the top-level gives method chaining optics
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

Another example with standalone optics that converts all words longer than 5
characters to upper case:

```typescript
import * as O from 'optics-ts/floating'

const optic = O.compose(
  O.words,
  O.when((s: string) => s.length >= 5)
)

const input = 'This is a string with some shorter and some longer words'
O.modify(optic, (s) => s.toUpperCase(), input)
// "This is a STRING with some SHORTER and some LONGER WORDS"
```

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

The following runs a live reloading server for the documentation:

```
yarn docsify serve docs/
```

Open http://localhost:3000/ in the browser.

### Releasing

```
$ yarn version --new-version <major|minor|patch>
$ yarn publish
$ git push origin main --tags
```

Open https://github.com/akheron/optics-ts/releases, edit the draft release,
select the newest version tag, adjust the description as needed.
