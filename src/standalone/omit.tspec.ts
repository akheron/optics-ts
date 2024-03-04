import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { InvalidOmit } from './errors.js'

type Source = { foo: number; bar: string; baz: boolean }
declare const s: Source

describe('omit', () => {
  it('error', () => {
    const result = O.get(O.omit('invalid'))(s)
    expectType<InvalidOmit<'invalid', Source>>()(result)()
  })
})
