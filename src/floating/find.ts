import type { Optic, A, B, S, T, TryA, TryT } from './optic.js'
import type { Expected } from './errors.js'
import * as I from '../internals.js'

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
