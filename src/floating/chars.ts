import type { Optic, OpticError, TryA, TryT, A, B, S, T } from './optic.js'
import * as I from '../internals.js'

export interface StringExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface CharsA extends A {
  0: TryA<this, S<this> extends string ? string : StringExpected<S<this>>>
}
interface CharsT extends T {
  0: TryT<
    this,
    S<this> extends string
      ? B<this> extends string
        ? string
        : StringExpected<B<this>>
      : StringExpected<S<this>>
  >
}

export const chars: Optic<'Traversal', CharsA, CharsT> = I.chars as any
