// This file is generated, do not edit! See ../scripts/generate-index.ts

import * as I from './internals'
import { ElemType, Eq, Simplify } from './utils'
import {
  Adapt,
  Apply,
  Choice,
  Compose,
  DisallowTypeChange,
  ElemUnion,
  Elems,
  Id,
  HKT,
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

  // Equivalence · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(i: number): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Equivalence · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
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

  // Iso · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(i: number): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Iso · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
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

  // Lens · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(i: number): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Lens · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
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

  // Prism · Prism => Prism
  compose<T2 extends HKT, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, Compose<T, T2>, A2>
  optional(): Prism<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): Prism<S, Compose<T, Choice<A, U>>, U>
  index(i: number): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, Compose<T, Union<A>>, A>

  // Prism · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
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
  index(i: number): Traversal<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Traversal<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): Traversal<S, Compose<T, Union<A>>, A>

  // Traversal · Traversal => Traversal
  compose<T2 extends HKT, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, Compose<T, T2>, A2>
  elems(): Traversal<S, Compose<T, Elems>, ElemType<A>>
}

// Equivalence · Equivalence => Equivalence
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Equivalence<S, T1, A1>,
  optic2: Equivalence<A1, T2, A2>
): Equivalence<S, Compose<T1, T2>, A2>
// Equivalence · Iso => Iso
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Equivalence<S, T1, A1>,
  optic2: Iso<A1, T2, A2>
): Iso<S, Compose<T1, T2>, A2>
// Equivalence · Lens => Lens
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Equivalence<S, T1, A1>,
  optic2: Lens<A1, T2, A2>
): Lens<S, Compose<T1, T2>, A2>
// Equivalence · Prism => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Equivalence<S, T1, A1>,
  optic2: Prism<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Equivalence · Traversal => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Equivalence<S, T1, A1>,
  optic2: Traversal<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>

// Iso · Equivalence => Iso
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Iso<S, T1, A1>,
  optic2: Equivalence<A1, T2, A2>
): Iso<S, Compose<T1, T2>, A2>
// Iso · Iso => Iso
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Iso<S, T1, A1>,
  optic2: Iso<A1, T2, A2>
): Iso<S, Compose<T1, T2>, A2>
// Iso · Lens => Lens
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Iso<S, T1, A1>,
  optic2: Lens<A1, T2, A2>
): Lens<S, Compose<T1, T2>, A2>
// Iso · Prism => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Iso<S, T1, A1>,
  optic2: Prism<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Iso · Traversal => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Iso<S, T1, A1>,
  optic2: Traversal<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>

// Lens · Equivalence => Lens
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Lens<S, T1, A1>,
  optic2: Equivalence<A1, T2, A2>
): Lens<S, Compose<T1, T2>, A2>
// Lens · Iso => Lens
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Lens<S, T1, A1>,
  optic2: Iso<A1, T2, A2>
): Lens<S, Compose<T1, T2>, A2>
// Lens · Lens => Lens
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Lens<S, T1, A1>,
  optic2: Lens<A1, T2, A2>
): Lens<S, Compose<T1, T2>, A2>
// Lens · Prism => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Lens<S, T1, A1>,
  optic2: Prism<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Lens · Traversal => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Lens<S, T1, A1>,
  optic2: Traversal<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>

// Prism · Equivalence => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Prism<S, T1, A1>,
  optic2: Equivalence<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Prism · Iso => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Prism<S, T1, A1>,
  optic2: Iso<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Prism · Lens => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Prism<S, T1, A1>,
  optic2: Lens<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Prism · Prism => Prism
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Prism<S, T1, A1>,
  optic2: Prism<A1, T2, A2>
): Prism<S, Compose<T1, T2>, A2>
// Prism · Traversal => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Prism<S, T1, A1>,
  optic2: Traversal<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>

// Traversal · Equivalence => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Traversal<S, T1, A1>,
  optic2: Equivalence<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>
// Traversal · Iso => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Traversal<S, T1, A1>,
  optic2: Iso<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>
// Traversal · Lens => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Traversal<S, T1, A1>,
  optic2: Lens<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>
// Traversal · Prism => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Traversal<S, T1, A1>,
  optic2: Prism<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>
// Traversal · Traversal => Traversal
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: Traversal<S, T1, A1>,
  optic2: Traversal<A1, T2, A2>
): Traversal<S, Compose<T1, T2>, A2>

export function compose(optic1: any, optic2: any) {
  return optic1.compose(optic2)
}

export function optic<S>(): OpticFor<S> {
  return I.optic as any
}

export function optic_<S>(): OpticFor_<S> {
  return I.optic as any
}

export function get<S, T extends HKT, A>(
  optic: Equivalence<S, T, A> | Iso<S, T, A> | Lens<S, T, A>
): (source: S) => A {
  return source => I.get((optic as any)._ref, source)
}

export function preview<S, T extends HKT, A>(
  optic: Prism<S, T, A> | Traversal<S, T, A>
): (source: S) => A | undefined {
  return source => I.preview((optic as any)._ref, source)
}

export function collect<S, T extends HKT, A>(
  optic: Prism<S, T, A> | Traversal<S, T, A>
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
