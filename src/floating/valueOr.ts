import type { Optic, A, B, S, T, TryA, TryT } from './optic.js'
import * as I from '../internals.js'

interface ValueOrA<N> extends A {
  0: TryA<this, Exclude<S<this>, undefined> | N>
}
interface ValueOrT extends T {
  0: TryT<this, B<this>>
}
export const valueOr: <B>(b: B) => Optic<'Lens', ValueOrA<B>, ValueOrT> =
  I.valueOr as any
