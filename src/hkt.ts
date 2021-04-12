import { ElemType, Eq, Prec } from './utils'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ExpectedIndexedArray<_T> {
  readonly _: unique symbol
}

export interface Index extends HKT {
  0: this[1] extends [number, infer T][] ? T[] : ExpectedIndexedArray<this[1]>
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

export interface Entries extends HKT {
  0: [this[1]] extends [[infer K, infer V]]
    ? [K] extends [string | number | symbol]
      ? Record<K, V>
      : never
    : never
}

export interface Keys<S> extends HKT {
  0: [this[1]] extends [string | number | symbol]
    ? S extends Record<any, infer V>
      ? Record<this[1], V>
      : never
    : never
}

export interface Values<S> extends HKT {
  0: S extends Record<infer K, any> ? Record<K, this[1]> : never
}

export interface Prop<S, K extends keyof S> extends HKT {
  0: Omit<S, K> & { [KK in K]: this[1] }
}

export type SetTuplePath<S, K> = K extends []
  ? Id
  : K extends [infer K, ...infer R]
  ? K extends keyof S
    ? Compose<Prop<S, K>, SetTuplePath<S[K], R>>
    : never
  : never

export type SetDottedPath<S, K> = K extends `${infer P}.${infer R}`
  ? P extends keyof S
    ? Compose<Prop<S, P>, SetDottedPath<S[P], R>>
    : never
  : K extends keyof S
  ? Prop<S, K>
  : K extends ''
  ? Id
  : never

type SetNthRec<N extends number, B, S> = N extends 0
  ? S extends [any, ...infer U]
    ? [B, ...U]
    : never
  : S extends [infer U, ...infer V]
  ? [U, ...SetNthRec<Prec<N>, B, V>]
  : never

export interface SetNth<S, N extends number> extends HKT {
  0: SetNthRec<N, this[1], S>
}

export interface Plant<S, K extends keyof S> extends HKT {
  0: Omit<S, K> & { [KK in keyof this[1]]: this[1][KK] }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PartsOf<T extends HKT, A> extends HKT {
  0: Apply<T, ElemType<this[1]>>
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
