import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { StringExpected } from './chars.js'

describe('chars', () => {
  it('collect - source not a string', () => {
    const result = O.collect(O.chars, true)
    expectType<StringExpected<boolean>>()(result)()

    const result2 = O.collect(O.chars, null)
    expectType<StringExpected<null>>()(result2)()

    const result3 = O.collect(O.chars, undefined)
    expectType<StringExpected<undefined>>()(result3)()
  })

  it('set - source not a string', () => {
    const result = O.set(O.chars, 'foo', 123)
    expectType<StringExpected<number>>()(result)()
  })

  it('set - value not a string', () => {
    const result = O.set(O.chars, 123, 'foo')
    expectType<StringExpected<number>>()(result)()
  })
})
