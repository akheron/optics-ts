import type { Optic, OpticError, TryA, A, S } from './optic.js'
import * as I from '../internals.js'

export interface Expected<T, U> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
  readonly _u: U
}

interface ToA<From, To> extends A {
  0: TryA<this, S<this> extends From ? To : Expected<From, S<this>>>
}

export type To<From, To> = Optic<'Getter', ToA<From, To>, never>

export const to: <T, U>(f: (a: T) => U) => To<T, U> = I.to as any
