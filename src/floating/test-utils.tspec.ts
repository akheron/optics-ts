import { Eq } from '../utils.js'

export declare function expectType<T>(): <U>(
  value: U
) => Eq<T, U> extends true ? () => void : never
