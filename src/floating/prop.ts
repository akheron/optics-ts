import type { Optic, TryA, TryT, A, B, S, T } from './optic.js'
import type { NoSuchProperty } from './errors.js'
import * as I from '../internals.js'

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
