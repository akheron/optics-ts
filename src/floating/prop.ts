import type { Optic, OpticError, TryA, TryT, A, B, S, T } from './optic.js'
import * as I from '../internals.js'

export interface NoSuchProperty<K extends string, A> extends OpticError {
  readonly _: unique symbol
  readonly _k: K
  readonly _a: A
}

interface PropA<K extends string> extends A {
  0: TryA<
    this,
    K extends keyof S<this> ? S<this>[K] : NoSuchProperty<K, S<this>>
  >
}
interface PropT<K extends string> extends T {
  0: TryT<
    this,
    K extends keyof S<this>
      ? Omit<S<this>, K> & { [KK in K]: B<this> }
      : NoSuchProperty<K, B<this>>
  >
}

export type Prop<K extends string> = Optic<'Lens', PropA<K>, PropT<K>>

export const prop: <K extends string>(key: K) => Prop<K> = I.prop as any
