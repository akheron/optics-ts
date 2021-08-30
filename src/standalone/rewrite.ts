import type { Optic, TryA, TryT, A, B, S, T } from './optic.js'
import type { Expected } from './errors.js'
import * as I from '../internals.js'
import { Eq } from '../utils.js'

interface RewriteA<Focus> extends A {
  0: TryA<
    this,
    Eq<S<this>, Focus> extends true ? Focus : Expected<Focus, S<this>>
  >
}
interface RewriteT<Focus> extends T {
  0: TryT<
    this,
    Eq<S<this>, Focus> extends true
      ? Eq<B<this>, Focus> extends true
        ? Focus
        : Expected<Focus, B<this>>
      : Expected<Focus, S<this>>
  >
}

export const rewrite: <Focus>(
  read: (value: Focus) => Focus
) => Optic<'Lens', RewriteA<Focus>, RewriteT<Focus>> = I.rewrite as any
