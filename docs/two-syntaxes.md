# The Two Syntaxes

Since optics-ts v2.2.0, there are two syntaxes for optics: **method chaining**
and **standalone optics**. Method chaining is the default, tried and tested
syntax. Standalone syntax is still experimental, but it's likely to become the
default in the future.

In the other parts of the documentation, all examples are given in terms of both
syntaxes. There are also slight semantic differences in certain optics, which
are clearly documented.

The following sections summarize the biggest differences between the syntaxes.

## Importing

**Method chaining**

```typescript
import * as O from 'optics-ts'
```

**Standalone**

```typescript
import * as O from 'optics-ts/standalone'
```

## Composing

**Method chaining**

The name of this syntax is "method chaining", because optics are composed by
method chaining, also known as a
[fluent interface](https://en.wikipedia.org/wiki/Fluent_interface). Composition
always starts with some root type (`MyType` in the example below), which ties
the optic to the type of the data structure it manipulates.

```typescript
O.optic<MyType>()
  .prop('foo')
  .optional()
  .when((value) => value > 42)
```

**Standalone**

The name of this syntax comes from the fact that optics are _standalone_
functions and values, i.e. they "float" without being tied to any concrete type.
They of course require the data to be of a specific shape, but you don't need to
explicitly state the type in your code.

The implication of not tying the optics to any particular type beforehand means
that you need to add type annotations to some places, like
`(value: number) => ...` for `O.when`'s parameter in the example below.

```typescript
O.compose(
  'foo',
  O.optional,
  O.when((value: number) => value > 42)
)
```

## Currying

**Method chaining**

Operation functions like `O.get`, `O.modify` and `O.set` are available in the
fully curried form only:

```typescript
O.get(myOptic)(myData)
O.modify(myOptic)((value) => value + 1)(myData)
```

**Standalone**

Both curried and uncurried versions are available:

```typescript
O.get(myOptic, myData)
O.get(myOptic)(myData)

O.modify(myOptic, (value) => value + 1, myData)
O.modify(myOptic)((value) => value + 1, myData)
O.modify(myOptic)((value) => value + 1)(myData)
```

## Tree shaking

**Method chaining**

Tree shaking is not possible. The whole library is always included in the
bundle.

**Standalone**

Fully tree shakeable. Only the features you use are included in the bundle.

## Compilation speed

It seems that compiling large programs using the standalone syntax is somewhat
slower compared to method chaining. However, a good, repeatable benchmark is
still on the TODO list. Also, future improvements in the TypeScript compiler may
affect compilation speeds dramatically.

## Runtime performance

There should be no performance difference between the two, although there's no
benchmark demonstrating this either, yet.
