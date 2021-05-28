import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { ArrayExpected } from './errors.js'

describe('appendTo', () => {
  it('set - source not an array', () => {
    const result = O.set(O.appendTo, 'foo', 3)
    expectType<ArrayExpected<number>>()(result)()
  })
})
