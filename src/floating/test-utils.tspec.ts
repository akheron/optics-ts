import { Eq } from '../utils'

export declare function expectType<T>(): <U>(
  value: U
) => Eq<T, U> extends true ? () => void : never
