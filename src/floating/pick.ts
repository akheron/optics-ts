import type { Optic, OpticError, A, B, S, T, TryA, TryT } from './optic'
import type { Unnaked } from '../utils'
import * as I from '../internals'

export interface InvalidPick<K, A> extends OpticError {
  readonly _: unique symbol
  readonly _k: K
  readonly _a: A
}

interface PickA<K extends string> extends A {
  // Unnaked<K> is used to work around distributive conditional types
  // hitting in here.
  //
  // The conditional:
  //
  //   K extends keyof S<this> ? Pick<S<this>, K> : never
  //
  // would be resolved to:
  //
  //   Pick<S<this>, K1> | Pick<S<this>, K2> | ...
  //
  // By using non-naked type parameter Unnaked<K>, we get it to resolve
  // correctly to:
  //
  //   Pick<S<this>, K>
  //
  0: TryA<
    this,
    Unnaked<K> extends keyof S<this>
      ? Pick<S<this>, Unnaked<K>>
      : InvalidPick<K, S<this>>
  >
}
interface PickT<K extends string> extends T {
  0: TryT<this, Omit<S<this>, K> & { [KK in keyof B<this>]: B<this>[KK] }>
}
export const pick: <K extends string>(
  ...keys: K[]
) => Optic<'Lens', PickA<K>, PickT<K>> = (...args: string[]): any =>
  I.pick(args)
