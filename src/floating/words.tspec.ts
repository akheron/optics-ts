import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { StringExpected } from './words.js'

describe('words', () => {
  it('collect - source not a string', () => {
    const result = O.collect(O.words, true)
    expectType<StringExpected<boolean>>()(result)()

    const result2 = O.collect(O.words, null)
    expectType<StringExpected<null>>()(result2)()

    const result3 = O.collect(O.words, undefined)
    expectType<StringExpected<undefined>>()(result3)()
  })

  it('set - source not a string', () => {
    const result = O.set(O.words, 'foo', 123)
    expectType<StringExpected<number>>()(result)()
  })

  it('set - value not a string', () => {
    const result = O.set(O.words, 123, 'foo')
    expectType<StringExpected<number>>()(result)()
  })
})
