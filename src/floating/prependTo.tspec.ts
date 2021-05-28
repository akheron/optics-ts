import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { ArrayExpected } from './prependTo.js'

describe('prependTo', () => {
  it('set - source not an array', () => {
    const result = O.set(O.prependTo, 'foo', 3)
    expectType<ArrayExpected<number>>()(result)()
  })
})
