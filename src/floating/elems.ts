import type { Optic, S, T, A, B, TryA, TryT, OpticError } from './optic.js'
import * as I from '../internals.js'

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface ElemsA extends A {
  0: TryA<this, S<this> extends (infer Item)[] ? Item : ArrayExpected<S<this>>>
}
interface ElemsT extends T {
  0: TryT<this, S<this> extends any[] ? B<this>[] : ArrayExpected<S<this>>>
}
export const elems: Optic<'Traversal', ElemsA, ElemsT> = I.elems as any
