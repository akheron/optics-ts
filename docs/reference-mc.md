# Method chaining API

!!! note

    Since optics-ts v2.2.0, there are two syntaxes for optics: **method chaining**
    and **standalone optics**. For more information about the differences between
    them, see [The Two Syntaxes](two-syntaxes.md).

Everything below assumes the following import:

```typescript
import * as O from 'optics-ts'
```

Optics are composed with method chaining. This means that each optic type has
most of the methods documented below, regardless of the type of the optic that
the method creates. The only difference is the return type, which is determined
by the composition rules above.

For example, assume we have a variable `myLens` that holds a `Lens`, and call
`.optional()` on it:

```typescript
const newOptic = myLens.optional()
```

`.optional()` creates a prism, so `newOptic` will be a composition of lens and
prism, i.e. a prism.

Which methods each optic type has depends on the composition rules presented in
[Rules of composition](reference-intro.md#rules-of-composition). For example,
the `.prop()` method creates a lens, so a getter has that method because you can
compose a getter and a lens. On the other hand, the `.appendTo()` method, which
creates a setter, is not available in a getter, because getters cannot be
composed with setters.

## Type parameters

All writable optics have 3 type parameters: `<S, T, A>`, and all read-only
optics have 2 type parameters: `<S, A>`:

- `S` is the source on which the optic operates

- `A` is the type of the focus or focuses

- `T` is a type that encodes how the output type is constructed with polymorphic
  writes, as well as info about the optic's removability

Conceptually, when you write a value of type `B`, the output type will be `S`
with `A` replaced by `B` at the focus(es) of the optic. `T` contains a mechanism
that transforms `B` to the output type. This construct makes it possible for the
optics to be polymorphic on the type level. The read-only optics don't need `T`
because you cannot write through them or remove their focus.

In the following, we leave the exact definition of `T` for each optic out for
clarity, writing just `_` in its place. It's usually clear from how the optic
works what will come out if you write a value of a different type.

In the documentation of functions that can be used to write through an optic,
the return type is denoted by `T<B>`. While not valid TypeScript syntax (because
`T` is a type parameter instead of a concrete type), this captures the meaning
quite well: `B` is applied to the "higher-kinded" type `T`, yielding the output
type.

Interested readers can refer to
[hkt.ts](https://github.com/akheron/optics-ts/tree/main/src/hkt.ts) to see how
the higher-kinded types / partially applied type operators are actually
implemented.

## Top-level functions

These functions are available as top level exports of the `optics-ts` module.

Most functions have `Optic` in their signature. It means that multiple optics
work with the function. The optic classes that are actually applicable are
documented in the function description.

### `optic`

Signature: `optic<S>(): Equivalence<S, _, S>`

Create a monomorphic equivalence for `S`. If you ever see the type
`DisallowedTypeChange`, it means that you have attempted to change a type with a
monomorphic optic.

### `optic_`

Signature: `optic_<S>(): Equivalence<S, _, S>`

Create a polymorphic equivalence for `S`.

### `get`

Signature: `get<S, A>(optic: Optic<S, _, A>) => (source: S) => A`

Read a value through an `Equivalence`, `Iso`, `Lens` or `Getter`.

### `preview`

Signature:
`preview<S, A>(optic: Optic<S, _, A>) => (source: S) => A | undefined`

Read a value through a `Prism`, `Traversal`, `AffineFold` or `Fold`. For `Prism`
and `AffineFold`, return `undefined` if the optic doesn't match (has zero
focuses). For `Traversal` and `Fold`, returns the value of the first focus, or
`undefined` if there are no focuses.

### `collect`

Signature: `collect<S, A>(optic: Optic<S, _, A>) => (source: S) => A[]`

Read all focused values through a `Prism`, `Traversal`, `AffineFold` or `Fold`.
For `Prism` and `AffineFold`, the return value is an array of 0 or 1 elements.
For `Traversal` and `Fold`, the return value is an array of zero or more
elements.

### `modify`

Signature:
`modify<S, T, A>(optic: Optic<S, T, A>) => <B>(f: (a: A) => B) => (source: S) => T<B>`

Modify the focused value(s) through an `Equivalence`, `Iso`, `Lens`, `Prism` or
`Traversal`. Returns an updated copy of `source` with all focuses modified by
mapping them through the function `f`.

### `set`

Signature:
`set<S, T, A>(optic: Optic<S, T, A>) => <B>(value: B) => (source: S) => T<B>`

Write a constant value through an `Equivalence`, `Iso`, `Lens`, `Prism` or
`Traversal`. Returns an updated copy of `source` with all focuses replaced by
`value`.

### `remove`

Signature: `remove<S, T, A>(optic: Optic<S, T, A>) => (source: S) => S`

Remove the focus of a `RemovablePrism` from its containing container.

### `compose`

Signature:
`compose<S, A1, A2><optic1: Optic<S, _, A1>, optic2: Optic<A1, _, A2>): Optic<S, _, A2>`

Compose two optics. If the first optic is from `S` to `A1`, and the second optic
is from `A1` to `A2`, the result is from `S` to `A2`.

See [Rules of composition](reference-intro.md#rules-of-composition) for the
rules of composition.

### `pipe`

Signature:
`pipe<A, B, C, ..., V>(a: A, ab: (a: A) => B, bc: (b: B) => C, ...): V`

Pipe the value of an expression (`a`) into a pipeline of at most 9 unary
functions (`ab`, `bc`, ...).

## Creating optics

The methods documented below are available on all optics types: `Equivalence`,
`Iso`, `Lens`, `Prism`, `Traversal`, `Getter`, `AffineFold` and `Fold`. The
documented return type is the type of the optic that these methods create. The
actual return type is the composition of the optic on which the method is called
and on the optic that the method creates.

Note that there are no functions to create `AffineFold` or `Fold` optics. You
can only get these by composing other types of optics. `Equivalence` can be
created by calling the top-level [`optic`](#optic) or [`optic_`](#optic_)
functions.

## Isomorphisms

Isomorphisms have the type `Iso<S, T, A>`. In the following, we omit the exact
definition of `T` for clarity, and use `_` instead. See
[Type parameters](#type-parameters) for the meanings of type parameters.

### `iso`

Signature: `iso<U>(there: (a: A) => U, back: (u: U) => A): Iso<S, _, U>`

Create an isomorphism from functions `there` and `back`. `there` takes the focus
and transforms it to another value. `back` is the inverse of `there`.

Note that `iso` is monomorphic. There's no polymorphic alternative (yet).

### `indexed`

Signature: `indexed(): Iso<S, _, [number, ElemType<A>][]>`

Only works on arrays. `ElemType<A>` is the element type of the array type `A`.

Ceate an isomorphism from an array of values to an array of index-value pairs,
i.e. from `[a, b, ...]` to `[[0, a], [1, b], ...]`.

In the write direction, elements are sorted by index, and only the last one of
duplicate indices are kept.

## Lenses

Lenses have the type `Lens<S, T, A>`. In the following, we omit the exact
definition of `T` for clarity, and use `_` instead. See
[Type parameters](#type-parameters) for the meanings of type parameters.

### `prop`

Signature: `prop<K extends keyof A>(key: K): Lens<S, _, A[K]>`

Create a lens that focuses on the property `K` of `A`.

**Note:** `prop()` only works for string properties, even though TypeScript's
type system also allows array's numeric indices when using `keyof`. Use the
[`at`](#at) prism to focus on an array element at a given index.

### `path`

Signature: `path<K1, K2, ...>(...keys: [K1, K2, ...]): Lens<S, _, A[K1][K2]...>`

A shortcut for focusing on chain of properties.

```typescript
foo.path('a.b.c')
```

is equal to

```typescript
foo.path('a', 'b', 'c')
```

which is equal to

```typescript
foo.prop('a').prop('b').prop('c')
```

### `nth`

Signature: `nth<N extends number>(n: N): Lens<S, _, Nth<A, N>>`

Only works on tuples whose length is a least `N + 1`.

Create a lens that focuses on the index `N` of `A`. This is a lens because the
length of `A` is checked on type level, so index `N` is always defined.

See [`at`](#at) below for a similar prism that works on arrays of arbitrary
length.

### `pick`

Signature: `pick<K extends keyof A>(keys: K[]): Lens<S, _, Pick<A, K>>`

Create a lens that focuses on a sub-object of `A` with the given properties.
When writing through a polymorphic `.pick()` lens, you can add or remove
properties.

Example:

```typescript
const data = {
  foo: 'something',
  bar: 42,
  baz: true,
}
const lens = O.optic_<typeof data>().pick(['foo', 'bar'])

O.get(lens)(data)
// {
//  foo: 'something',
//  baz: true,
// }

O.set(lens)({ quux: null })(data)
// {
//   quux: null,
//   baz: true,
// }

// monomorphic version of the same lens
const monoLens = O.optic<typeof data>().compose(lens)

O.set(monoLens)({ quux: null })(data)
// DisallowedTypeChange
```

### `filter`

Signatures:

- `filter(pred: (item: ElemType<A>) => boolean): Lens<S, _, A>`
- `filter<B>(pred: (item: ElemType<A>) => item is B): Lens<S, _, B[]>`

Only works on arrays. `ElemType<A>` is the element type of the array type `A`.

Create a lens that focuses on the elements matched by `pred`. If `pred` is a
type guard of `B`, narrow the type of the focus to `B[]`.

```typescript
const l = O.optic_<number[]>().filter((x) => x % 2 === 1)

// Writing an array of the same length replaces elements
O.set(l)(['a', 'b', 'c'])([1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6]

// Writing a shorter array removes elements
O.set(l)(['a', 'b'])([1, 2, 3, 5, 6])
// ['a', 2, 'b', 6]

// Writing a longer array adds elements to the end
O.set(l)(['a', 'b', 'c', 'd', 'e'])([1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6, 'd', 'e']
```

When a different type `U extends any[]` is written, the result will have the
type `A | U`, i.e. `(ElemType<A> | ElemType<U>)[]`.

### `valueOr`

Signature: `valueOr<B>(defaultValue: B): Lens<S, _, Exclude<A, undefined> | B>`

Create a lens that, when read through, returns `defaultValue` when the focused
value is `undefined`. If the focus is not `undefined`, the focus is returned
unchanged.

Fully polymorphic in the write direction.

### `partsOf`

Signatures:

- `partsOf(traversal: Traversal<A, _, B>): Lens<S, _, B[]>`
- `partsOf(makeTraversal: (o: Optic<A>) => Traversal<A, _, B>): Lens<S, _, B[]>`

Create a lens from the given traversal, or from the traversal returned by the
given function. When read through, the result is an array of elements as if
produced by [`collect`](#collect). When written through, the focuses of the
traversal are replaced with the values from the written array. For a polymorphic
write, the focuses of the tarversal get the type of the written array elements.
If a shorter or longer array is written, **throws an error**. This is to ensure
that all focuses are replaced and the types are correct.

For example, this reverses the words of a string:

```typescript
const lens = O.optic<string>().partsOf((o) => o.words())
O.modify(lens)((words) => [...words].reverse())('this is a test')
// 'test a is this'
```

Note that composing `partsOf` with setters (like `appendTo` or `prependTo`) or
removing elements through `partsOf` will not work, because the extra element
added by the setter or the removed element will cause `partsOf` to throw.

### `reread`

### `rewrite`

Signatures:

- `reread(fn: (value: A) => A): Lens<S, _, A>`
- `rewrite(fn: (value: A) => A): Lens<S, _, A>`

Create a lens that can modify the value in the read direction (`reread()`) or
write direction (`rewrite()`). This is useful to e.g. ensure data structure
invariants in some cases.

Note that both `reread` and `rewrite` are monomorphic.

### `lens`

Signature:
`lens<U>(view: (a: A) => U, update: (a: A, u: U) => A): Lens<S, _, U>`

Create a lens from functions `view` and `update`. `view` takes the current focus
and returns a new focus. `update` takes the orginal focus and a value, and
updates the original focus with that value.

Note that `lens` is monomorphic. There's no polymorphic alternative (yet).

## Prisms

Prisms have the type `Prism<S, T, A>`. In the following, we omit the exact
definition of `T` for clarity, and use `_` instead. See
[Type parameters](#type-parameters) for the meanings of type parameters.

### `optional`

Signature: `optional(): Prism<S, _, Exclude<A, undefined>>`

Create a prism that focuses on the non-`undefined` subtype of `A`.

### `guard`

Signature: `guard<U extends A>(g: (a: A) => a is U): Prism<S, _, U>`

Create a prism that focuses on the subtype `U` of `A` that matches the type
guard `g`.

Note that `guard()` is monomorphic. Use `guard_` if you want a polymorphic
guard.

### `guard_`

Signature:
`guard_<F extends HKT>(): <U extends A>(g: (a: A) => a is U) => Prism<S, T · F, U>`

Create a prism that focuses on the subtype of `A` that matches the type guard
`g`. When written to, uses the higher-kinded type `F` to construct the output
type.

### `at`

Signature: `at(i: number): RemovablePrism<S, _, ElemType<A>>`

Only works on arrays and strings. Removable. `ElemType<A>` is the element type
of the array type `A`.

Create a prism that focuses on the element type of the array `A`, or on a
substring of length 1 if `A` is `string`.

When an element of a different type `B` is written to an array, the resulting
array will have the type `Array<A | B>`.

When writing to a string, only strings can be written. The length of the written
string can be something else than 1.

### `head`

Signature: `head(): Prism<S, _, ElemType<A>>`

Short for `at(0)`.

### `index`

Signature: `index(i: number): RemovablePrism<S, _, ElemType<A>>`

**Deprecated**. Alias for [`at`](#at).

### `find`

Signature:
`find(p: (e: ElemType<A>) => boolean): RemovablePrism<S, _, ElemType<A>>`

Only works on array types. Removable. `ElemType<A>` is the element type of the
array type `A`.

Like [`at`](#at), but the index to be focused on is determined by finding the
first element that matches the given predicate.

When a different type `B` is written through this optic, the resulting array
will have the type `Array<A | B>`.

### `when`

Signature: `when(f: (a: A) => boolean): Prism<S, _, A>`

Create a prism that skips the focus if it doesn't match the given predicate.
Especially useful for filtering the focuses of a travesal.

When a different type `B` is written through this optic, the resulting value
will have the type `A | B`.

## Traversals

Traversals have the type `Traversal<S, T, A>`. In the following, we omit the
exact definition of `T` for clarity, and use `_` instead. See
[Type parameters](#type-parameters) for the meanings of type parameters.

### `elems`

Signature: `elems(): Traversal<S, _, ElemType<A>>`

Only works on array types. `ElemType<A>` is the element type of the array type
`A`.

Create a traversal that focuses on all the elements of the array.

## Getters

Getters are read-only optics with a single focus. You can think of them like
one-way isomorphisms or read-only lenses.

Getters have the type `Getter<S, A>`. See [Type parameters](#type-parameters)
for the meanings of type parameters.

### `to`

Signature: `to<B>(f: (a: A) => B): Getter<S, B>`

Create a getter that applies the function `f` to its focus.

## Setters

Setters have the type `Setter<S, T, A>`. In the following, we omit the exact
definition of `T` for clarity, and use `_` instead. See
[Type parameters](#type-parameters) for the meanings of type parameters.

### `prependTo`

### `appendTo`

Signatures:

- `prependTo(): Setter<S, _, ElemType<A>>`
- `appendTo(): Setter<S, _, ElemType<A>>`

Only works on arrays. `ElemType<A>` is the element type of the array type `A`.

Create a setter that focuses on the part _before the first element_ or _after
the last element_ of the focus array. When written through, prepends or appends
the value to the array.

When an element of a different type `B` is written, the resulting array will
have the type `Array<A | B>`.

## Composing

### `compose`

Signature: `compose<B>(other: Optic<A, _, B>): Optic<S, _, B>`

## Strings

The following optics only work on strings.

### `chars`

Signature: `chars(): Traversal<S, _, string>`

Create a traversal that focuses on all the characters of the current string
focus.

When written through, characters can be removed by writing the empty string, or
changed to longer strings.

### `words`

Signature: `words(): Traversal<S, _, string>`

Create a traversal that focuses on all the words of the current string focus.
Words are substrings that are separated by whitespace.

When written through, words can be removed by writing the empty string, or
changed to longer or shorter strings.
