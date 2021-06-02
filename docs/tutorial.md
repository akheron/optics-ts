# Tutorial

The following import is assumed in all the examples below:

```typescript
import * as O from 'optics-ts'
```

## Lens

Lens is the most common optic you're going to use. You can create an optic for a
data structure by calling `O.optic()`, and turn in into a lens that focuses on a
property of an object with `.prop()`:

```typescript
type Data = {
  foo: { bar: number }
  other: string
}
const foo = O.optic<Data>().prop('foo')
```

`foo` is now a lens that focuses on `Data.foo`.

To dig deeper, just call `.prop()` again:

```typescript
const bar = O.optic<Data>().prop('foo').prop('bar')
// or from the `foo` lens we defined above
const bar = foo.prop('bar')
// or use .path() to compose multiple prop lenses with a single call
const bar = O.optic<Data>().path('foo', 'bar')
// or use path with a dotted string path
const bar = O.optic<Data>().path('foo.bar')
```

Use `get()` to read a value through the lens:

```typescript
const data: Data = {
  foo: { bar: 42 },
  other: 'stuff',
}

O.get(bar)(data)
// => 42
```

Use `set()` or `modify()` to write the focused value through the lens:

```typescript
O.set(bar)(99)(data)
// => {
//   foo: { bar: 99 },
//   other: 'stuff'
// }

O.modify(bar)((x) => x * 100)(data)
// => {
//   foo: { bar: 4200 },
//   other: 'stuff'
// }
```

Writing through optics always creates a new data structure instead of modifying
the existing one in place, shallowly copying the required parts. In other words,
data is immutable.

## Prism

Lenses are great for focusing to a part of a larger structure. Prisms are much
like lenses, but they don't necessarily match anything, i.e. they can have zero
focuses.

A practical example is focusing on a branch of a union type. Here, the
`User.age` field can be `number` or `undefined`. With the `.optional()` prism we
can focus only when the value is a `number`, and do nothing when it's
`undefined`:

```typescript
type User = {
  name: string
  age?: number | undefined
}

const age = O.optic<User>().prop('age').optional()
```

You read through a prism using the `preview()` function. When the prism doesn't
match, it returns `undefined`.

```typescript
const userWithAge: User = {
  name: 'Betty',
  age: 42,
}
O.preview(age)(userWithAge)
// ==> 42

const userWithoutAge: User = {
  name: 'Max',
  age: undefined,
}
O.preview(age)(userWithoutAge)
// ==> undefined
```

If the prism doesn't match, `preview()` returns undefined, as seen above.

You can write through a prism normally with `set()` and `modify()`. If the prism
doesn't match, the value is unchanged:

```typescript
O.modify(age)((n) => n + 1)(userWithAge)
// ==> {
//   name: 'Betty',
//   age: 43,
// }

O.set(age)(60)(userWithoutAge)
// ==> {
//   name: 'Max',
//   age: undefined,
// }
```

`.guard()` is another method that creates a prism. It's a generalization of
`.optional()` in the sense that you can match on any branch of a union type
instead of just the non-`undefined` part:

```typescript
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
type Shape = Square | Rectangle

function isRectangle(s: Shape): s is Rectangle {
  return s.kind === 'rectangle'
}

const rectWidth = O.optic<Shape>().guard(isRectangle).prop('width')

O.preview(rectWidth)({ kind: 'square', size: 10 })
// ==> undefined

O.preview(rectWidth)({ kind: 'rectangle', width: 5, height: 7 })
// ==> 5

O.modify(rectWidth)((w) => w * 2)({ kind: 'rectangle', width: 5, height: 7 })
// ==> { kind: 'rectangle', width: 10, height: 7 })
```

Notice how above we used `.guard(...).prop(...)`, composing a prism with a lens.
This yields a prism, so we used `preview()` to read through it. See
[Types of optics](/apiref?id=types-of-optics) for the rules of composition.

## Removable optics

Some optics are removable. This means that they focus on an element of a
container (e.g. an array), and you can remove the element from the container.

`.at()` is a removable prism. It focuses on an index of an array, and lets you
also remove that index:

```typescript
interface User {
  name: string
}

const secondUser = O.optic<User[]>().at(1)

const threeUsers: User[] = [
  { name: 'Max' },
  { name: 'Betty' },
  { name: 'Alice' },
]
O.remove(secondUser)(threeUsers)
// ==> [{ name: 'Max' }, { name: 'Alice' }]
```

If the optic doesn't match, removing has no effect:

```typescript
const oneUser: User[] = [{ name: 'Max' }]

O.remove(secondUser)(oneUser)
// ==> [{ name: 'Max' }]
```

## Traversal

The next optic type is the traversal. While lenses have 1 focus and prisms have
0 or 1 focus (no match or match), traversals have 0 or more focuses.

The simplest example of a traversal is to focus on the elements of an array. To
create such a traversal, use `.elems()`:

```typescript
type Person {
  name: string
  friends: Person[]
}

const friendsNames = O.optic<Person>()
  .prop('friends')
  .elems()
  .prop('name')
```

To read through a traversal, call `collect()` to collect all focused elements
into an array:

```typescript
const john = { name: 'John', friends: [] }
const bruce = { name: 'Bruce', friends: [] }
const amy = { name: 'Amy', friends: [john, bruce] }

O.collect(friendsNames)(amy)
// ==> [ 'John', 'Bruce' ]
```

Writing through a traversal writes to all focused values:

```typescript
O.modify(friendsNames)((name) => `${name} Wayne`)(amy)
// ==> {
//   name: 'Amy',
//   friends: [
//     { name: 'John Wayne', friends: [] },
//     { name: 'Bruce Wayne', friends: [] },
//   ],
// }
```

Note again how we used `.prop(...).elems(...).prop(...)`, composing a lens with
a traversal, and then with a lens again. This yields a traversal. See
[Types of optics](/apiref?id=types-of-optics) for more info.

It's sometimes useful to further focus on certain elements of a traversal. This
can be done by composing a traversal with a prism like `.when()` that skips
items that don't match a predicate:

```typescript
const even = O.optic<number[]>()
  .elems()
  .when((n) => n % 2 === 0)

O.modify(even)((n) => -n)([1, 2, 3, 4, 5])
// ==> [1, -2, 3, -4, 5]
```

## Other types of optics

In fact, calling `O.optic()` also yields an optic, but instead of being a lens,
prism or traversal, it's an equivalence. As the name suggests, equivalence keeps
the value equal, in both reading and writing directions:

```typescript
const str = O.optic<string>()

O.get(str)('original')
// ==> 'original'

O.set(str)('new')('original')
// ==> 'new' ('original' is discarded)
```

Supported optic types also include isomorphism, which can be used to do 2-way
data transformations. Furthermore, there are read-only optics analoguous to
isomorphism, prism, and traversal. While isomorphism is 2-way transformation (a
mapping function and its inverse), getter is a one-way transformation (just a
mapping function). Affine fold and fold are read-only variants of prism and
traversal.

## Polymorphism

Optics can be polymorphic, which means you can change the type of the focus when
you write through an optic. Since this is a relatively rare use case, and may be
confusing if done by accident, polymorphic optics are created with `optic_()`
(note the underscore):

```typescript
type Data = {
  foo: { bar: string }
  other: boolean
}
const bar = O.optic_<Data>().path('foo.bar')
```

Let's modify `bar` to contain the length of the original string instead:

```typescript
const data: Data = {
  foo: { bar: 'hello there' },
  other: true,
}

const updated = O.modify(bar)((str) => str.length)(data)
// ==> {
//   foo: { bar: 11 },
//   other: true
// }
```

This is a type-safe operation, i.e. the compiler knows that the type of
`updated.foo.bar` is `number`, editor autocomplete works correctly, etc.

If you ever see a `DisallowedTypeChange` type being returned from an `optics-ts`
function, it means that you tried to change the type when writing through a
non-polymorphic (monomorphic) optic.
