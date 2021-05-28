import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { Expected } from './errors.js'

const optic = O.when((value: number) => value % 2 == 0)

describe('when', () => {
  it('preview - source not of the correct type', () => {
    const result = O.preview(optic, true)
    expectType<Expected<number, boolean>>()(result)()

    const result2 = O.preview(optic, null)
    expectType<Expected<number, null>>()(result2)()

    const result3 = O.preview(optic, undefined)
    expectType<Expected<number, undefined>>()(result3)()
  })

  it('set - source not of the correct type', () => {
    const result = O.set(optic, 'foo', 'bar')
    expectType<Expected<number, string>>()(result)()
  })
})
