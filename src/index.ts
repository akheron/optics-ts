// This file is generated, do not edit! See ../scripts/generate-index.ts

import * as I from './internals'
import { ElemType, Eq, IfElse, RequireString, Simplify } from './utils'
import {
  Adapt,
  Apply,
  Choice,
  Compose,
  DisallowTypeChange,
  ElemUnion,
  Elems,
  HKT,
  Id,
  Path2,
  Path3,
  Path4,
  Path5,
  Plant,
  Prop,
  Optional,
  Union,
} from './hkt'

export { Apply, Compose, Eq, HKT }

export type OpticFor<S> = Equivalence<S, DisallowTypeChange<S>, S>
export type OpticFor_<S> = Equivalence<S, Id, S>

export interface Equivalence<S, T extends HKT, A> {
  _tag: 'Equivalence'

  // Equivalence · Equivalence => Equivalence
  compose<T2 extends HKT, A2>(
    optic: Equivalence<A, T2, A2>
  ): Equivalence<S, Compose<T, T2>, A2>

  // Equivalence · Iso => Iso
  compose<T2 extends HKT, A2>(optic: Iso<A, T2, A2>): Iso<S, Compose<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Iso<S, Compose<T, Adapt<A, U>>, U>

  // Equivalence · Lens => Lens
  compose<T2 extends HKT, A2>(
    optic: Lens<A, T2, A2>
  ): Lens<S, Compose<T, T2>, A2>
  prop<K extends keyof A>(key: K): Lens<S, Compose<T, Prop<A, K>>, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Lens<S, Compose<T, Path5<A, K1, K2, K3, K4, K5>>, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Lens<S, Compose<T, Path4<A, K1, K2, K3, K4>>, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Lens<S, Compose<T, Path3<A, K1, K2, K3>>, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Lens<S, Compose<T, Path2<A, K1, K2>>, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): Lens<S, Compose<T, Prop<A, K1>>, A[K1]>
  pick<K extends keyof A>(
    keys: K[]
  ): Lens<S, Compose<T, Plant<A, K>>, Pick<A, K>>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Lens<S, Compose<T, Union<A>>, A>
  prependTo(): Lens<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >
  appendTo(): Lens<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >

  // Equivalence · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Equivalence · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >

  // Equivalence · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Equivalence · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Equivalence · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface Iso<S, T extends HKT, A> {
  _tag: 'Iso'

  // Iso · Equivalence => Iso
  compose<T2 extends HKT, A2>(
    optic: Equivalence<A, T2, A2>
  ): Iso<S, Compose<T, T2>, A2>

  // Iso · Iso => Iso
  compose<T2 extends HKT, A2>(optic: Iso<A, T2, A2>): Iso<S, Compose<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Iso<S, Compose<T, Adapt<A, U>>, U>

  // Iso · Lens => Lens
  compose<T2 extends HKT, A2>(
    optic: Lens<A, T2, A2>
  ): Lens<S, Compose<T, T2>, A2>
  prop<K extends keyof A>(key: K): Lens<S, Compose<T, Prop<A, K>>, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Lens<S, Compose<T, Path5<A, K1, K2, K3, K4, K5>>, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Lens<S, Compose<T, Path4<A, K1, K2, K3, K4>>, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Lens<S, Compose<T, Path3<A, K1, K2, K3>>, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Lens<S, Compose<T, Path2<A, K1, K2>>, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): Lens<S, Compose<T, Prop<A, K1>>, A[K1]>
  pick<K extends keyof A>(
    keys: K[]
  ): Lens<S, Compose<T, Plant<A, K>>, Pick<A, K>>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Lens<S, Compose<T, Union<A>>, A>
  prependTo(): Lens<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >
  appendTo(): Lens<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >

  // Iso · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Iso · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >

  // Iso · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Iso · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Iso · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface Lens<S, T extends HKT, A> {
  _tag: 'Lens'

  // Lens · Equivalence => Lens
  compose<T2 extends HKT, A2>(
    optic: Equivalence<A, T2, A2>
  ): Lens<S, Compose<T, T2>, A2>

  // Lens · Iso => Lens
  compose<T2 extends HKT, A2>(
    optic: Iso<A, T2, A2>
  ): Lens<S, Compose<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Lens<S, Compose<T, Adapt<A, U>>, U>

  // Lens · Lens => Lens
  compose<T2 extends HKT, A2>(
    optic: Lens<A, T2, A2>
  ): Lens<S, Compose<T, T2>, A2>
  prop<K extends keyof A>(key: K): Lens<S, Compose<T, Prop<A, K>>, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Lens<S, Compose<T, Path5<A, K1, K2, K3, K4, K5>>, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Lens<S, Compose<T, Path4<A, K1, K2, K3, K4>>, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Lens<S, Compose<T, Path3<A, K1, K2, K3>>, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Lens<S, Compose<T, Path2<A, K1, K2>>, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): Lens<S, Compose<T, Prop<A, K1>>, A[K1]>
  pick<K extends keyof A>(
    keys: K[]
  ): Lens<S, Compose<T, Plant<A, K>>, Pick<A, K>>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Lens<S, Compose<T, Union<A>>, A>
  prependTo(): Lens<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >
  appendTo(): Lens<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >

  // Lens · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Lens · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >

  // Lens · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Lens · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Lens · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface Prism<S, T extends HKT, A> {
  _tag: 'Prism'

  // Prism · Equivalence => Prism
  compose<T2 extends HKT, A2>(
    optic: Equivalence<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>

  // Prism · Iso => Prism
  compose<T2 extends HKT, A2>(
    optic: Iso<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Prism<S, Compose<T, Adapt<A, U>>, U>

  // Prism · Lens => Prism
  compose<T2 extends HKT, A2>(
    optic: Lens<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  prop<K extends keyof A>(key: K): Prism<S, Compose<T, Prop<A, K>>, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Prism<S, Compose<T, Path5<A, K1, K2, K3, K4, K5>>, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Prism<S, Compose<T, Path4<A, K1, K2, K3, K4>>, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Prism<S, Compose<T, Path3<A, K1, K2, K3>>, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Prism<S, Compose<T, Path2<A, K1, K2>>, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): Prism<S, Compose<T, Prop<A, K1>>, A[K1]>
  pick<K extends keyof A>(
    keys: K[]
  ): Prism<S, Compose<T, Plant<A, K>>, Pick<A, K>>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, Union<A>>, A>
  prependTo(): Prism<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >
  appendTo(): Prism<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >

  // Prism · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, Compose<T, DisallowTypeChange<string>>, string>,
    Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Prism · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >

  // Prism · Getter => AffineFold
  compose<A2>(optic: Getter<A, A2>): AffineFold<S, A2>
  to<B>(f: (a: A) => B): AffineFold<S, B>

  // Prism · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Prism · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface Traversal<S, T extends HKT, A> {
  _tag: 'Traversal'

  // Traversal · Equivalence => Traversal
  compose<T2 extends HKT, A2>(
    optic: Equivalence<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>

  // Traversal · Iso => Traversal
  compose<T2 extends HKT, A2>(
    optic: Iso<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Traversal<S, Compose<T, Adapt<A, U>>, U>

  // Traversal · Lens => Traversal
  compose<T2 extends HKT, A2>(
    optic: Lens<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  prop<K extends keyof A>(key: K): Traversal<S, Compose<T, Prop<A, K>>, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Traversal<
    S,
    Compose<T, Path5<A, K1, K2, K3, K4, K5>>,
    A[K1][K2][K3][K4][K5]
  >
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Traversal<S, Compose<T, Path4<A, K1, K2, K3, K4>>, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Traversal<S, Compose<T, Path3<A, K1, K2, K3>>, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Traversal<S, Compose<T, Path2<A, K1, K2>>, A[K1][K2]>
  path<K1 extends keyof A>(
    path: [K1]
  ): Traversal<S, Compose<T, Prop<A, K1>>, A[K1]>
  pick<K extends keyof A>(
    keys: K[]
  ): Traversal<S, Compose<T, Plant<A, K>>, Pick<A, K>>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Traversal<S, Compose<T, Union<A>>, A>
  prependTo(): Traversal<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >
  appendTo(): Traversal<
    S,
    Compose<T, ElemUnion<A, undefined>>,
    ElemType<A> | undefined
  >

  // Traversal · Prism => Traversal
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  optional(): Traversal<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Traversal<S, Compose<T, F>, U>
  guard<U extends A>(
    g: (a: A) => a is U
  ): Traversal<S, Compose<T, Choice<A, U>>, U>
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>,
    Traversal<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>,
    Traversal<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  >
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Traversal<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Traversal<S, Compose<T, Union<A>>, A>

  // Traversal · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, Compose<T, DisallowTypeChange<string>>, string>
  >

  // Traversal · Getter => Fold
  compose<A2>(optic: Getter<A, A2>): Fold<S, A2>
  to<B>(f: (a: A) => B): Fold<S, B>

  // Traversal · AffineFold => Fold
  compose<A2>(optic: AffineFold<A, A2>): Fold<S, A2>

  // Traversal · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface Getter<S, A> {
  _tag: 'Getter'

  // Getter · Equivalence => Getter
  compose<T2 extends HKT, A2>(optic: Equivalence<A, T2, A2>): Getter<S, A2>

  // Getter · Iso => Getter
  compose<T2 extends HKT, A2>(optic: Iso<A, T2, A2>): Getter<S, A2>
  iso<U>(there: (a: A) => U, back: (u: U) => A): Getter<S, U>

  // Getter · Lens => Getter
  compose<T2 extends HKT, A2>(optic: Lens<A, T2, A2>): Getter<S, A2>
  prop<K extends keyof A>(key: K): Getter<S, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Getter<S, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Getter<S, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Getter<S, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Getter<S, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): Getter<S, A[K1]>
  pick<K extends keyof A>(keys: K[]): Getter<S, Pick<A, K>>
  filter(predicate: (item: ElemType<A>) => boolean): Getter<S, A>
  prependTo(): Getter<S, ElemType<A> | undefined>
  appendTo(): Getter<S, ElemType<A> | undefined>

  // Getter · Prism => AffineFold
  compose<T2 extends HKT, A2>(optic: Prism<A, T2, A2>): AffineFold<S, A2>
  optional(): AffineFold<S, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => AffineFold<S, U>
  guard<U extends A>(g: (a: A) => a is U): AffineFold<S, U>
  index(
    i: number
  ): IfElse<Eq<A, string>, AffineFold<S, string>, AffineFold<S, ElemType<A>>>
  head(): IfElse<
    Eq<A, string>,
    AffineFold<S, string>,
    AffineFold<S, ElemType<A>>
  >
  find(predicate: (item: ElemType<A>) => boolean): AffineFold<S, ElemType<A>>
  when(predicate: (item: A) => boolean): AffineFold<S, A>

  // Getter · Traversal => Fold
  compose<T2 extends HKT, A2>(optic: Traversal<A, T2, A2>): Fold<S, A2>
  elems(): Fold<S, ElemType<A>>
  chars(): RequireString<A, Fold<S, string>>
  words(): RequireString<A, Fold<S, string>>

  // Getter · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Getter · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Getter · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface AffineFold<S, A> {
  _tag: 'AffineFold'

  // AffineFold · Equivalence => AffineFold
  compose<T2 extends HKT, A2>(optic: Equivalence<A, T2, A2>): AffineFold<S, A2>

  // AffineFold · Iso => AffineFold
  compose<T2 extends HKT, A2>(optic: Iso<A, T2, A2>): AffineFold<S, A2>
  iso<U>(there: (a: A) => U, back: (u: U) => A): AffineFold<S, U>

  // AffineFold · Lens => AffineFold
  compose<T2 extends HKT, A2>(optic: Lens<A, T2, A2>): AffineFold<S, A2>
  prop<K extends keyof A>(key: K): AffineFold<S, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): AffineFold<S, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): AffineFold<S, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): AffineFold<S, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): AffineFold<S, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): AffineFold<S, A[K1]>
  pick<K extends keyof A>(keys: K[]): AffineFold<S, Pick<A, K>>
  filter(predicate: (item: ElemType<A>) => boolean): AffineFold<S, A>
  prependTo(): AffineFold<S, ElemType<A> | undefined>
  appendTo(): AffineFold<S, ElemType<A> | undefined>

  // AffineFold · Prism => AffineFold
  compose<T2 extends HKT, A2>(optic: Prism<A, T2, A2>): AffineFold<S, A2>
  optional(): AffineFold<S, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => AffineFold<S, U>
  guard<U extends A>(g: (a: A) => a is U): AffineFold<S, U>
  index(
    i: number
  ): IfElse<Eq<A, string>, AffineFold<S, string>, AffineFold<S, ElemType<A>>>
  head(): IfElse<
    Eq<A, string>,
    AffineFold<S, string>,
    AffineFold<S, ElemType<A>>
  >
  find(predicate: (item: ElemType<A>) => boolean): AffineFold<S, ElemType<A>>
  when(predicate: (item: A) => boolean): AffineFold<S, A>

  // AffineFold · Traversal => Fold
  compose<T2 extends HKT, A2>(optic: Traversal<A, T2, A2>): Fold<S, A2>
  elems(): Fold<S, ElemType<A>>
  chars(): RequireString<A, Fold<S, string>>
  words(): RequireString<A, Fold<S, string>>

  // AffineFold · Getter => AffineFold
  compose<A2>(optic: Getter<A, A2>): AffineFold<S, A2>
  to<B>(f: (a: A) => B): AffineFold<S, B>

  // AffineFold · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // AffineFold · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

export interface Fold<S, A> {
  _tag: 'Fold'

  // Fold · Equivalence => Fold
  compose<T2 extends HKT, A2>(optic: Equivalence<A, T2, A2>): Fold<S, A2>

  // Fold · Iso => Fold
  compose<T2 extends HKT, A2>(optic: Iso<A, T2, A2>): Fold<S, A2>
  iso<U>(there: (a: A) => U, back: (u: U) => A): Fold<S, U>

  // Fold · Lens => Fold
  compose<T2 extends HKT, A2>(optic: Lens<A, T2, A2>): Fold<S, A2>
  prop<K extends keyof A>(key: K): Fold<S, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): Fold<S, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): Fold<S, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): Fold<S, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): Fold<S, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): Fold<S, A[K1]>
  pick<K extends keyof A>(keys: K[]): Fold<S, Pick<A, K>>
  filter(predicate: (item: ElemType<A>) => boolean): Fold<S, A>
  prependTo(): Fold<S, ElemType<A> | undefined>
  appendTo(): Fold<S, ElemType<A> | undefined>

  // Fold · Prism => Fold
  compose<T2 extends HKT, A2>(optic: Prism<A, T2, A2>): Fold<S, A2>
  optional(): Fold<S, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(g: (a: A) => a is U) => Fold<S, U>
  guard<U extends A>(g: (a: A) => a is U): Fold<S, U>
  index(i: number): IfElse<Eq<A, string>, Fold<S, string>, Fold<S, ElemType<A>>>
  head(): IfElse<Eq<A, string>, Fold<S, string>, Fold<S, ElemType<A>>>
  find(predicate: (item: ElemType<A>) => boolean): Fold<S, ElemType<A>>
  when(predicate: (item: A) => boolean): Fold<S, A>

  // Fold · Traversal => Fold
  compose<T2 extends HKT, A2>(optic: Traversal<A, T2, A2>): Fold<S, A2>
  elems(): Fold<S, ElemType<A>>
  chars(): RequireString<A, Fold<S, string>>
  words(): RequireString<A, Fold<S, string>>

  // Fold · Getter => Fold
  compose<A2>(optic: Getter<A, A2>): Fold<S, A2>
  to<B>(f: (a: A) => B): Fold<S, B>

  // Fold · AffineFold => Fold
  compose<A2>(optic: AffineFold<A, A2>): Fold<S, A2>

  // Fold · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>
}

// Equivalence · Equivalence => Equivalence
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Equivalence<S, T2, A2>
): Equivalence<S, Compose<T, T2>, A2>
// Equivalence · Iso => Iso
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Iso<S, T2, A2>
): Iso<S, Compose<T, T2>, A2>
// Equivalence · Lens => Lens
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Lens<S, T2, A2>
): Lens<S, Compose<T, T2>, A2>
// Equivalence · Prism => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Prism<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Equivalence · Traversal => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Traversal<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Equivalence · Getter => Getter
export function compose<S, T extends HKT, A, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Getter<S, A>
): Getter<S, A2>
// Equivalence · AffineFold => AffineFold
export function compose<S, T extends HKT, A, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: AffineFold<S, A>
): AffineFold<S, A2>
// Equivalence · Fold => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// Iso · Equivalence => Iso
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Iso<S, T, A>,
  optic2: Equivalence<S, T2, A2>
): Iso<S, Compose<T, T2>, A2>
// Iso · Iso => Iso
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Iso<S, T, A>,
  optic2: Iso<S, T2, A2>
): Iso<S, Compose<T, T2>, A2>
// Iso · Lens => Lens
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Iso<S, T, A>,
  optic2: Lens<S, T2, A2>
): Lens<S, Compose<T, T2>, A2>
// Iso · Prism => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Iso<S, T, A>,
  optic2: Prism<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Iso · Traversal => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Iso<S, T, A>,
  optic2: Traversal<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Iso · Getter => Getter
export function compose<S, T extends HKT, A, A2>(
  optic1: Iso<S, T, A>,
  optic2: Getter<S, A>
): Getter<S, A2>
// Iso · AffineFold => AffineFold
export function compose<S, T extends HKT, A, A2>(
  optic1: Iso<S, T, A>,
  optic2: AffineFold<S, A>
): AffineFold<S, A2>
// Iso · Fold => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Iso<S, T, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// Lens · Equivalence => Lens
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Lens<S, T, A>,
  optic2: Equivalence<S, T2, A2>
): Lens<S, Compose<T, T2>, A2>
// Lens · Iso => Lens
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Lens<S, T, A>,
  optic2: Iso<S, T2, A2>
): Lens<S, Compose<T, T2>, A2>
// Lens · Lens => Lens
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Lens<S, T, A>,
  optic2: Lens<S, T2, A2>
): Lens<S, Compose<T, T2>, A2>
// Lens · Prism => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Lens<S, T, A>,
  optic2: Prism<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Lens · Traversal => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Lens<S, T, A>,
  optic2: Traversal<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Lens · Getter => Getter
export function compose<S, T extends HKT, A, A2>(
  optic1: Lens<S, T, A>,
  optic2: Getter<S, A>
): Getter<S, A2>
// Lens · AffineFold => AffineFold
export function compose<S, T extends HKT, A, A2>(
  optic1: Lens<S, T, A>,
  optic2: AffineFold<S, A>
): AffineFold<S, A2>
// Lens · Fold => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Lens<S, T, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// Prism · Equivalence => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Prism<S, T, A>,
  optic2: Equivalence<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Prism · Iso => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Prism<S, T, A>,
  optic2: Iso<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Prism · Lens => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Prism<S, T, A>,
  optic2: Lens<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Prism · Prism => Prism
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Prism<S, T, A>,
  optic2: Prism<S, T2, A2>
): Prism<S, Compose<T, T2>, A2>
// Prism · Traversal => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Prism<S, T, A>,
  optic2: Traversal<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Prism · Getter => AffineFold
export function compose<S, T extends HKT, A, A2>(
  optic1: Prism<S, T, A>,
  optic2: Getter<S, A>
): AffineFold<S, A2>
// Prism · AffineFold => AffineFold
export function compose<S, T extends HKT, A, A2>(
  optic1: Prism<S, T, A>,
  optic2: AffineFold<S, A>
): AffineFold<S, A2>
// Prism · Fold => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Prism<S, T, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// Traversal · Equivalence => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Equivalence<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Traversal · Iso => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Iso<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Traversal · Lens => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Lens<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Traversal · Prism => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Prism<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Traversal · Traversal => Traversal
export function compose<S, T extends HKT, A, T2 extends HKT, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Traversal<S, T2, A2>
): Traversal<S, Compose<T, T2>, A2>
// Traversal · Getter => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Getter<S, A>
): Fold<S, A2>
// Traversal · AffineFold => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Traversal<S, T, A>,
  optic2: AffineFold<S, A>
): Fold<S, A2>
// Traversal · Fold => Fold
export function compose<S, T extends HKT, A, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// Getter · Equivalence => Getter
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Getter<S, A>,
  optic2: Equivalence<S, T2, A2>
): Getter<S, A2>
// Getter · Iso => Getter
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Getter<S, A>,
  optic2: Iso<S, T2, A2>
): Getter<S, A2>
// Getter · Lens => Getter
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Getter<S, A>,
  optic2: Lens<S, T2, A2>
): Getter<S, A2>
// Getter · Prism => AffineFold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Getter<S, A>,
  optic2: Prism<S, T2, A2>
): AffineFold<S, A2>
// Getter · Traversal => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Getter<S, A>,
  optic2: Traversal<S, T2, A2>
): Fold<S, A2>
// Getter · Getter => Getter
export function compose<S, A, A2>(
  optic1: Getter<S, A>,
  optic2: Getter<S, A>
): Getter<S, A2>
// Getter · AffineFold => AffineFold
export function compose<S, A, A2>(
  optic1: Getter<S, A>,
  optic2: AffineFold<S, A>
): AffineFold<S, A2>
// Getter · Fold => Fold
export function compose<S, A, A2>(
  optic1: Getter<S, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// AffineFold · Equivalence => AffineFold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: AffineFold<S, A>,
  optic2: Equivalence<S, T2, A2>
): AffineFold<S, A2>
// AffineFold · Iso => AffineFold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: AffineFold<S, A>,
  optic2: Iso<S, T2, A2>
): AffineFold<S, A2>
// AffineFold · Lens => AffineFold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: AffineFold<S, A>,
  optic2: Lens<S, T2, A2>
): AffineFold<S, A2>
// AffineFold · Prism => AffineFold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: AffineFold<S, A>,
  optic2: Prism<S, T2, A2>
): AffineFold<S, A2>
// AffineFold · Traversal => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: AffineFold<S, A>,
  optic2: Traversal<S, T2, A2>
): Fold<S, A2>
// AffineFold · Getter => AffineFold
export function compose<S, A, A2>(
  optic1: AffineFold<S, A>,
  optic2: Getter<S, A>
): AffineFold<S, A2>
// AffineFold · AffineFold => AffineFold
export function compose<S, A, A2>(
  optic1: AffineFold<S, A>,
  optic2: AffineFold<S, A>
): AffineFold<S, A2>
// AffineFold · Fold => Fold
export function compose<S, A, A2>(
  optic1: AffineFold<S, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
// Fold · Equivalence => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Fold<S, A>,
  optic2: Equivalence<S, T2, A2>
): Fold<S, A2>
// Fold · Iso => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Fold<S, A>,
  optic2: Iso<S, T2, A2>
): Fold<S, A2>
// Fold · Lens => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Fold<S, A>,
  optic2: Lens<S, T2, A2>
): Fold<S, A2>
// Fold · Prism => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Fold<S, A>,
  optic2: Prism<S, T2, A2>
): Fold<S, A2>
// Fold · Traversal => Fold
export function compose<S, A, T2 extends HKT, A2>(
  optic1: Fold<S, A>,
  optic2: Traversal<S, T2, A2>
): Fold<S, A2>
// Fold · Getter => Fold
export function compose<S, A, A2>(
  optic1: Fold<S, A>,
  optic2: Getter<S, A>
): Fold<S, A2>
// Fold · AffineFold => Fold
export function compose<S, A, A2>(
  optic1: Fold<S, A>,
  optic2: AffineFold<S, A>
): Fold<S, A2>
// Fold · Fold => Fold
export function compose<S, A, A2>(
  optic1: Fold<S, A>,
  optic2: Fold<S, A>
): Fold<S, A2>
export function compose(optic1: any, optic2: any) {
  return optic1.compose(optic2)
}

export function optic<S>(): OpticFor<S> {
  return I.optic as any
}

export function optic_<S>(): OpticFor_<S> {
  return I.optic as any
}

export function get<S, A>(
  optic:
    | Equivalence<S, any, A>
    | Iso<S, any, A>
    | Lens<S, any, A>
    | Getter<S, A>
): (source: S) => A {
  return source => I.get((optic as any)._ref, source)
}

export function preview<S, A>(
  optic: Prism<S, any, A> | Traversal<S, any, A> | AffineFold<S, A> | Fold<S, A>
): (source: S) => A | undefined {
  return source => I.preview((optic as any)._ref, source)
}

export function collect<S, A>(
  optic: Prism<S, any, A> | Traversal<S, any, A> | Fold<S, A>
): (source: S) => A[] {
  return source => I.collect((optic as any)._ref, source)
}

export function modify<S, T extends HKT, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
): <B>(f: (a: A) => B) => (source: S) => Simplify<S, Apply<T, B>> {
  return f => source => I.modify((optic as any)._ref, f, source)
}

export function set<S, T extends HKT, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
): <B>(value: B) => (source: S) => Simplify<S, Apply<T, B>> {
  return value => source => I.set((optic as any)._ref, value, source)
}

// Taken from fp-ts
export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): D
export function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export function pipe(
  a: unknown,
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return a
    case 2:
      return ab!(a)
    case 3:
      return bc!(ab!(a))
    case 4:
      return cd!(bc!(ab!(a)))
    case 5:
      return de!(cd!(bc!(ab!(a))))
    case 6:
      return ef!(de!(cd!(bc!(ab!(a)))))
    case 7:
      return fg!(ef!(de!(cd!(bc!(ab!(a))))))
    case 8:
      return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
    case 9:
      return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
    case 10:
      return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
  }
  return
}
