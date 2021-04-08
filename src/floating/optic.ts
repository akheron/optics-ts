import type { HKT, HKT2 } from '../hkt'

export type Class =
  | 'Equivalence'
  | 'Iso'
  | 'Lens'
  | 'Prism'
  | 'Traversal'
  | 'Getter'
  | 'AffineFold'
  | 'Fold'
  | 'Setter'

export type A = HKT
export type T = HKT2
export type S<F extends HKT> = F[1]
export type B<F extends HKT2> = F[2]

export type Removable = true | undefined

export interface Optic<
  C extends Class,
  A extends HKT,
  T extends HKT2,
  R extends Removable = undefined
> {
  readonly _C: C
  readonly _A: A
  readonly _T: T
  readonly _R: R
}

export interface OpticError {
  readonly __error: unique symbol
}

export type Try<P, U> = P extends OpticError ? P : U
export type Try2<P1, P2, U> = P1 extends OpticError
  ? P1
  : P2 extends OpticError
  ? P2
  : U
export type TryA<P extends A, U> = Try<S<P>, U>
export type TryT<P extends T, U> = Try2<S<P>, B<P>, U>
