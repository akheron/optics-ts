import type { Optic, OpticError, TryA, TryT, A, B, S, T } from './optic.js'
import * as I from '../internals.js'
import { Eq } from '../utils.js'

export interface Expected<T, U> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
  readonly _u: U
}

interface IsoA<From, To> extends A {
  0: TryA<this, S<this> extends From ? To : Expected<From, S<this>>>
}
interface IsoT<From, To> extends T {
  0: TryT<
    this,
    S<this> extends From
      ? Eq<To, B<this>> extends true
        ? From
        : Expected<To, B<this>>
      : Expected<From, S<this>>
  >
}

export type Iso<From, To> = Optic<'Iso', IsoA<From, To>, IsoT<From, To>>

export const iso: <From, To>(
  there: (a: From) => To,
  back: (a: To) => From
) => Iso<From, To> = I.iso as any
