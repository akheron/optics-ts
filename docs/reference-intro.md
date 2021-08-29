# Introduction

## What are optics?

Optics are a way to describe a "path" into a data structure, i.e. to concentrate
on a part of the data structure. This is called the optic's focus. However,
optics are not tied to any specific value of a data structure, but are
standalone values themselves.

Optics are composable in the sense that you can combine two optics together to
construct another optic that combines the semantics of the two. This makes it
possible to construct complex optics from basic optics, making them usable for a
wide range of different data structures.

Ultimately, an optic can be used to read the value in its focus from a given a
data structure compatible with the optic. It can also be used to modify the
value in its focus in an _immutable_ way, i.e. leaving the original data
structure intact.

## Types of optics

The optic types supported by optics-ts are are Equivalence, Iso (isomorphism),
Lens, Prism, Traversal, Getter, AffineFold, Fold and Setter. In addition,
there's RemovablePrism, which is a special case of Prism.

The types differ mainly on the possible number of focuses they have, and whether
they are read-write, read-only or write-only. The following table summarizes
these properties:

| Type           | Focuses | Read/Write |
| -------------- | ------- | ---------- |
| Equivalence    | 1       | R/W        |
| Iso            | 1       | R/W        |
| Lens           | 1       | R/W        |
| Prism          | 0..1    | R/W        |
| RemovablePrism | 0..1    | R/W        |
| Traversal      | 0..n    | R/W        |
| Getter         | 1       | R          |
| AffineFold     | 0..1    | R          |
| Fold           | 0..n    | R          |
| Setter         | 1       | W          |

## Rules of composition

Any read-write and read-only optic can be composed with another read-write and
read-only optic. The type of the resulting optic can be determined from this
diagram:

```
Equivalence -> Iso -> Lens ---> Prism ------> Traversal
                      |         |             |
                      v         v             v
                      Getter -> AffineFold -> Fold
```

When you compose two optics A and B, the result is the nearest optic that you
get by following the arrows starting from both A and B.

For example, composing a Getter with a Traversal yields a Fold. Composing an Iso
with a Prism yields a Prism.

Setter is special. You can only compose writable optics with setters. Setters
cannot be further composed with any other optic.

RemovablePrism behaves like a regular prism, but it can be used to remove the
focus from its parent container. When composed with other optics, composes like
(and turns back into) a regular Prism.
