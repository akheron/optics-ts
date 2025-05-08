import type { Optic, A, B, S, T, TryA, TryT } from './optic.js'
import type { InvalidOmit } from './errors.js'
import type { Unnaked } from '../utils.js'
import * as I from '../internals.js'

interface OmitA<K extends string> extends A {
  // Unnaked<K> is used to work around distributive conditional types
  // hitting in here.
  //
  // The conditional:
  //
  //   K extends keyof S<this> ? Omit<S<this>, K> : never
  //
  // would be resolved to:
  //
  //   Omit<S<this>, K1> | Omit<S<this>, K2> | ...
  //
  // By using non-naked type parameter Unnaked<K>, we get it to resolve
  // correctly to:
  //
  //   Omit<S<this>, K>
  //
  0: TryA<
    this,
    Unnaked<K> extends keyof S<this>
      ? Omit<S<this>, Unnaked<K>>
      : InvalidOmit<K, S<this>>
  >
}
interface OmitT<K extends string> extends T {
  0: TryT<this, Omit<S<this>, K> & { [KK in keyof B<this>]: B<this>[KK] }>
}

export function omit(): Optic<'Lens', OmitA<never>, OmitT<never>>
export function omit<K extends string>(
  ...keys: K[]
): Optic<'Lens', OmitA<K>, OmitT<K>>
export function omit(...args: any): any {
  return I.omit(args)
}
