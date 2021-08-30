# Tutorial

One of the following imports is assumed in all the examples.

Method chaining:

```typescript
import * as O from 'optics-ts'
```

Standalone:

```typescript
import * as O from 'optics-ts/standalone'
```

See [The Two Syntaxes](two-syntaxes.md) for the difference between the two, and
which one to choose. All the descriptions and examples below are given in terms
of both syntaxes.

## Lens

=== "Method chaining"

    Lens is the most common optic you're going to use. You can create an optic for a
    data structure by calling `optic()`, and turn in into a lens that focuses on a
    property of an object with `prop`:

    ```typescript
    type Data = {
      foo: { bar: number }
      other: string
    }
    const foo = O.optic<Data>().prop('foo')
    ```

    `foo` is now a lens that focuses on `Data.foo`.

    To dig deeper, just call `prop` again:

    ```typescript
    const bar = O.optic<Data>().prop('foo').prop('bar')
    // or from the `foo` lens we defined above
    const bar = foo.prop('bar')
    // or use .path() to compose multiple prop lenses with a single call
    const bar = O.optic<Data>().path('foo', 'bar')
    // or use path with a dotted string path
    const bar = O.optic<Data>().path('foo.bar')
    ```

    Use `get` to read a value through the lens:

    ```typescript
    const data: Data = {
      foo: { bar: 42 },
      other: 'stuff',
    }

    O.get(bar)(data)
    // => 42
    ```

    Use `set` or `modify` to write the focused value through the lens:

    ```typescript
    O.set(bar)(99)(data)
    // => {
    //   foo: { bar: 99 },
    //   other: 'stuff'
    // }

    O.modify(bar, (x) => x * 100, data)
    // => {
    //   foo: { bar: 4200 },
    //   other: 'stuff'
    // }
    ```

=== "Standalone"

    Lens is the most common optic you're going to use. You can create a lens that focuses on a
    property of an object with `prop`:

    ```typescript
    const foo = O.prop('foo')
    ```

    `foo` is now a lens that focuses on the prop `foo` of any given object.

    To dig deeper, compose multiple `prop` lenses:

    ```typescript
    const bar = O.compose(O.prop('foo'), O.prop('bar'))
    // or reusing the `foo` lens we defined above
    const bar = O.compose(foo, O.prop('bar'))
    ```

    Because `prop` is such an often used lens, you can pass string
    arguments directly to `compose`, and they will be taken as the
    `prop` lens:

    ```typescript
    const bar = O.compose('foo', 'bar')
    ```

    Use `get` to read a value through the lens:

    ```typescript
    const data = {
      foo: { bar: 42 },
      other: 'stuff',
    }

    O.get(bar, data)
    // => 42
    ```

    Use `set` or `modify` to write the focused value through the lens:

    ```typescript
    O.set(bar, 99, data)
    // => {
    //   foo: { bar: 99 },
    //   other: 'stuff'
    // }

    O.modify(bar, (x) => x * 100, data)
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
`User.age` field can be `number` or `undefined`. With the `optional` prism we
can focus only when the value is a `number`, and do nothing when it's
`undefined`:

=== "Method chaining"

    ```typescript
    type User = {
      name: string
      age?: number | undefined
    }

    const age = O.optic<User>().prop('age').optional()
    ```

=== "Standalone"

    ```typescript
    type User = {
      name: string
      age?: number | undefined
    }

    const age = O.compose('age', O.optional)
    ```

You read through a prism using the `preview` function. When the prism doesn't
match, it returns `undefined`.

=== "Method chaining"

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

=== "Standalone"

    ```typescript
    const userWithAge: User = {
      name: 'Betty',
      age: 42,
    }
    O.preview(age, userWithAge)
    // ==> 42

    const userWithoutAge: User = {
      name: 'Max',
      age: undefined,
    }
    O.preview(age, userWithoutAge)
    // ==> undefined
    ```

You can write through a prism normally with `set` and `modify`. If the prism
doesn't match, the value is unchanged:

=== "Method chaining"

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

=== "Standalone"

    ```typescript
    O.modify(age, (n) => n + 1, userWithAge)
    // ==> {
    //   name: 'Betty',
    //   age: 43,
    // }

    O.set(age, 60, userWithoutAge)
    // ==> {
    //   name: 'Max',
    //   age: undefined,
    // }
    ```

`guard` is another way to create a prism. It's a generalization of `optional` in
the sense that you can match on any branch of a union type instead of just the
non-`undefined` part:

```typescript
interface Circle {
  kind: 'circle'
  radius: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
type Shape = Circle | Rectangle

function isRectangle(s: Shape): s is Rectangle {
  return s.kind === 'rectangle'
}
```

=== "Method chaining"

    ```typescript
    const rectWidth = O.optic<Shape>().guard(isRectangle).prop('width')

    O.preview(rectWidth)({ kind: 'circle', radius: 10 })
    // ==> undefined

    O.preview(rectWidth)({ kind: 'rectangle', width: 5, height: 7 })
    // ==> 5

    O.modify(rectWidth)((w) => w * 2)({ kind: 'rectangle', width: 5, height: 7 })
    // ==> { kind: 'rectangle', width: 10, height: 7 })
    ```

=== "Standalone"

    ```typescript
    const rectWidth = O.compose(O.guard(isRectangle), 'width')

    O.preview(rectWidth, { kind: 'circle', radius: 10 })
    // ==> undefined

    O.preview(rectWidth, { kind: 'rectangle', width: 5, height: 7 })
    // ==> 5

    O.modify(rectWidth, (w) => w * 2, { kind: 'rectangle', width: 5, height: 7 })
    // ==> { kind: 'rectangle', width: 10, height: 7 })
    ```

Notice how above we composed the `guard` prism with the `prop` lens. This yields
a prism, so we used `preview` to read through it. See
[Rules of composition](reference-intro.md#rules-of-composition) for more info.

## Removable optics

Some optics are removable. This means that they focus on an element of a
container (e.g. an array), and you can remove the element from the container.

`at` is a removable prism. It focuses on an index of an array, and lets you also
remove that index:

=== "Method chaining"

    ```typescript
    interface User {
      name: string
    }

    const threeUsers: User[] = [
      { name: 'Max' },
      { name: 'Betty' },
      { name: 'Alice' },
    ]

    const secondUser = O.optic<User[]>().at(1)
    O.remove(secondUser)(threeUsers)
    // ==> [{ name: 'Max' }, { name: 'Alice' }]
    ```

=== "Standalone"

    ```typescript
    interface User {
      name: string
    }

    const threeUsers: User[] = [
      { name: 'Max' },
      { name: 'Betty' },
      { name: 'Alice' },
    ]

    O.remove(O.at(1), threeUsers)
    // ==> [{ name: 'Max' }, { name: 'Alice' }]
    ```

If the optic doesn't match, removing has no effect:

=== "Method chaining"

    ```typescript
    const oneUser: User[] = [{ name: 'Max' }]

    O.remove(secondUser)(oneUser)
    // ==> [{ name: 'Max' }]
    ```

=== "Standalone"

    ```typescript
    const oneUser: User[] = [{ name: 'Max' }]

    O.remove(O.at(1), oneUser)
    // ==> [{ name: 'Max' }]
    ```

## Traversal

The next optic type is the traversal. While lenses have one focus and prisms
have zero or one focuses (no match or match), traversals have zero _or more_
focuses.

The simplest example of a traversal is to focus on all elements of an array. To
create such a traversal, use `elems`:

=== "Method chaining"

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

=== "Standalone"

    ```typescript
    type Person {
      name: string
      friends: Person[]
    }

    const friendsNames = O.compose('friends', O.elems, 'name')
    ```

To read through a traversal, call `collect` to collect all focused elements into
an array:

=== "Method chaining"

    ```typescript
    const john = { name: 'John', friends: [] }
    const bruce = { name: 'Bruce', friends: [] }
    const amy = { name: 'Amy', friends: [john, bruce] }

    O.collect(friendsNames)(amy)
    // ==> [ 'John', 'Bruce' ]
    ```

=== "Standalone"

    ```typescript
    const john = { name: 'John', friends: [] }
    const bruce = { name: 'Bruce', friends: [] }
    const amy = { name: 'Amy', friends: [john, bruce] }

    O.collect(friendsNames, amy)
    // ==> [ 'John', 'Bruce' ]
    ```

Writing through a traversal writes to all focused values:

=== "Method chaining"

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

=== "Standalone"

    ```typescript
    O.modify(friendsNames, (name) => `${name} Wayne`, amy)
    // ==> {
    //   name: 'Amy',
    //   friends: [
    //     { name: 'John Wayne', friends: [] },
    //     { name: 'Bruce Wayne', friends: [] },
    //   ],
    // }
    ```

Note again how we used `prop`, `elems` and `prop`, composing a lens with a
traversal, and then with a lens again. This yields a traversal. See
[Rules of composition](reference-intro.md#rules-of-composition) for more info.

It's sometimes useful to further focus on certain elements of a traversal. This
can be done by composing a traversal with a prism like `when` that skips items
that don't match a predicate:

=== "Method chaining"

    ```typescript
    const even = O.optic<number[]>()
      .elems()
      .when((n) => n % 2 === 0)

    O.modify(even)((n) => -n)([1, 2, 3, 4, 5])
    // ==> [1, -2, 3, -4, 5]
    ```

=== "Standalone"

    ```typescript
    const even = O.compose(
      O.elems,
      O.when((n: number) => n % 2 === 0)
    )

    O.modify(even, (n) => -n, [1, 2, 3, 4, 5])
    // ==> [1, -2, 3, -4, 5]
    ```

## Polymorphism

=== "Method chaining"

    Optics can be polymorphic, which means you can change the type of the focus when
    you write through an optic. Since this is a relatively rare use case, and may be
    confusing if done by accident, polymorphic optics are created with `optic_`
    (note the underscore):

    ```typescript
    type Data = {
      foo: { bar: string }
      other: boolean
    }
    const bar = O.optic_<Data>().path('foo.bar')
    ```

=== "Standalone"

    Optics can be polymorphic, which means you can change the type of the focus when
    you write through an optic.

    ```typescript
    type Data = {
      foo: { bar: string }
      other: boolean
    }
    const bar = O.compose('foo', 'bar')
    ```

Let's modify `bar` to contain the length of the original string instead:

=== "Method chaining"

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

=== "Standalone"

    ```typescript
    const data: Data = {
      foo: { bar: 'hello there' },
      other: true,
    }

    const updated = O.modify(bar, (str) => str.length, data)
    // ==> {
    //   foo: { bar: 11 },
    //   other: true
    // }
    ```

    This is a type-safe operation, i.e. the compiler knows that the type of
    `updated.foo.bar` is `number`, editor autocomplete works correctly, etc.
