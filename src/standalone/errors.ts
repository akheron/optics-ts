export interface OpticError {
  readonly __error: unique symbol
}

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface ArrayOfExpected<E, T> extends OpticError {
  readonly _: unique symbol
  readonly _e: E
  readonly _t: T
}

export interface ArrayOfIndexValuePairsExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface ArrayOrStringExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface Expected<T, U> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
  readonly _u: U
}

export interface InvalidModifyFn<Expected, Got> extends OpticError {
  readonly _: unique symbol
  readonly _got: Got
  readonly _expected: Expected
}

export interface InvalidOmit<K, A> extends OpticError {
  readonly _: unique symbol
  readonly _k: K
  readonly _a: A
}

export interface InvalidPick<K, A> extends OpticError {
  readonly _: unique symbol
  readonly _k: K
  readonly _a: A
}

export interface NoSuchProperty<K extends string, A> extends OpticError {
  readonly _: unique symbol
  readonly _k: K
  readonly _a: A
}

export interface RecordExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface StringExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

export interface TraversalExpected extends OpticError {
  readonly _: unique symbol
}

export interface TupleExpected<N, T> extends OpticError {
  readonly _: unique symbol
  readonly _n: N
  readonly _t: T
}
