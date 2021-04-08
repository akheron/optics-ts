import type { Optic, A, B, S, T, TryA, TryT, OpticError } from './optic'
import type { Eq } from '../utils'
import * as I from '../internals'

export interface ArrayOrStringExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface StringExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface AtA extends A {
  0: TryA<
    this,
    S<this> extends string
      ? string
      : S<this> extends (infer Item)[]
      ? Item
      : ArrayOrStringExpected<S<this>>
  >
}
interface AtT extends T {
  0: TryT<
    this,
    S<this> extends string
      ? Eq<B<this>, string> extends true
        ? string
        : StringExpected<B<this>>
      : S<this> extends (infer Item)[]
      ? (Item | B<this>)[]
      : ArrayOrStringExpected<S<this>>
  >
}

export type At = Optic<'Prism', AtA, AtT, true>

export const at: (i: number) => At = I.at as any
