import type { Optic, TryA, TryT, A, B, S, T } from './optic.js'
import * as I from '../internals.js'

interface EqA extends A {
  0: TryA<this, S<this>>
}
interface EqT extends T {
  0: TryT<this, B<this>>
}

export type Eq = Optic<'Equivalence', EqA, EqT>

export const eq: Eq = I.eq as any
