/* eslint-disable @typescript-eslint/adjacent-overload-signatures, @typescript-eslint/no-unused-vars */
// This file is generated, do not edit! See ../scripts/generate-index.ts

import * as I from './internals.js'
import {
  ElemType,
  Eq,
  IfElse,
  Nth,
  DottedPath,
  TuplePath,
  RequireString,
  Simplify,
} from './utils.js'
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
  Index,
  PartsOf,
  Plant,
  Prop,
  Optional,
  SetNth,
  SetDottedPath,
  SetTuplePath,
  Union,
} from './hkt.js'

export { Apply, Compose, Eq, HKT }

export type Removable = true | undefined
export interface Params<T extends HKT, R extends Removable = undefined> {
  readonly _T: T
  readonly _R: R
}
export type OpticParams = Params<any, any>

export type NextParams<
  C extends OpticParams,
  T extends HKT,
  R extends Removable = undefined
> = Params<Compose<C['_T'], T>, R>

export type NextComposeParams<
  C1 extends OpticParams,
  C2 extends OpticParams
> = Params<Compose<C1['_T'], C2['_T']>, C2['_R']>

export type OpticFor<S> = Equivalence<S, Params<DisallowTypeChange<S>>, S>
export type OpticFor_<S> = Equivalence<S, Params<Id>, S>

export interface Equivalence<S, T extends OpticParams, A> {
  readonly _tag: 'Equivalence'
  readonly _removable: T['_R']

  // Equivalence · Equivalence => Equivalence
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Equivalence<S, NextComposeParams<T, T2>, A2>

  // Equivalence · Iso => Iso
  compose<T2 extends OpticParams, A2>(
    optic: Iso<A, T2, A2>
  ): Iso<S, NextComposeParams<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Iso<S, NextParams<T, Adapt<A, U>>, U>
  indexed(): Iso<S, NextParams<T, Index>, [number, ElemType<A>][]>

  // Equivalence · Lens => Lens
  compose<T2 extends OpticParams, A2>(
    optic: Lens<A, T2, A2>
  ): Lens<S, NextComposeParams<T, T2>, A2>
  lens<U>(
    view: (a: A) => U,
    update: (a: A, v: U) => A
  ): Lens<S, NextParams<T, Adapt<A, U>>, U>
  prop<K extends keyof A>(key: K): Lens<S, NextParams<T, Prop<A, K>>, A[K]>
  path<K extends keyof any>(
    path: K
  ): Lens<S, NextParams<T, SetDottedPath<A, K>>, DottedPath<A, K>>
  path<K extends (keyof any)[]>(
    ...path: K
  ): Lens<S, NextParams<T, SetTuplePath<A, K>>, TuplePath<A, K>>
  nth<N extends number>(n: N): Lens<S, NextParams<T, SetNth<A, N>>, Nth<A, N>>
  pick<K extends keyof A>(
    keys: K[]
  ): Lens<S, NextParams<T, Plant<A, K>>, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Lens<S, NextParams<T, Union<A>>, B[]>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Lens<S, NextParams<T, Union<A>>, A>
  valueOr<B>(
    defaultValue: B
  ): Lens<S, NextParams<T, Id>, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): Lens<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Lens<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  reread(
    read: (value: A) => A
  ): Lens<S, NextParams<T, DisallowTypeChange<A>>, A>
  rewrite(
    write: (value: A) => A
  ): Lens<S, NextParams<T, DisallowTypeChange<A>>, A>

  // Equivalence · Prism => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>
  optional(): Prism<S, NextParams<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, NextParams<T, F>, U>
  guard<U extends A>(
    g: (a: A) => a is U
  ): Prism<S, NextParams<T, Choice<A, U>>, U>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, NextParams<T, Union<A>>, A>
  at(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >

  // Equivalence · Traversal => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  elems(): Traversal<S, NextParams<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >

  // Equivalence · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Equivalence · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Equivalence · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>

  // Equivalence · Setter => Setter
  compose<T2 extends OpticParams, A2>(
    optic: Setter<A, T2, A2>
  ): Setter<S, NextComposeParams<T, T2>, A2>
  prependTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
  appendTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
}

export interface Iso<S, T extends OpticParams, A> {
  readonly _tag: 'Iso'
  readonly _removable: T['_R']

  // Iso · Equivalence => Iso
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Iso<S, NextComposeParams<T, T2>, A2>

  // Iso · Iso => Iso
  compose<T2 extends OpticParams, A2>(
    optic: Iso<A, T2, A2>
  ): Iso<S, NextComposeParams<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Iso<S, NextParams<T, Adapt<A, U>>, U>
  indexed(): Iso<S, NextParams<T, Index>, [number, ElemType<A>][]>

  // Iso · Lens => Lens
  compose<T2 extends OpticParams, A2>(
    optic: Lens<A, T2, A2>
  ): Lens<S, NextComposeParams<T, T2>, A2>
  lens<U>(
    view: (a: A) => U,
    update: (a: A, v: U) => A
  ): Lens<S, NextParams<T, Adapt<A, U>>, U>
  prop<K extends keyof A>(key: K): Lens<S, NextParams<T, Prop<A, K>>, A[K]>
  path<K extends keyof any>(
    path: K
  ): Lens<S, NextParams<T, SetDottedPath<A, K>>, DottedPath<A, K>>
  path<K extends (keyof any)[]>(
    ...path: K
  ): Lens<S, NextParams<T, SetTuplePath<A, K>>, TuplePath<A, K>>
  nth<N extends number>(n: N): Lens<S, NextParams<T, SetNth<A, N>>, Nth<A, N>>
  pick<K extends keyof A>(
    keys: K[]
  ): Lens<S, NextParams<T, Plant<A, K>>, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Lens<S, NextParams<T, Union<A>>, B[]>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Lens<S, NextParams<T, Union<A>>, A>
  valueOr<B>(
    defaultValue: B
  ): Lens<S, NextParams<T, Id>, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): Lens<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Lens<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  reread(
    read: (value: A) => A
  ): Lens<S, NextParams<T, DisallowTypeChange<A>>, A>
  rewrite(
    write: (value: A) => A
  ): Lens<S, NextParams<T, DisallowTypeChange<A>>, A>

  // Iso · Prism => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>
  optional(): Prism<S, NextParams<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, NextParams<T, F>, U>
  guard<U extends A>(
    g: (a: A) => a is U
  ): Prism<S, NextParams<T, Choice<A, U>>, U>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, NextParams<T, Union<A>>, A>
  at(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >

  // Iso · Traversal => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  elems(): Traversal<S, NextParams<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >

  // Iso · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Iso · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Iso · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>

  // Iso · Setter => Setter
  compose<T2 extends OpticParams, A2>(
    optic: Setter<A, T2, A2>
  ): Setter<S, NextComposeParams<T, T2>, A2>
  prependTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
  appendTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
}

export interface Lens<S, T extends OpticParams, A> {
  readonly _tag: 'Lens'
  readonly _removable: T['_R']

  // Lens · Equivalence => Lens
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Lens<S, NextComposeParams<T, T2>, A2>

  // Lens · Iso => Lens
  compose<T2 extends OpticParams, A2>(
    optic: Iso<A, T2, A2>
  ): Lens<S, NextComposeParams<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Lens<S, NextParams<T, Adapt<A, U>>, U>
  indexed(): Lens<S, NextParams<T, Index>, [number, ElemType<A>][]>

  // Lens · Lens => Lens
  compose<T2 extends OpticParams, A2>(
    optic: Lens<A, T2, A2>
  ): Lens<S, NextComposeParams<T, T2>, A2>
  lens<U>(
    view: (a: A) => U,
    update: (a: A, v: U) => A
  ): Lens<S, NextParams<T, Adapt<A, U>>, U>
  prop<K extends keyof A>(key: K): Lens<S, NextParams<T, Prop<A, K>>, A[K]>
  path<K extends keyof any>(
    path: K
  ): Lens<S, NextParams<T, SetDottedPath<A, K>>, DottedPath<A, K>>
  path<K extends (keyof any)[]>(
    ...path: K
  ): Lens<S, NextParams<T, SetTuplePath<A, K>>, TuplePath<A, K>>
  nth<N extends number>(n: N): Lens<S, NextParams<T, SetNth<A, N>>, Nth<A, N>>
  pick<K extends keyof A>(
    keys: K[]
  ): Lens<S, NextParams<T, Plant<A, K>>, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Lens<S, NextParams<T, Union<A>>, B[]>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Lens<S, NextParams<T, Union<A>>, A>
  valueOr<B>(
    defaultValue: B
  ): Lens<S, NextParams<T, Id>, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): Lens<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Lens<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  reread(
    read: (value: A) => A
  ): Lens<S, NextParams<T, DisallowTypeChange<A>>, A>
  rewrite(
    write: (value: A) => A
  ): Lens<S, NextParams<T, DisallowTypeChange<A>>, A>

  // Lens · Prism => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>
  optional(): Prism<S, NextParams<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, NextParams<T, F>, U>
  guard<U extends A>(
    g: (a: A) => a is U
  ): Prism<S, NextParams<T, Choice<A, U>>, U>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, NextParams<T, Union<A>>, A>
  at(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >

  // Lens · Traversal => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  elems(): Traversal<S, NextParams<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >

  // Lens · Getter => Getter
  compose<A2>(optic: Getter<A, A2>): Getter<S, A2>
  to<B>(f: (a: A) => B): Getter<S, B>

  // Lens · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Lens · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>

  // Lens · Setter => Setter
  compose<T2 extends OpticParams, A2>(
    optic: Setter<A, T2, A2>
  ): Setter<S, NextComposeParams<T, T2>, A2>
  prependTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
  appendTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
}

export interface Prism<S, T extends OpticParams, A> {
  readonly _tag: 'Prism'
  readonly _removable: T['_R']

  // Prism · Equivalence => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>

  // Prism · Iso => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Iso<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Prism<S, NextParams<T, Adapt<A, U>>, U>
  indexed(): Prism<S, NextParams<T, Index>, [number, ElemType<A>][]>

  // Prism · Lens => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Lens<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>
  lens<U>(
    view: (a: A) => U,
    update: (a: A, v: U) => A
  ): Prism<S, NextParams<T, Adapt<A, U>>, U>
  prop<K extends keyof A>(key: K): Prism<S, NextParams<T, Prop<A, K>>, A[K]>
  path<K extends keyof any>(
    path: K
  ): Prism<S, NextParams<T, SetDottedPath<A, K>>, DottedPath<A, K>>
  path<K extends (keyof any)[]>(
    ...path: K
  ): Prism<S, NextParams<T, SetTuplePath<A, K>>, TuplePath<A, K>>
  nth<N extends number>(n: N): Prism<S, NextParams<T, SetNth<A, N>>, Nth<A, N>>
  pick<K extends keyof A>(
    keys: K[]
  ): Prism<S, NextParams<T, Plant<A, K>>, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Prism<S, NextParams<T, Union<A>>, B[]>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, NextParams<T, Union<A>>, A>
  valueOr<B>(
    defaultValue: B
  ): Prism<S, NextParams<T, Id>, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): Prism<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Prism<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  reread(
    read: (value: A) => A
  ): Prism<S, NextParams<T, DisallowTypeChange<A>>, A>
  rewrite(
    write: (value: A) => A
  ): Prism<S, NextParams<T, DisallowTypeChange<A>>, A>

  // Prism · Prism => Prism
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): Prism<S, NextComposeParams<T, T2>, A2>
  optional(): Prism<S, NextParams<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Prism<S, NextParams<T, F>, U>
  guard<U extends A>(
    g: (a: A) => a is U
  ): Prism<S, NextParams<T, Choice<A, U>>, U>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  when(predicate: (item: A) => boolean): Prism<S, NextParams<T, Union<A>>, A>
  at(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Prism<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Prism<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >

  // Prism · Traversal => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  elems(): Traversal<S, NextParams<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >

  // Prism · Getter => AffineFold
  compose<A2>(optic: Getter<A, A2>): AffineFold<S, A2>
  to<B>(f: (a: A) => B): AffineFold<S, B>

  // Prism · AffineFold => AffineFold
  compose<A2>(optic: AffineFold<A, A2>): AffineFold<S, A2>

  // Prism · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>

  // Prism · Setter => Setter
  compose<T2 extends OpticParams, A2>(
    optic: Setter<A, T2, A2>
  ): Setter<S, NextComposeParams<T, T2>, A2>
  prependTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
  appendTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
}

export interface Traversal<S, T extends OpticParams, A> {
  readonly _tag: 'Traversal'
  readonly _removable: T['_R']

  // Traversal · Equivalence => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>

  // Traversal · Iso => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Iso<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): Traversal<S, NextParams<T, Adapt<A, U>>, U>
  indexed(): Traversal<S, NextParams<T, Index>, [number, ElemType<A>][]>

  // Traversal · Lens => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Lens<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  lens<U>(
    view: (a: A) => U,
    update: (a: A, v: U) => A
  ): Traversal<S, NextParams<T, Adapt<A, U>>, U>
  prop<K extends keyof A>(key: K): Traversal<S, NextParams<T, Prop<A, K>>, A[K]>
  path<K extends keyof any>(
    path: K
  ): Traversal<S, NextParams<T, SetDottedPath<A, K>>, DottedPath<A, K>>
  path<K extends (keyof any)[]>(
    ...path: K
  ): Traversal<S, NextParams<T, SetTuplePath<A, K>>, TuplePath<A, K>>
  nth<N extends number>(
    n: N
  ): Traversal<S, NextParams<T, SetNth<A, N>>, Nth<A, N>>
  pick<K extends keyof A>(
    keys: K[]
  ): Traversal<S, NextParams<T, Plant<A, K>>, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Traversal<S, NextParams<T, Union<A>>, B[]>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): Traversal<S, NextParams<T, Union<A>>, A>
  valueOr<B>(
    defaultValue: B
  ): Traversal<S, NextParams<T, Id>, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): Traversal<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Traversal<S, NextParams<T, PartsOf<U['_T'], A>>, B[]>
  reread(
    read: (value: A) => A
  ): Traversal<S, NextParams<T, DisallowTypeChange<A>>, A>
  rewrite(
    write: (value: A) => A
  ): Traversal<S, NextParams<T, DisallowTypeChange<A>>, A>

  // Traversal · Prism => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  optional(): Traversal<S, NextParams<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => Traversal<S, NextParams<T, F>, U>
  guard<U extends A>(
    g: (a: A) => a is U
  ): Traversal<S, NextParams<T, Choice<A, U>>, U>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): Traversal<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  when(
    predicate: (item: A) => boolean
  ): Traversal<S, NextParams<T, Union<A>>, A>
  at(
    i: number
  ): IfElse<
    Eq<A, string>,
    Traversal<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Traversal<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  head(): IfElse<
    Eq<A, string>,
    Traversal<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Traversal<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<
    Eq<A, string>,
    Traversal<S, NextParams<T, DisallowTypeChange<string>, true>, string>,
    Traversal<S, NextParams<T, ElemUnion<A>, true>, ElemType<A>>
  >

  // Traversal · Traversal => Traversal
  compose<T2 extends OpticParams, A2>(
    optic: Traversal<A, T2, A2>
  ): Traversal<S, NextComposeParams<T, T2>, A2>
  elems(): Traversal<S, NextParams<T, Elems>, ElemType<A>>
  chars(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >
  words(): RequireString<
    A,
    Traversal<S, NextParams<T, DisallowTypeChange<string>>, string>
  >

  // Traversal · Getter => Fold
  compose<A2>(optic: Getter<A, A2>): Fold<S, A2>
  to<B>(f: (a: A) => B): Fold<S, B>

  // Traversal · AffineFold => Fold
  compose<A2>(optic: AffineFold<A, A2>): Fold<S, A2>

  // Traversal · Fold => Fold
  compose<A2>(optic: Fold<A, A2>): Fold<S, A2>

  // Traversal · Setter => Setter
  compose<T2 extends OpticParams, A2>(
    optic: Setter<A, T2, A2>
  ): Setter<S, NextComposeParams<T, T2>, A2>
  prependTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
  appendTo(): Setter<S, NextParams<T, ElemUnion<A>>, ElemType<A>>
}

export interface Getter<S, A> {
  readonly _tag: 'Getter'

  // Getter · Equivalence => Getter
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Getter<S, A2>

  // Getter · Iso => Getter
  compose<T2 extends OpticParams, A2>(optic: Iso<A, T2, A2>): Getter<S, A2>
  iso<U>(there: (a: A) => U, back: (u: U) => A): Getter<S, U>
  indexed(): Getter<S, [number, ElemType<A>][]>

  // Getter · Lens => Getter
  compose<T2 extends OpticParams, A2>(optic: Lens<A, T2, A2>): Getter<S, A2>
  lens<U>(view: (a: A) => U, update: (a: A, v: U) => A): Getter<S, U>
  prop<K extends keyof A>(key: K): Getter<S, A[K]>
  path<K extends keyof any>(path: K): Getter<S, DottedPath<A, K>>
  path<K extends (keyof any)[]>(...path: K): Getter<S, TuplePath<A, K>>
  nth<N extends number>(n: N): Getter<S, Nth<A, N>>
  pick<K extends keyof A>(keys: K[]): Getter<S, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Getter<S, B[]>
  filter(predicate: (item: ElemType<A>) => boolean): Getter<S, A>
  valueOr<B>(defaultValue: B): Getter<S, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): Getter<S, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Getter<S, B[]>
  reread(read: (value: A) => A): Getter<S, A>
  rewrite(write: (value: A) => A): Getter<S, A>

  // Getter · Prism => AffineFold
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): AffineFold<S, A2>
  optional(): AffineFold<S, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => AffineFold<S, U>
  guard<U extends A>(g: (a: A) => a is U): AffineFold<S, U>
  find(predicate: (item: ElemType<A>) => boolean): AffineFold<S, ElemType<A>>
  when(predicate: (item: A) => boolean): AffineFold<S, A>
  at(
    i: number
  ): IfElse<Eq<A, string>, AffineFold<S, string>, AffineFold<S, ElemType<A>>>
  head(): IfElse<
    Eq<A, string>,
    AffineFold<S, string>,
    AffineFold<S, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<Eq<A, string>, AffineFold<S, string>, AffineFold<S, ElemType<A>>>

  // Getter · Traversal => Fold
  compose<T2 extends OpticParams, A2>(optic: Traversal<A, T2, A2>): Fold<S, A2>
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
  readonly _tag: 'AffineFold'

  // AffineFold · Equivalence => AffineFold
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): AffineFold<S, A2>

  // AffineFold · Iso => AffineFold
  compose<T2 extends OpticParams, A2>(optic: Iso<A, T2, A2>): AffineFold<S, A2>
  iso<U>(there: (a: A) => U, back: (u: U) => A): AffineFold<S, U>
  indexed(): AffineFold<S, [number, ElemType<A>][]>

  // AffineFold · Lens => AffineFold
  compose<T2 extends OpticParams, A2>(optic: Lens<A, T2, A2>): AffineFold<S, A2>
  lens<U>(view: (a: A) => U, update: (a: A, v: U) => A): AffineFold<S, U>
  prop<K extends keyof A>(key: K): AffineFold<S, A[K]>
  path<K extends keyof any>(path: K): AffineFold<S, DottedPath<A, K>>
  path<K extends (keyof any)[]>(...path: K): AffineFold<S, TuplePath<A, K>>
  nth<N extends number>(n: N): AffineFold<S, Nth<A, N>>
  pick<K extends keyof A>(keys: K[]): AffineFold<S, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): AffineFold<S, B[]>
  filter(predicate: (item: ElemType<A>) => boolean): AffineFold<S, A>
  valueOr<B>(defaultValue: B): AffineFold<S, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(
    traversal: Traversal<A, U, B>
  ): AffineFold<S, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): AffineFold<S, B[]>
  reread(read: (value: A) => A): AffineFold<S, A>
  rewrite(write: (value: A) => A): AffineFold<S, A>

  // AffineFold · Prism => AffineFold
  compose<T2 extends OpticParams, A2>(
    optic: Prism<A, T2, A2>
  ): AffineFold<S, A2>
  optional(): AffineFold<S, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => AffineFold<S, U>
  guard<U extends A>(g: (a: A) => a is U): AffineFold<S, U>
  find(predicate: (item: ElemType<A>) => boolean): AffineFold<S, ElemType<A>>
  when(predicate: (item: A) => boolean): AffineFold<S, A>
  at(
    i: number
  ): IfElse<Eq<A, string>, AffineFold<S, string>, AffineFold<S, ElemType<A>>>
  head(): IfElse<
    Eq<A, string>,
    AffineFold<S, string>,
    AffineFold<S, ElemType<A>>
  >
  // Deprecated, use .at()
  index(
    i: number
  ): IfElse<Eq<A, string>, AffineFold<S, string>, AffineFold<S, ElemType<A>>>

  // AffineFold · Traversal => Fold
  compose<T2 extends OpticParams, A2>(optic: Traversal<A, T2, A2>): Fold<S, A2>
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
  readonly _tag: 'Fold'

  // Fold · Equivalence => Fold
  compose<T2 extends OpticParams, A2>(
    optic: Equivalence<A, T2, A2>
  ): Fold<S, A2>

  // Fold · Iso => Fold
  compose<T2 extends OpticParams, A2>(optic: Iso<A, T2, A2>): Fold<S, A2>
  iso<U>(there: (a: A) => U, back: (u: U) => A): Fold<S, U>
  indexed(): Fold<S, [number, ElemType<A>][]>

  // Fold · Lens => Fold
  compose<T2 extends OpticParams, A2>(optic: Lens<A, T2, A2>): Fold<S, A2>
  lens<U>(view: (a: A) => U, update: (a: A, v: U) => A): Fold<S, U>
  prop<K extends keyof A>(key: K): Fold<S, A[K]>
  path<K extends keyof any>(path: K): Fold<S, DottedPath<A, K>>
  path<K extends (keyof any)[]>(...path: K): Fold<S, TuplePath<A, K>>
  nth<N extends number>(n: N): Fold<S, Nth<A, N>>
  pick<K extends keyof A>(keys: K[]): Fold<S, Pick<A, K>>
  filter<B extends ElemType<A>>(
    predicate: (item: ElemType<A>) => item is B
  ): Fold<S, B[]>
  filter(predicate: (item: ElemType<A>) => boolean): Fold<S, A>
  valueOr<B>(defaultValue: B): Fold<S, Exclude<A, undefined> | B>
  partsOf<U extends OpticParams, B>(traversal: Traversal<A, U, B>): Fold<S, B[]>
  partsOf<U extends OpticParams, B>(
    makeTraversal: (o: OpticFor_<A>) => Traversal<A, U, B>
  ): Fold<S, B[]>
  reread(read: (value: A) => A): Fold<S, A>
  rewrite(write: (value: A) => A): Fold<S, A>

  // Fold · Prism => Fold
  compose<T2 extends OpticParams, A2>(optic: Prism<A, T2, A2>): Fold<S, A2>
  optional(): Fold<S, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(g: (a: A) => a is U) => Fold<S, U>
  guard<U extends A>(g: (a: A) => a is U): Fold<S, U>
  find(predicate: (item: ElemType<A>) => boolean): Fold<S, ElemType<A>>
  when(predicate: (item: A) => boolean): Fold<S, A>
  at(i: number): IfElse<Eq<A, string>, Fold<S, string>, Fold<S, ElemType<A>>>
  head(): IfElse<Eq<A, string>, Fold<S, string>, Fold<S, ElemType<A>>>
  // Deprecated, use .at()
  index(i: number): IfElse<Eq<A, string>, Fold<S, string>, Fold<S, ElemType<A>>>

  // Fold · Traversal => Fold
  compose<T2 extends OpticParams, A2>(optic: Traversal<A, T2, A2>): Fold<S, A2>
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

export interface Setter<S, T extends OpticParams, A> {
  readonly _tag: 'Setter'
  readonly _removable: T['_R']
}

// Equivalence · Equivalence => Equivalence
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Equivalence<S, T, A>,
  optic2: Equivalence<A, T2, A2>
): Equivalence<S, NextComposeParams<T, T2>, A2>
// Equivalence · Iso => Iso
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Equivalence<S, T, A>,
  optic2: Iso<A, T2, A2>
): Iso<S, NextComposeParams<T, T2>, A2>
// Equivalence · Lens => Lens
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Equivalence<S, T, A>,
  optic2: Lens<A, T2, A2>
): Lens<S, NextComposeParams<T, T2>, A2>
// Equivalence · Prism => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Equivalence<S, T, A>,
  optic2: Prism<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Equivalence · Traversal => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Equivalence<S, T, A>,
  optic2: Traversal<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Equivalence · Getter => Getter
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Getter<A, A2>
): Getter<S, A2>
// Equivalence · AffineFold => AffineFold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: AffineFold<A, A2>
): AffineFold<S, A2>
// Equivalence · Fold => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Equivalence<S, T, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// Equivalence · Setter => Setter
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Equivalence<S, T, A>,
  optic2: Setter<A, T2, A2>
): Setter<S, NextComposeParams<T, T2>, A2>
// Iso · Equivalence => Iso
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Iso<S, T, A>,
  optic2: Equivalence<A, T2, A2>
): Iso<S, NextComposeParams<T, T2>, A2>
// Iso · Iso => Iso
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Iso<S, T, A>,
  optic2: Iso<A, T2, A2>
): Iso<S, NextComposeParams<T, T2>, A2>
// Iso · Lens => Lens
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Iso<S, T, A>,
  optic2: Lens<A, T2, A2>
): Lens<S, NextComposeParams<T, T2>, A2>
// Iso · Prism => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Iso<S, T, A>,
  optic2: Prism<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Iso · Traversal => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Iso<S, T, A>,
  optic2: Traversal<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Iso · Getter => Getter
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Iso<S, T, A>,
  optic2: Getter<A, A2>
): Getter<S, A2>
// Iso · AffineFold => AffineFold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Iso<S, T, A>,
  optic2: AffineFold<A, A2>
): AffineFold<S, A2>
// Iso · Fold => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Iso<S, T, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// Iso · Setter => Setter
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Iso<S, T, A>,
  optic2: Setter<A, T2, A2>
): Setter<S, NextComposeParams<T, T2>, A2>
// Lens · Equivalence => Lens
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Lens<S, T, A>,
  optic2: Equivalence<A, T2, A2>
): Lens<S, NextComposeParams<T, T2>, A2>
// Lens · Iso => Lens
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Lens<S, T, A>,
  optic2: Iso<A, T2, A2>
): Lens<S, NextComposeParams<T, T2>, A2>
// Lens · Lens => Lens
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Lens<S, T, A>,
  optic2: Lens<A, T2, A2>
): Lens<S, NextComposeParams<T, T2>, A2>
// Lens · Prism => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Lens<S, T, A>,
  optic2: Prism<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Lens · Traversal => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Lens<S, T, A>,
  optic2: Traversal<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Lens · Getter => Getter
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Lens<S, T, A>,
  optic2: Getter<A, A2>
): Getter<S, A2>
// Lens · AffineFold => AffineFold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Lens<S, T, A>,
  optic2: AffineFold<A, A2>
): AffineFold<S, A2>
// Lens · Fold => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Lens<S, T, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// Lens · Setter => Setter
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Lens<S, T, A>,
  optic2: Setter<A, T2, A2>
): Setter<S, NextComposeParams<T, T2>, A2>
// Prism · Equivalence => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Prism<S, T, A>,
  optic2: Equivalence<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Prism · Iso => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Prism<S, T, A>,
  optic2: Iso<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Prism · Lens => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Prism<S, T, A>,
  optic2: Lens<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Prism · Prism => Prism
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Prism<S, T, A>,
  optic2: Prism<A, T2, A2>
): Prism<S, NextComposeParams<T, T2>, A2>
// Prism · Traversal => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Prism<S, T, A>,
  optic2: Traversal<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Prism · Getter => AffineFold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Prism<S, T, A>,
  optic2: Getter<A, A2>
): AffineFold<S, A2>
// Prism · AffineFold => AffineFold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Prism<S, T, A>,
  optic2: AffineFold<A, A2>
): AffineFold<S, A2>
// Prism · Fold => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Prism<S, T, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// Prism · Setter => Setter
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Prism<S, T, A>,
  optic2: Setter<A, T2, A2>
): Setter<S, NextComposeParams<T, T2>, A2>
// Traversal · Equivalence => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Traversal<S, T, A>,
  optic2: Equivalence<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Traversal · Iso => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Traversal<S, T, A>,
  optic2: Iso<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Traversal · Lens => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Traversal<S, T, A>,
  optic2: Lens<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Traversal · Prism => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Traversal<S, T, A>,
  optic2: Prism<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Traversal · Traversal => Traversal
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Traversal<S, T, A>,
  optic2: Traversal<A, T2, A2>
): Traversal<S, NextComposeParams<T, T2>, A2>
// Traversal · Getter => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Getter<A, A2>
): Fold<S, A2>
// Traversal · AffineFold => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Traversal<S, T, A>,
  optic2: AffineFold<A, A2>
): Fold<S, A2>
// Traversal · Fold => Fold
export function compose<S, T extends OpticParams, A, A2>(
  optic1: Traversal<S, T, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// Traversal · Setter => Setter
export function compose<
  S,
  T extends OpticParams,
  A,
  T2 extends OpticParams,
  A2
>(
  optic1: Traversal<S, T, A>,
  optic2: Setter<A, T2, A2>
): Setter<S, NextComposeParams<T, T2>, A2>
// Getter · Equivalence => Getter
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Getter<S, A>,
  optic2: Equivalence<A, T2, A2>
): Getter<S, A2>
// Getter · Iso => Getter
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Getter<S, A>,
  optic2: Iso<A, T2, A2>
): Getter<S, A2>
// Getter · Lens => Getter
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Getter<S, A>,
  optic2: Lens<A, T2, A2>
): Getter<S, A2>
// Getter · Prism => AffineFold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Getter<S, A>,
  optic2: Prism<A, T2, A2>
): AffineFold<S, A2>
// Getter · Traversal => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Getter<S, A>,
  optic2: Traversal<A, T2, A2>
): Fold<S, A2>
// Getter · Getter => Getter
export function compose<S, A, A2>(
  optic1: Getter<S, A>,
  optic2: Getter<A, A2>
): Getter<S, A2>
// Getter · AffineFold => AffineFold
export function compose<S, A, A2>(
  optic1: Getter<S, A>,
  optic2: AffineFold<A, A2>
): AffineFold<S, A2>
// Getter · Fold => Fold
export function compose<S, A, A2>(
  optic1: Getter<S, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// AffineFold · Equivalence => AffineFold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: AffineFold<S, A>,
  optic2: Equivalence<A, T2, A2>
): AffineFold<S, A2>
// AffineFold · Iso => AffineFold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: AffineFold<S, A>,
  optic2: Iso<A, T2, A2>
): AffineFold<S, A2>
// AffineFold · Lens => AffineFold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: AffineFold<S, A>,
  optic2: Lens<A, T2, A2>
): AffineFold<S, A2>
// AffineFold · Prism => AffineFold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: AffineFold<S, A>,
  optic2: Prism<A, T2, A2>
): AffineFold<S, A2>
// AffineFold · Traversal => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: AffineFold<S, A>,
  optic2: Traversal<A, T2, A2>
): Fold<S, A2>
// AffineFold · Getter => AffineFold
export function compose<S, A, A2>(
  optic1: AffineFold<S, A>,
  optic2: Getter<A, A2>
): AffineFold<S, A2>
// AffineFold · AffineFold => AffineFold
export function compose<S, A, A2>(
  optic1: AffineFold<S, A>,
  optic2: AffineFold<A, A2>
): AffineFold<S, A2>
// AffineFold · Fold => Fold
export function compose<S, A, A2>(
  optic1: AffineFold<S, A>,
  optic2: Fold<A, A2>
): Fold<S, A2>
// Fold · Equivalence => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Fold<S, A>,
  optic2: Equivalence<A, T2, A2>
): Fold<S, A2>
// Fold · Iso => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Fold<S, A>,
  optic2: Iso<A, T2, A2>
): Fold<S, A2>
// Fold · Lens => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Fold<S, A>,
  optic2: Lens<A, T2, A2>
): Fold<S, A2>
// Fold · Prism => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Fold<S, A>,
  optic2: Prism<A, T2, A2>
): Fold<S, A2>
// Fold · Traversal => Fold
export function compose<S, A, T2 extends OpticParams, A2>(
  optic1: Fold<S, A>,
  optic2: Traversal<A, T2, A2>
): Fold<S, A2>
// Fold · Getter => Fold
export function compose<S, A, A2>(
  optic1: Fold<S, A>,
  optic2: Getter<A, A2>
): Fold<S, A2>
// Fold · AffineFold => Fold
export function compose<S, A, A2>(
  optic1: Fold<S, A>,
  optic2: AffineFold<A, A2>
): Fold<S, A2>
// Fold · Fold => Fold
export function compose<S, A, A2>(
  optic1: Fold<S, A>,
  optic2: Fold<A, A2>
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
  return (source) => I.get((optic as any)._ref, source)
}

export function preview<S, A>(
  optic: Prism<S, any, A> | Traversal<S, any, A> | AffineFold<S, A> | Fold<S, A>
): (source: S) => A | undefined {
  return (source) => I.preview((optic as any)._ref, source)
}

export function collect<S, A>(
  optic: Prism<S, any, A> | Traversal<S, any, A> | Fold<S, A>
): (source: S) => A[] {
  return (source) => I.collect((optic as any)._ref, source)
}

export function modify<S, T extends OpticParams, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
): <B>(f: (a: A) => B) => (source: S) => Simplify<S, Apply<T['_T'], B>> {
  return (f) => (source) => I.modify((optic as any)._ref, f, source)
}

export function set<S, T extends OpticParams, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
    | Setter<S, T, A>
): <B>(value: B) => (source: S) => Simplify<S, Apply<T['_T'], B>> {
  return (value) => (source) => I.set((optic as any)._ref, value, source)
}

export function remove<S>(
  optic: Prism<S, Params<any, true>, any> | Traversal<S, Params<any, true>, any>
): (source: S) => S {
  return (source) => I.remove((optic as any)._ref, source)
}

export { pipe } from './standalone/pipe.js'
