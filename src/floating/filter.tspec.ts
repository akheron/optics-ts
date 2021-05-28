import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { ArrayOfExpected, ArrayExpected } from './errors.js'

const optic = O.filter((v: string) => v !== '')

describe('filter', () => {
  it('get - source not an array (of correct type)', () => {
    const result = O.get(optic, true)
    expectType<ArrayOfExpected<string, boolean>>()(result)()

    const result2 = O.get(optic, null)
    expectType<ArrayOfExpected<string, null>>()(result2)()

    const result3 = O.get(optic, undefined)
    expectType<ArrayOfExpected<string, undefined>>()(result3)()

    const result4 = O.get(optic, [true])
    expectType<ArrayOfExpected<string, boolean[]>>()(result4)()
  })

  it('set - source not an array (of correct type)', () => {
    const result = O.set(optic, ['foo'], 123)
    expectType<ArrayOfExpected<string, number>>()(result)()

    const result2 = O.set(optic, ['foo'], [123])
    expectType<ArrayOfExpected<string, number[]>>()(result2)()
  })

  it('set - value not an array', () => {
    const result = O.set(optic, 123, ['foo'])
    expectType<ArrayExpected<number>>()(result)()
  })
})
