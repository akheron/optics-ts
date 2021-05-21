import type { Optic, OpticError, TryA, TryT, A, B, S, T } from './optic.js'
import * as I from '../internals.js'

export interface ArrayOfExpected<E, T> extends OpticError {
  readonly _: unique symbol
  readonly _e: E
  readonly _t: T
}

export interface ArrayExpected<T> extends OpticError {
  readonly _: unique symbol
  readonly _t: T
}

interface FilterA<Item> extends A {
  0: TryA<
    this,
    S<this> extends Item[] ? Item[] : ArrayOfExpected<Item, S<this>>
  >
}
interface FilterNarrowA<Item, Narrowed extends Item> extends A {
  0: TryA<
    this,
    S<this> extends Item[] ? Narrowed[] : ArrayOfExpected<Item, S<this>>
  >
}
interface FilterT<Item> extends T {
  0: TryT<
    this,
    S<this> extends Item[]
      ? B<this> extends any[]
        ? S<this> | B<this>
        : ArrayExpected<B<this>>
      : ArrayOfExpected<Item, S<this>>
  >
}

export type Filter<Item> = Optic<'Lens', FilterA<Item>, FilterT<Item>>
export type FilterNarrow<Item, Narrowed extends Item> = Optic<
  'Lens',
  FilterNarrowA<Item, Narrowed>,
  FilterT<Item>
>

export function filter<Item, Narrowed extends Item>(
  pred: (v: Item) => v is Narrowed
): FilterNarrow<Item, Narrowed>
export function filter<Item>(pred: (v: Item) => boolean): Filter<Item>
export function filter(pred: any): any {
  return I.filter(pred)
}
