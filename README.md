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
