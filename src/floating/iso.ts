import type { Optic, OpticError, TryA, TryT, A, B, T } from './optic'
import * as I from '../internals'
import { Eq } from '../utils'

export interface DisallowedTypeChange<Expected, Got> extends OpticError {
  readonly _: unique symbol
  readonly _e: Expected
  readonly _g: Got
}

interface IsoA<To> extends A {
  0: TryA<this, To>
}
interface IsoT<From, To> extends T {
  0: TryT<
    this,
    Eq<To, B<this>> extends true ? From : DisallowedTypeChange<To, B<this>>
  >
}

export type Iso<From, To> = Optic<'Iso', IsoA<To>, IsoT<From, To>>

export const iso: <From, To>(
  there: (a: From) => To,
  back: (a: To) => From
) => Iso<From, To> = I.iso as any
