import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { ArrayExpected } from './elems.js'

describe('elems', () => {
  it('collect - source not an array', () => {
    const result = O.collect(O.elems, 3)
    expectType<ArrayExpected<number>>()(result)()

    const result2 = O.collect(O.elems, null)
    expectType<ArrayExpected<null>>()(result2)()

    const result3 = O.collect(O.elems, undefined)
    expectType<ArrayExpected<undefined>>()(result3)()
  })

  it('set - source not an array', () => {
    const result = O.set(O.elems, 'foo', 3)
    expectType<ArrayExpected<number>>()(result)()
  })
})
