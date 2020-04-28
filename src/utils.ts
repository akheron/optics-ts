interface NotAnArrayType<_T> {
  readonly _: unique symbol
}

export type ElemType<A> = IfElse<
  IsOptional<A>,
  NotAnArrayType<A>,
  A extends (infer Item)[] ? Item : NotAnArrayType<A>
>

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

interface ExpectedStringButGot<_T> {
  readonly _: unique symbol
}
