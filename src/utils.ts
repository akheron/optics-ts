// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NotAnArrayType<_T> {
  readonly _: unique symbol
}

export type ElemType<A> = IfElse<
  IsOptional<A>,
  NotAnArrayType<A>,
  A extends (infer Item)[] ? Item : NotAnArrayType<A>
>

export type EntryType<A> = A extends Record<infer K, infer V> ? [K, V] : never
export type KeyType<A> = keyof A
export type ValueType<A> = A extends Record<any, infer V> ? V : never

// Conduct the check through return value types to work around the
// Distributive Conditional Types feature:
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types
export type Eq<A, B> = (() => A) extends () => B
  ? (() => B) extends () => A
    ? true
    : false
  : false

// A if it's equal to B, otherwise B
export type Simplify<A, B> = Eq<A, B> extends true ? A : B

export type IsOptional<A> = Or<ExtendsUndefined<A>, ExtendsNull<A>>

type ExtendsUndefined<A> = Eq<A | undefined, A>
type ExtendsNull<A> = Eq<A | null, A>

type Or<A extends true | false, B extends true | false> = A extends true
  ? true
  : B

export type IfElse<
  Condition extends true | false,
  Then,
  Else
> = Condition extends true ? Then : Else

export type RequireString<A, B> = IfElse<
  Eq<A, string>,
  B,
  ExpectedStringButGot<A>
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ExpectedStringButGot<_T> {
  readonly _: unique symbol
}

export type Prec<N> = N extends 6
  ? 5
  : N extends 5
  ? 4
  : N extends 4
  ? 3
  : N extends 3
  ? 2
  : N extends 2
  ? 1
  : N extends 1
  ? 0
  : never

export type TuplePath<A, K> = K extends []
  ? A
  : K extends [infer P, ...infer R]
  ? P extends keyof A
    ? TuplePath<A[P], R>
    : never
  : never

export type DottedPath<A, K> = K extends keyof A
  ? A[K]
  : K extends `${infer P}.${infer R}`
  ? P extends keyof A
    ? DottedPath<A[P], R>
    : never
  : K extends ''
  ? A
  : never

export type AnyTuple<N extends number, Acc extends any[] = []> = N extends 0
  ? Acc
  : AnyTuple<Prec<N>, [...Acc, any]>

export type Nth<A, N extends number> = A extends [
  ...AnyTuple<N>,
  infer U,
  ...any[]
]
  ? U
  : never
