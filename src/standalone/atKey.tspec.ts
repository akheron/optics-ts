import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { RecordExpected } from './errors.js'

const optic = O.atKey('foo')

describe('atKey', () => {
  it('preview - not a record', () => {
    const result = O.preview(optic, true)
    expectType<RecordExpected<boolean>>()(result)()

    const result2 = O.preview(optic, null)
    expectType<RecordExpected<null>>()(result2)()

    const result3 = O.preview(optic, undefined)
    expectType<RecordExpected<undefined>>()(result3)()

    const result4 = O.preview(optic, () => undefined)
    expectType<RecordExpected<() => undefined>>()(result4)()

    const result5 = O.preview(optic, [1])
    expectType<RecordExpected<number[]>>()(result5)()
  })

  it('set - source not an array or string', () => {
    const result = O.set(optic, 'foo', 123)
    expectType<RecordExpected<number>>()(result)()
  })

  it('set - value not a string', () => {
    const result = O.set(optic, 123, 'foo')
    expectType<RecordExpected<string>>()(result)()
  })
})
