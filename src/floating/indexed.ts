import type { Optic, OpticError, TryA, TryT, A, B, S, T } from './optic.js'
import * as I from '../internals.js'

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface ArrayOfIndexValuePairsExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface IndexedA extends A {
  0: TryA<
    this,
    S<this> extends (infer Elem)[] ? [number, Elem][] : ArrayExpected<S<this>>
  >
}
interface IndexedT extends T {
  0: TryT<
    this,
    B<this> extends [number, infer Elem][]
      ? Elem[]
      : ArrayOfIndexValuePairsExpected<B<this>>
  >
}

export type Indexed = Optic<'Iso', IndexedA, IndexedT>

export const indexed: Indexed = I.indexed as any
