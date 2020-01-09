export type ElemType<A> = A extends Array<infer Item> ? Item : never

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
