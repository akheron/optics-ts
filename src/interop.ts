import type { Optic, Try, Try2 } from './standalone/optic.js'
import type { Apply, Apply2, HKT, HKT2 } from './hkt.js'
import type { Simplify } from './utils.js'
import type {
  Equivalence,
  Iso,
  Lens,
  Prism,
  Traversal,
  Getter,
  AffineFold,
  Fold,
  Setter,
  Params,
  OpticParams,
} from './index.js'
import * as I from './internals.js'

function toOptic(optic: any) {
  if (Object.prototype.hasOwnProperty.call(optic, '_ref')) return optic._ref
  return optic
}

export function get<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Getter',
  A extends HKT,
  S
>(optic: Optic<C, A, any, any>, source: S): Apply<A, S>
export function get<S, A>(
  optic:
    | Equivalence<S, any, A>
    | Iso<S, any, A>
    | Lens<S, any, A>
    | Getter<S, A>,
  source: S
): A
export function get(optic: any, source: any): any {
  return I.get(toOptic(optic), source)
}

type Preview<A extends HKT, S> = Apply<A, S> extends infer AU
  ? Try<AU, AU | undefined>
  : never

export function preview<
  C extends 'Prism' | 'Traversal' | 'AffineFold' | 'Fold',
  A extends HKT,
  S
>(optic: Optic<C, A, any, any>, source: S): Preview<A, S>
export function preview<S, A>(
  optic:
    | Prism<S, any, A>
    | Traversal<S, any, A>
    | AffineFold<S, A>
    | Fold<S, A>,
  source: S
): A | undefined
export function preview(optic: any, source: any): any {
  return I.preview(toOptic(optic), source)
}

type Collect<A extends HKT, S> = Apply<A, S> extends infer AU
  ? Try<AU, AU[]>
  : never

export function collect<
  C extends 'Prism' | 'Traversal' | 'Fold',
  A extends HKT,
  S
>(optic: Optic<C, A, any, any>, source: S): Collect<A, S>
export function collect<S, A>(
  optic: Prism<S, any, A> | Traversal<S, any, A> | Fold<S, A>,
  source: S
): A[]
export function collect(optic: any, source: any): any {
  return I.collect(toOptic(optic), source)
}

type Modify<A extends HKT, B, S, T extends HKT2> = Apply<A, S> extends infer AU
  ? Apply2<T, S, B> extends infer TU
    ? Try2<AU, TU, Simplify<S, TU>>
    : never
  : never

export function modify<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal',
  A extends HKT,
  B,
  S,
  T extends HKT2
>(
  optic: Optic<C, A, T, any>,
  f: (a: Apply<A, S>) => B,
  source: S
): Modify<A, B, S, T>
export function modify<S, T extends OpticParams, A, B>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>,
  f: (a: A) => B,
  source: S
): Simplify<S, Apply<T['_T'], B>>
export function modify(optic: any, f: any, source: any): any {
  return I.modify(toOptic(optic), f, source)
}

type Set<B, S, T extends HKT2> = Apply2<T, S, B> extends infer TU
  ? Try<TU, Simplify<S, TU>>
  : never

export function set<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal' | 'Setter',
  T extends HKT2,
  B,
  S
>(optic: Optic<C, any, T, any>, value: B, source: S): Set<B, S, T>
export function set<S, T extends OpticParams, A, B>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
    | Setter<S, T, A>,
  value: B,
  source: S
): Simplify<S, Apply<T['_T'], B>>
export function set(optic: any, value: any, source: any): any {
  return I.set(toOptic(optic), value, source)
}

export function remove<C extends 'Prism' | 'Traversal', S>(
  optic: Optic<C, any, any, true>,
  source: S
): S
export function remove<S>(
  optic:
    | Prism<S, Params<any, true>, any>
    | Traversal<S, Params<any, true>, any>,
  source: S
): S
export function remove(optic: any, source: any): any {
  return I.remove(toOptic(optic), source)
}
