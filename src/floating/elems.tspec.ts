import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { ArrayExpected } from './elems.js'

describe('elems', () => {
  const optic = O.elems

  it('array expected', () => {
    const result = O.collect(optic, 3)
    expectType<ArrayExpected<number>>()(result)()
  })
})
