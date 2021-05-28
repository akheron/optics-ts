import type { Optic, Try, Try2 } from './optic.js'
import type { InvalidModifyFn } from './errors.js'
import type { Apply, Apply2, HKT, HKT2 } from '../hkt.js'
import type { Eq, Simplify } from '../utils.js'
import * as I from '../internals.js'

export function get<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Getter',
  A extends HKT,
  S
>(optic: Optic<C, A, any, any>, source: S): Apply<A, S>
export function get<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Getter',
  A extends HKT
>(optic: Optic<C, A, any, any>): <S>(source: S) => Apply<A, S>
export function get(...args: any[]): any {
  switch (args.length) {
    case 1:
      return (source: any) => I.get(args[0], source)
    case 2:
      return I.get(args[0], args[1])
  }
}

type Preview<A extends HKT, S> = Apply<A, S> extends infer AU
  ? Try<AU, AU | undefined>
  : never

export function preview<
  C extends 'Prism' | 'Traversal' | 'AffineFold' | 'Fold',
  A extends HKT,
  S
>(optic: Optic<C, A, any, any>, source: S): Preview<A, S>
export function preview<
  C extends 'Prism' | 'Traversal' | 'AffineFold' | 'Fold',
  A extends HKT
>(optic: Optic<C, A, any, any>): <S>(source: S) => Preview<A, S>
export function preview(...args: any[]): any {
  switch (args.length) {
    case 1:
      return (source: any) => I.preview(args[0], source)
    case 2:
      return I.preview(args[0], args[1])
  }
}

type Collect<A extends HKT, S> = Apply<A, S> extends infer AU
  ? Try<AU, AU[]>
  : never

export function collect<
  C extends 'Prism' | 'Traversal' | 'Fold',
  A extends HKT,
  S
>(optic: Optic<C, A, any, any>, source: S): Collect<A, S>
export function collect<
  C extends 'Prism' | 'Traversal' | 'Fold',
  A extends HKT
>(optic: Optic<C, A, any, any>): <S>(source: S) => Collect<A, S>
export function collect(...args: any[]): any {
  switch (args.length) {
    case 1:
      return (source: any) => I.collect(args[0], source)
    case 2:
      return I.collect(args[0], args[1])
  }
}

type Modify<A extends HKT, B, S, T extends HKT2> = Apply<A, S> extends infer AU
  ? Apply2<T, S, B> extends infer TU
    ? Try2<AU, TU, Simplify<S, TU>>
    : never
  : never

type ModifyPartial<A extends HKT, A2, B, S, T extends HKT2> = Apply<
  A,
  S
> extends infer AU
  ? Apply2<T, S, B> extends infer TU
    ? Try2<
        AU,
        TU,
        Eq<AU, A2> extends true ? Simplify<S, TU> : InvalidModifyFn<AU, A2>
      >
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
export function modify<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal',
  A extends HKT,
  B,
  T extends HKT2,
  Ac
>(
  optic: Optic<C, A, T, any>,
  f: (a: Ac) => B
): <S>(source: S) => ModifyPartial<A, Ac, B, S, T>
export function modify<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal',
  A extends HKT,
  T extends HKT2
>(
  optic: Optic<C, A, T, any>
): <Ac, B>(f: (a: Ac) => B) => <S>(source: S) => ModifyPartial<A, Ac, B, S, T>
export function modify(...args: any[]): any {
  switch (args.length) {
    case 1:
      return (f: any) => (source: any) => I.modify(args[0], f, source)
    case 2:
      return (source: any) => I.modify(args[0], args[1], source)
    case 3:
      return I.modify(args[0], args[1], args[2])
  }
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
export function set<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal' | 'Setter',
  T extends HKT2,
  B
>(optic: Optic<C, any, T, any>, value: B): <S>(source: S) => Set<B, S, T>
export function set<
  C extends 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal' | 'Setter',
  T extends HKT2
>(optic: Optic<C, any, T, any>): <B>(value: B) => <S>(source: S) => Set<B, S, T>
export function set(...args: any[]): any {
  switch (args.length) {
    case 1:
      return (value: any) => (source: any) => I.set(args[0], value, source)
    case 2:
      return (source: any) => I.set(args[0], args[1], source)
    case 3:
      return I.set(args[0], args[1], args[2])
  }
}

export function remove<C extends 'Prism' | 'Traversal', S>(
  optic: Optic<C, any, any, true>,
  source: S
): S
export function remove<C extends 'Prism' | 'Traversal'>(
  optic: Optic<C, any, any, true>
): <S>(source: S) => S
export function remove(...args: any[]): any {
  switch (args.length) {
    case 1:
      return (source: any) => I.remove(args[0], source)
    case 2:
      return I.remove(args[0], args[1])
  }
}
