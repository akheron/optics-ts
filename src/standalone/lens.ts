import type { Optic, TryA, TryT, A, B, S, T } from './optic.js'
import type { Expected } from './errors.js'
import * as I from '../internals.js'
import { Eq } from '../utils.js'

interface LensA<From, To> extends A {
  0: TryA<this, S<this> extends From ? To : Expected<From, S<this>>>
}
interface LensT<From, To> extends T {
  0: TryT<
    this,
    S<this> extends From
      ? Eq<To, B<this>> extends true
        ? From
        : Expected<To, B<this>>
      : Expected<From, S<this>>
  >
}

export type Lens<From, To> = Optic<'Lens', LensA<From, To>, LensT<From, To>>

export const lens: <From, To>(
  view: (v: From) => To,
  update: (v: From, u: To) => From
) => Lens<From, To> = (view, update) =>
  I.lens(view, ([u, v]) => update(v, u)) as any
