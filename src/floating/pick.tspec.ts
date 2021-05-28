import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { InvalidPick } from './errors.js'

type Source = { foo: number; bar: string; baz: boolean }
declare const s: Source

describe('pick', () => {
  it('error', () => {
    const result = O.get(O.pick('invalid'))(s)
    expectType<InvalidPick<'invalid', Source>>()(result)()
  })
})
