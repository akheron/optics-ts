import type { Optic, S, T, A, B, TryA, TryT } from './optic.js'
import type { ArrayExpected } from './errors.js'
import * as I from '../internals.js'

interface ElemsA extends A {
  0: TryA<this, S<this> extends (infer Item)[] ? Item : ArrayExpected<S<this>>>
}
interface ElemsT extends T {
  0: TryT<this, S<this> extends any[] ? B<this>[] : ArrayExpected<S<this>>>
}
export const elems: Optic<'Traversal', ElemsA, ElemsT> = I.elems as any
