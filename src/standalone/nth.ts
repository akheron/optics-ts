import type { Optic, TryA, TryT, A, B, S, T } from './optic.js'
import type { TupleExpected } from './errors.js'
import * as I from '../internals.js'

export type Prec<N> = N extends 6
  ? 5
  : N extends 5
  ? 4
  : N extends 4
  ? 3
  : N extends 3
  ? 2
  : N extends 2
  ? 1
  : N extends 1
  ? 0
  : never

export type AnyTuple<N extends number, Acc extends any[] = []> = N extends 0
  ? Acc
  : AnyTuple<Prec<N>, [...Acc, any]>

interface NthA<N extends number> extends A {
  0: TryA<
    this,
    S<this> extends [...AnyTuple<N>, infer Elem, ...any[]]
      ? Elem
      : TupleExpected<N, S<this>>
  >
}

type SetNthRec<N extends number, B, S> = N extends 0
  ? S extends [any, ...infer U]
    ? [B, ...U]
    : never
  : S extends [infer U, ...infer V]
  ? [U, ...SetNthRec<Prec<N>, B, V>]
  : never

interface NthT<N extends number> extends T {
  0: TryT<
    this,
    S<this> extends [...AnyTuple<N>, any, ...any[]]
      ? SetNthRec<N, B<this>, S<this>>
      : TupleExpected<N, S<this>>
  >
}

export type Nth<N extends number> = Optic<'Lens', NthA<N>, NthT<N>>

export const nth: <N extends number>(n: N) => Nth<N> = I.nth as any
