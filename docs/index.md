# optics-ts

`optics-ts` provides type-safe, ergonomic, polymorphic optics for TypeScript

- Many optic types: lens, prism, traversal, getter, affine fold, fold, setter
- Optics for operating on multiple data types: objects, arrays, discriminated
  unions, strings.
- Removable optics: Allow removing items from containers.
- Ergonomic API: No boilerplate, concise naming.
- Type-safe: The compiler will type check all operations you do. No `any`, ever.
- Most optics are fully polymorphic: You can write a different data type and
  still get full type safety.
- Supports both ES6 and CommonJS modules in a single code base.
- Tree shaking support with standalone optics (see
  [The Two Syntaxes](two-syntaxes.md)).

## Example

=== "Method chaining"

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

=== "Standalone"

    ```typescript
    import * as O from 'optics-ts/standalone'

    // Create a lens that focuses on author.name
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
    O.modify(optic, (str) => str.length + 29, input)
    // {
    //   title: "The Hitchhiker’s Guide to the Galaxy"
    //   isbn: "978-0345391803",
    //   author: {
    //     name: 42
    //   }
    // }
    ```

For more information about the differences between the method chaining and
standalone syntaxes, see [The Two Syntaxes](two-syntaxes.md).
