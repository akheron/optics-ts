import type { Optic, A, B, S, T, TryA, TryT, OpticError } from './optic.js'
import * as I from '../internals'

export interface Expected<T, U> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
  readonly _u: U
}

interface FindA<Elem> extends A {
  0: TryA<this, S<this> extends Elem[] ? Elem : Expected<Elem[], S<this>>>
}
interface FindT<Elem> extends T {
  0: TryT<
    this,
    S<this> extends Elem[] ? (Elem | B<this>)[] : Expected<Elem[], S<this>>
  >
}

export const find: <Elem>(
  predicate: (elem: Elem) => boolean
) => Optic<'Prism', FindA<Elem>, FindT<Elem>, true> = I.find as any
