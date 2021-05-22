import type { Optic, OpticError, TryA, TryT, A, B, S, T, Try } from './optic.js'
import * as I from '../internals.js'
import { Apply, Apply2 } from '../hkt.js'

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface PartsOfA<Traversal extends Optic<'Traversal', any, any>> extends A {
  0: TryA<
    this,
    Traversal extends Optic<'Traversal', infer TA, any>
      ? Apply<TA, S<this>> extends infer R
        ? Try<R, R[]>
        : never
      : never
  >
}
interface PartsOfT<Traversal extends Optic<'Traversal', any, any>> extends T {
  0: TryT<
    this,
    Traversal extends Optic<'Traversal', any, infer TT>
      ? B<this> extends (infer Item)[]
        ? Apply2<TT, S<this>, Item>
        : ArrayExpected<B<this>>
      : never
  >
}

export const partsOf: <Traversal extends Optic<'Traversal', any, any>>(
  traversal: Traversal
) => Optic<'Lens', PartsOfA<Traversal>, PartsOfT<Traversal>> = I.partsOf as any
