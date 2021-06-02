# optics-ts <!-- {docsify-ignore-all} -->

`optics-ts` provides type-safe, ergonomic, polymorphic optics for TypeScript:

- **Optics** allow you to read or modify values from deeply nested data
  structures, while keeping all data immutable.
- **Ergonomic**: Optics are composed with method chaining, making it easy and
  fun!
- **Polymorphic**: When writing through the optics, you can change the data
  types in the nested structure.
- **Type-safe**: The compiler will type check all operations you do. No `any`,
  ever.

## Contents

- [Installation](installation.md)
- [Tutorial](tutorial.md)
- [API reference](apiref.md)

## Prior art

There are many existing optics libraries of varying degree for JavaScript, but
only few for TypeScript. It's generally hard to create good typings for optics
in TypeScript, and the task becomes impossible if one tried to retrofit types on
an existing JavaScript implementation.

- [monocle-ts](https://github.com/gcanti/monocle-ts) is probably the most
  popular TypeScript optics library.

- [@grammarly/focal](https://github.com/grammarly/focal) is not an optics
  library per se, rather an UI framework for TypeScript.
