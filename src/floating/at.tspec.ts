import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { ArrayOrStringExpected, StringExpected } from './errors.js'

const optic = O.at(5)

describe('at', () => {
  it('preview - not an array or string', () => {
    const result = O.preview(optic, true)
    expectType<ArrayOrStringExpected<boolean>>()(result)()

    const result2 = O.preview(optic, null)
    expectType<ArrayOrStringExpected<null>>()(result2)()

    const result3 = O.preview(optic, undefined)
    expectType<ArrayOrStringExpected<undefined>>()(result3)()
  })

  it('set - source not an array or string', () => {
    const result = O.set(optic, 'foo', 123)
    expectType<ArrayOrStringExpected<number>>()(result)()
  })

  it('set - value not a string', () => {
    const result = O.set(optic, 123, 'foo')
    expectType<StringExpected<number>>()(result)()
  })
})
