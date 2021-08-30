import type { Optic, TryA, TryT, A, B, S, T } from './optic.js'
import type { Expected } from './errors.js'
import type { Eq } from '../utils.js'
import * as I from '../internals.js'
import { Apply, HKT } from '../hkt.js'

interface GuardA<ValueType, SubType extends ValueType> extends A {
  0: TryA<
    this,
    S<this> extends ValueType ? SubType : Expected<ValueType, S<this>>
  >
}
interface GuardMonoT<ValueType, SubType extends ValueType> extends T {
  0: TryT<
    this,
    S<this> extends ValueType
      ? Eq<B<this>, SubType> extends true
        ? ValueType
        : Expected<SubType, B<this>>
      : Expected<ValueType, S<this>>
  >
}
interface GuardPolyT<F extends HKT, ValueType> extends T {
  0: TryT<
    this,
    S<this> extends ValueType ? Apply<F, B<this>> : Expected<ValueType, S<this>>
  >
}

export function guard<F extends HKT>(): <ValueType, SubType extends ValueType>(
  g: (value: ValueType) => value is SubType
) => Optic<'Prism', GuardA<ValueType, SubType>, GuardPolyT<F, ValueType>>
export function guard<ValueType, SubType extends ValueType>(
  g: (value: ValueType) => value is SubType
): Optic<'Prism', GuardA<ValueType, SubType>, GuardMonoT<ValueType, SubType>>
export function guard(arg?: any) {
  if (arg === undefined) return I.guard as any
  else return I.guard(arg) as any
}
