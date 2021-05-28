import type { Optic, OpticError, TryT, B, S, T } from './optic.js'
import * as I from '../internals.js'

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface AppendToT extends T {
  0: TryT<
    this,
    S<this> extends (infer Item)[] ? (Item | B<this>)[] : ArrayExpected<S<this>>
  >
}

export type AppendTo = Optic<'Setter', never, AppendToT>

export const appendTo: AppendTo = I.appendTo as any
