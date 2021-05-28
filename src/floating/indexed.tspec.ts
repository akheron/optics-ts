import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { ArrayExpected, ArrayOfIndexValuePairsExpected } from './errors.js'

const optic = O.indexed

describe('indexed', () => {
  it('get - not an array', () => {
    const result = O.get(optic, true)
    expectType<ArrayExpected<boolean>>()(result)()

    const result2 = O.get(optic, null)
    expectType<ArrayExpected<null>>()(result2)()

    const result3 = O.get(optic, undefined)
    expectType<ArrayExpected<undefined>>()(result3)()
  })

  it('set - not an array of index-value pairs', () => {
    const result = O.set(optic, 'foo', [])
    expectType<ArrayOfIndexValuePairsExpected<string>>()(result)()
  })
})
