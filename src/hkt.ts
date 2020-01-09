import { ElemType, Eq } from './utils'

export interface HKT {
  0: unknown
  1: unknown
}

export type Apply<F extends HKT, A> = (F & { 1: A })[0]

export interface Compose<F extends HKT, G extends HKT> extends HKT {
  0: Apply<F, Apply<G, this[1]>>
}

export interface Id extends HKT {
  0: this[1]
}

export interface Const<A> extends HKT {
  0: A
}

export interface Optional extends HKT {
  0: this[1] | undefined
}

export interface Union<A> extends HKT {
  0: A | this[1]
}

export interface Elems extends HKT {
  0: Array<this[1]>
}

export interface ElemUnion<A> extends HKT {
  0: Array<ElemType<A> | this[1]>
}

export interface Prop<S, K extends keyof S> extends HKT {
  0: Omit<S, K> & { [KK in K]: this[1] }
}

export interface Path2<S, K1 extends keyof S, K2 extends keyof S[K1]>
  extends HKT {
  0: Apply<Prop<S, K1>, Omit<S[K1], K2> & { [KK in K2]: this[1] }>
}

export interface Path3<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2]
> extends HKT {
  0: Apply<Path2<S, K1, K2>, Omit<S[K1][K2], K3> & { [KK in K3]: this[1] }>
}

export interface Path4<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3]
> extends HKT {
  0: Apply<
    Path3<S, K1, K2, K3>,
    Omit<S[K1][K2][K3], K4> & { [KK in K4]: this[1] }
  >
}

export interface Path5<
  S,
  K1 extends keyof S,
  K2 extends keyof S[K1],
  K3 extends keyof S[K1][K2],
  K4 extends keyof S[K1][K2][K3],
  K5 extends keyof S[K1][K2][K3][K4]
> extends HKT {
  0: Apply<
    Path4<S, K1, K2, K3, K4>,
    Omit<S[K1][K2][K3][K4], K5> & { [KK in K5]: this[1] }
  >
}

export interface Plant<S, K extends keyof S> extends HKT {
  0: Omit<S, K> & { [KK in keyof this[1]]: this[1][KK] }
}

interface DisallowedTypeChange {
  readonly _: unique symbol
}

export interface Choice<A, T extends A> extends HKT {
  0: Eq<T, this[1]> extends true ? A : DisallowedTypeChange
}

export interface Adapt<A, T> extends HKT {
  0: Eq<T, this[1]> extends true ? A : DisallowedTypeChange
}

export interface DisallowTypeChange<T> extends HKT {
  0: this[1] extends T ? T : DisallowedTypeChange
}
