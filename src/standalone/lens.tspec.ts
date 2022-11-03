import * as O from '.'
import { expectType } from './test-utils.tspec.js'
import type { Expected } from './errors.js'

const optic = O.lens<string | number, number>(
  (v) => (typeof v === 'string' ? 0 : v),
  (_, u) => u
)

describe('lens', () => {
  it('get - source not of the correct type', () => {
    const result = O.get(optic, true)
    expectType<Expected<string | number, boolean>>()(result)()

    const result2 = O.get(optic, null)
    expectType<Expected<string | number, null>>()(result2)()

    const result3 = O.get(optic, undefined)
    expectType<Expected<string | number, undefined>>()(result3)()
  })

  it('set - source not of the correct type', () => {
    const result = O.set(optic, 'foo', 123)
    expectType<Expected<number, string>>()(result)()
  })

  it('set - value not of the correct type', () => {
    const result = O.set(optic, 123, true)
    expectType<Expected<string | number, boolean>>()(result)()
  })
})
