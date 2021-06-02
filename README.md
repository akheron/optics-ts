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
