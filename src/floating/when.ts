import type { Optic, A, B, S, T, TryA, TryT, OpticError } from './optic.js'
import * as I from '../internals'

export interface Expected<T, U> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
  readonly _u: U
}

// when(predicate: (item: A) => boolean): Prism<S, NextParams<T, Union<A>>, A>

interface WhenA<Value> extends A {
  0: TryA<this, S<this> extends Value ? Value : Expected<Value, S<this>>>
}

interface WhenT<Value> extends T {
  0: TryT<
    this,
    S<this> extends Value ? Value | B<this> : Expected<Value, S<this>>
  >
}

export const when: <Value>(
  predicate: (value: Value) => boolean
) => Optic<'Prism', WhenA<Value>, WhenT<Value>> = I.when as any
