import type { Optic, OpticError, TryT, B, S, T } from './optic.js'
import * as I from '../internals.js'

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface PrependToT extends T {
  0: TryT<
    this,
    S<this> extends (infer Item)[] ? (Item | B<this>)[] : ArrayExpected<S<this>>
  >
}

export type PrependTo = Optic<'Setter', never, PrependToT>

export const prependTo: PrependTo = I.prependTo as any
