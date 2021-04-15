import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { TupleExpected } from './nth.js'

describe('nth', () => {
  it('get - not a tuple', () => {
    const result = O.get(O.nth(1), 42)
    expectType<TupleExpected<1, number>>()(result)()
  })

  it('get - not long enough a tuple', () => {
    const s: [number] = [42]
    const result = O.get(O.nth(1), s)
    expectType<TupleExpected<1, [number]>>()(result)()
  })
})
