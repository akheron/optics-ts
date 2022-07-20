# Standalone API

!!! note

    Since optics-ts v2.2.0, there are two syntaxes for optics: **method chaining**
    and **standalone optics**. For more information about the differences between
    them, see [The Two Syntaxes](two-syntaxes.md).

!!! danger "Experimental"

    This module is experimental and may receive backwards incompatible changes
    without a corresponding semver bump.

Everything below assumes the following import:

```typescript
import * as O from 'optics-ts/standalone'
```

## TypeScript types

In general, the TypeScript types of optics look like `Optic<C, A, T, R>`.

- `C` is the optic type as a string, e.g. `'Lens'` or `'Prism'`

- `A` and `T` encode the optic's read and write direction transforms as
  "higher-kinded" types

- `R` is `true` if the optic is removable, and `undefined` otherwise.

In the following, we leave the exact type signatures out for clarity, using a
hand-wavy pseudo syntax instead. The optic descriptions try to make it clear how
optics and functions operate.

Interested readers can refer to
[hkt.ts](https://github.com/akheron/optics-ts/tree/main/src/hkt.ts) to see how
the higher-kinded types / partially applied type operators are actually
implemented.

## Operations

These function are not optics themselves, but instead operate on the optics and
data.

### `compose`

`compose :: (optic, ...optics) => Optic`

Compose optics to create a more complex optic. Using a string as an optic is a
shorthand for [prop](#prop).

Example:

```typescript
const fooBar = O.compose('foo', O.optional, 'bar')

O.preview(fooBar, { foo: undefined })
// undefined

O.preview(fooBar, { foo: { bar: 5 } })
// 5
```

### `get`

`get :: (optic, source) => value`<br> `get :: (optic) => (source) => value`

Read a value through an `Equivalence`, `Iso`, `Lens` or `Getter`.

Example:

```typescript
O.get(O.pick('foo', 'baz'), { foo: 1, bar: 2, baz: 3 })
// { foo: 1, baz: 3 }
```

### `preview`

`preview :: (optic, source) => value | undefined`<br>
`preview :: (optic) => (source) => value | undefined`

Read a value through a `Prism`, `Traversal`, `AffineFold` or `Fold`. For `Prism`
and `AffineFold`, return `undefined` if the optic doesn't match (has zero
focuses). For `Traversal` and `Fold`, returns the value of the first focus, or
`undefined` if there are no focuses.

Example:

```typescript
O.preview(O.optional, 1)
// 1

O.preview(O.elems, [])
// undefined
```

### `collect`

`collect :: (optic, source) => value[]`<br>
`collect :: (optic) => (source) => value[]`

Read all focused values through a `Prism`, `Traversal`, `AffineFold` or `Fold`.
For `Prism` and `AffineFold`, the return value is an array of 0 or 1 elements.
For `Traversal` and `Fold`, the return value is an array of zero or more
elements.

Example:

```typescript
O.collect(O.optional, 1)
// [1]

O.collect(O.elems, [])
// []
```

### `modify`

`modify :: (optic, fn, source) => value`<br>
`modify :: (optic) => (fn, source) => value`<br>
`modify :: (optic) => (fn) => (source) => value`

Modify the focused value(s) through an `Equivalence`, `Iso`, `Lens`, `Prism` or
`Traversal`. Returns an updated copy of `source` with all focuses modified by
mapping them through the function `fn`.

Example:

```typescript
O.modify(O.prop('foo'), (value) => value.length, { foo: 'bar' })
// { foo: 3 }
```

### `set`

Signatures:

`set :: (optic, newValue, source) => value`<br>
`set :: (optic) => (newValue, source) => value`<br>
`set :: (optic) => (newValue) => (source) => value`

Write a constant value through an `Equivalence`, `Iso`, `Lens`, `Prism` or
`Traversal`. Returns an updated copy of `source` with all focuses replaced by
`newValue`.

Example:

```typescript
O.set(O.prop('foo'), null, { foo: 'bar' })
// { foo: null }
```

### `remove`

`remove :: (optic, source) => value`<br>
`remove :: (optic) => (source) => value`

Remove the focus of a `RemovablePrism` from its containing container.

Example:

```typescript
O.remove(O.at(1), [1, 2, 3])
// [1, 3]
```

## Isomorphisms

### `iso`

`iso :: (there: (v) => u, back: (u) => v) => Iso`

Create an isomorphism from functions `there` and `back`. `there` takes the focus
and transforms it to another value. `back` is the inverse of `there`.

Note that `iso` is monomorphic, i.e. you cannot change the value type when
writing. There's no polymorphic alternative (yet).

Example:

```typescript
const sep = O.iso(
  (value: string) => value.split(','),
  (arr: string[]) => arr.join(',')
)

O.get(sep, 'foo,bar,baz')
// ['foo', 'bar', 'baz']

O.modify(sep, (arr) => [...arr].reverse(), 'foo,bar,baz')
// 'baz,bar,foo'
```

### `indexed`

`indexed :: Iso`

_Only works on arrays._

`indexed` is an isomorphism from an array of values to an array of index-value
pairs, i.e. from `[a, b, ...]` to `[[0, a], [1, b], ...]`.

In the write direction, elements are sorted by index, and only the last one of
duplicate indices are kept.

Example:

```typescript
O.get(O.indexed, ['a', 'b', 'c'])
// [[0, 'a'], [1, 'b'], [2, 'c']]

O.set(O.compose(O.indexed, O.at(1), O.nth(0)), 3, ['a', 'b', 'c'])
// ['a', 'c', 'b']
```

## Lenses

### `prop`

`prop :: (key) => Lens`

Create a lens that focuses on the object property `key`.

You can also just simply pass a string to [`compose`](#compose) instead of using
`prop`.

Example:

```typescript
O.set(O.prop('foo'), 42, { foo: null })
// { foo: 42 }
```

See [`atKey`](#atKey) for a similar prism that works on records.

### `nth`

`nth :: (n) => Lens`

_Only works on
[tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
whose length is a least `n + 1`._

Create a lens that focuses on the index `n` of a tuple. This is a lens because
the length of the focus is checked on type level, so index `n` is always
defined.

See [`at`](#at) for a similar prism that works on arrays.

### `pick`

`pick :: (...keys) => Lens`

Create a lens that picks the given properties from an object. When writing
through the lens, you can add or remove properties.

Example:

```typescript
const data = {
  foo: 'something',
  bar: 42,
  baz: true,
}

O.get(O.pick('foo', 'bar'), data)
// {
//  foo: 'something',
//  baz: true,
// }

O.set(O.pick('foo'), {}, data)
// {
//   bar: 42,
//   baz: true,
// }

O.set(O.pick(), { quux: 'added' }, data)
// {
//   foo: 'something'
//   bar: 42,
//   baz: true,
//   quux: 'added',
// }
```

### `filter`

`filter :: (fn: (elem) => boolean) => Lens`

_Only works on arrays._

Create a lens that focuses on the array elements matched by `fn`. If `fn` is a
type guard of type `T`, narrow the type of the focus to `T[]`.

Writing a longer/shorter array adds/removes elements. Extraneous elements are
added to the end of the array.

Example:

```typescript
const l = O.filter((x: number) => x % 2 === 1)

O.set(l, ['a', 'b', 'c'], [1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6]

O.set(l, ['a', 'b'], [1, 2, 3, 5, 6])
// ['a', 2, 'b', 6]

O.set(l, ['a', 'b', 'c', 'd', 'e'], [1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6, 'd', 'e']
```

### `valueOr`

`valueOr :: (defaultValue) => Lens`

Create a lens that, when read through, returns `defaultValue` when the focused
value is `undefined`. If the focus is not `undefined`, the focus is returned
unchanged.

Example:

```typescript
O.get(O.valueOr(0), undefined)
// 0

O.get(O.valueOr(0), 42)
// 42

O.get(O.compose('maxAge', O.valueOr(100)), { maxAge: undefined })
// 100
```

### `partsOf`

`partsOf :: (traversal) => Lens`

Given a traversal, create a lens that focuses on an array of the focuses of the
traversal. When read through, the result is an array of elements as if produced
by [`collect`](#collect). When written through, the focuses of the traversal are
replaced with the values from the written array. For a polymorphic write, the
focuses of the tarversal get the type of the written array elements. If a
shorter or longer array is written, **throws an error**. This is to ensure that
all focuses are replaced and the types are correct.

Example:

```typescript
O.set(
  O.partsOf(O.compose(O.elems, 'foo')),
  ['x', 'y', 'z'],
  [{ foo: 'a' }, { foo: 'b' }, { foo: 'c' }]
)
// [{ foo: 'x' }, { foo: 'y' }, { foo: 'z' }]

O.modify(O.partsOf(O.words), (words) => [...words].reverse(), 'this is a test')
// 'test a is this'
```

Note that composing `partsOf` with setters, like `appendTo` or `prependTo`, or
removing elements through `partsOf` will not work, because the extra element
added by the setter or the removed element will cause `partsOf` to throw.

### `reread`, `rewrite`

`reread :: (fn: (value) => value) => Lens`<br>
`rewrite :: (fn: (value) => value) => Lens`

Create a lens that can modify the value in the read direction (`reread`) or
write direction (`rewrite`). This is useful to e.g. ensure data structure
invariants in some cases.

Both `reread` and `rewrite` are monomorphic.

Example:

```typescript
const read = O.reread((x: string) => x.toUpperCase())
const write = O.rewrite((x: string) => x.toUpperCase())

O.get(read, 'foo')
// FOO

O.get(write, 'foo')
// foo

O.set(read, null, 'foo')
// bar

O.set(write, null, 'foo')
// FOO
```

## Prisms

### `optional`

`optional :: Prism`

A prism that matches if the value is not `undefined`. Narrows the type to remove
`undefined`, e.g. `number | undefined` narrows to `number`.

Example:

```typescript
const prism = O.compose('foo', O.optional, 'bar')

O.preview(prism, { foo: { bar: 42 } })
// 42

O.preview(prism, { foo: undefined })
// undefined
```

### `guard`

`guard :: (fn: (value) => boolean) => Prism` (monomorphic)<br>
`guard :: <F>() => (fn: (value) => boolean) => Prism` (polymorphic)

Create a prism that matches if the value matches the type guard `fn`.

The first, simpler signature returns a monomorphic prism, which can only be used
for writes that don't change the type of the focus.

The second signature returns a polymorphic prism that uses the type transform
`F` to construct the result type.

Monomorphic example:

```typescript
type Circle = { type: 'circle'; radius: number }
type Square = { type: 'square'; size: number }
type Shape = Circle | Square

function isCircle(value: Shape): value is Circle {
  return value.type === 'circle'
}

const circle = { type: 'circle', radius: 42 }
const square = { type: 'square', size: 10 }

const circleRadius = O.compose(O.guard(isCircle), 'radius')

O.preview(circleRadius, square)
// undefined

O.preview(circleRadius, circle)
// 42

O.set(circleRadius, 99, square)
// { type: 'square', size: 10 }

O.set(circleRadius, 99, circle)
// { type: 'circle', radius: 99 }
```

Polymorphic example:

```typescript
type Some<T> = { type: 'some'; value: T }
type None = { type: 'none' }
type Option<T> = Some<T> | None

// O.HKT is a "type transform" or a "higher-kinded type". this[1] is the input
// type, and the output is taken from prop 0.
//
// The SomeF type transform just checks that the input type in this[1] has the
// shape of a Some, and passes it through as-is. In other words, the writer
// can change the type of the 'value' prop, but nothing else.
//
interface SomeF extends O.HKT {
  0: this[1] extends Some<any> ? this[1] : never
}

function isSomeNumber(value: Option<number>): value is Some<number> {
  return value.type === 'some'
}

const someValue = O.compose(O.guard<SomeF>()(isSomeNumber), 'value')

const some: Option<number> = { type: 'some', value: 42 }
const none: Option<number> = { type: 'none' }

O.preview(someValue, none)
// undefined

O.preview(someValue, some)
// 42

const result1: Option<string> = O.set(someValue, 'foo', none)
// { type: 'none' }

const result2: Option<string> = O.set(someValue, 'foo', some)
// { type: 'some', value: 'foo' }
```

### `at`

`at :: (i) => RemovablePrism`

_Only works on arrays and strings. Removable._

Create a prism that focuses on the n'th element of an array or the n'th
character (substring of length 1) of a string.

When used on a string, only strings can be written. Writing strings of a
different length is supported.

Example:

```typescript
O.preview(O.at(1), ['a', 'b', 'c'])
// 'b'

O.preview(O.at(1), ['a'])
// undefined

O.set(O.at(1), 123, ['a', 'b', 'c'])
// ['a', 123, 'c']

O.set(O.at(1), 123, ['a'])
// ['a']

O.remove(O.at(1), ['a', 'b', 'c'])
// ['a', 'c']

O.preview(O.at(1), 'abc')
// 'b'

O.preview(O.at(1), 'a')
// undefined

O.set(O.at(1), 'X', 'abc')
// 'aXc'

O.set(O.at(1), 'X', 'a')
// 'a'

O.set(O.at(1), 'XYZ', 'abc')
// 'aXYZc'

O.set(O.at(1), '', 'abc')
// 'ac'

O.remove(O.at(1), 'abc')
// 'ac'
```

### `head`

`head :: Prism`

A shorthand for `at(0)`.

### `atKey`

`atKey :: (key) => RemovablePrism`

_Only works on records (`Record<string, T>`). Removable._

Create a prism that focuses on the key of a record.

Example:

```typescript
O.preview(O.atKey('foo'), { foo: 'bar' })
// 'bar'

O.preview(O.atKey('foo'), { hello: 'world' })
// undefined

O.set(O.atKey('foo'), 123, { foo: 'bar', hello: 'world' })
// { foo: 123, hello: 'world' }

O.set(O.atKey('foo'), 123, { hello: 'world' })
// { hello: 'world' }

O.remove(O.atKey('foo'), { foo: 'bar', hello: 'world' })
// { hello: 'world' }
```

### `find`

`find :: (fn: (elem) => boolean) => RemovablePrism`

_Only works on arrays. Removable._

Create a prism that focuses on the first element of an array which matches the
predicate `fn`.

Example:

```typescript
const negativeElem = O.find((x: number) => x < 0)

O.preview(negativeElem, [1, 0, -1, -2])
// -1

O.modify(negativeElem, (x) => -x, [1, 0, -1, -2])
// [1, 0, 1, -2]

O.preview(negativeElem, [0, 2, 1])
// undefined
```

### `when`

`when :: (fn: (value) => boolean) => Prism`

Create a prism that matches it the focus matches the predicate `fn`. Especially
useful for filtering the focuses of a travesal.

Example:

```typescript
const longWords = O.compose(
  O.words,
  O.when((s: string) => s.length >= 5)
)
const text = 'Some shorter and some longer words'

O.collect(longWords, text)
// ['shorter', 'longer', 'words']

O.modify(longWords, (s) => s.toUpperCase(), text)
// "Some SHORTER and some LONGER WORDS"
```

## Traversals

### `elems`

`elems :: Traversal`

_Only works on arrays._

A traversal that focuses on all elements of an array.

```typescript
O.collect(O.compose(O.elems, 'foo', 'bar'), [
  { foo: { bar: 1 } },
  { foo: { bar: 2 } },
])
// [1, 2]
```

## Getters

Getters are read-only optics with a single focus. You can think of them like
one-way isomorphisms or read-only lenses.

### `to`

`to :: (fn: (v) => u) => Getter`

Create a getter that applies the function `fn` to its focus.

## Setters

### `prependTo`, `appendTo`

`prependTo :: Setter`<br> `appendTo :: Setter`

_Only work on arrays._

`prependTo` focuses on the part _before the first element_ and `appendTo`
focuses on the part _after the last element_ of an array. When written through,
prepends or appends the value to the array.

```typescript
O.set(O.appendTo, 3, [0, 1, 2])
// [0, 1, 2, 3]

O.set(O.prependTo, 3, [0, 1, 2])
// [3, 0, 1, 2]
```

## String traversals

### `chars`

`chars :: Traversal`

_Only works on strings._

A traversal that focuses on all the characters of a string.

When written through, characters can be removed by writing the empty string, or
changed to longer strings.

```typescript
O.collect(O.chars, 'foo')
// ['f', 'o', 'o']

O.modify(O.chars, (c) => (c == 'o' ? '' : c.toUpperCase()), 'foobar')
// 'FBAR'
```

### `words`

`words :: Traversal`

_Only works on strings._

A traversal that focuses on all the words of a string. Words are substrings that
are separated by whitespace.

When written through, words can be removed by writing the empty string, or
changed to longer or shorter strings.

```typescript
O.collect(O.words, 'foo, bar')
// ['foo,', 'bar']

O.modify(O.words, (word) => word.split('').reverse().join(''), 'foo, bar')
// ',oof rab'
```

## Miscellaneous

### `eq`

`eq :: Equivalence`

Equivalence is a no-op that does nothing. Acts as an identity wrt. composition.

### `pipe`

`pipe :: (a, f1, f2, ...) => v`

Pipe the value of an expression (`a`) into a pipeline of at most 9 unary
functions (`f1`, `f2`, ...).

Example:

```typescript
pipe(
  { foo: 1, bar: { baz: 2 } },
  O.set(O.prop('foo'), 3),
  O.modify(O.compose('bar', 'baz'), (v: number) => -v)
)
// { foo: 3, bar: { baz: -2 } }
```
