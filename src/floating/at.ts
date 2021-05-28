import type { Optic, A, B, S, T, TryA, TryT } from './optic.js'
import type { ArrayOrStringExpected, StringExpected } from './errors.js'
import type { Eq } from '../utils.js'
import * as I from '../internals.js'

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
