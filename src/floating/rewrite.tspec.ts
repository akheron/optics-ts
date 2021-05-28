import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { Expected } from './errors.js'

const optic = O.rewrite((x: string) => x.toUpperCase())

describe('rewrite', () => {
  it('get - source not of the correct type', () => {
    const result = O.get(optic, true)
    expectType<Expected<string, boolean>>()(result)()

    const result2 = O.get(optic, null)
    expectType<Expected<string, null>>()(result2)()

    const result3 = O.get(optic, undefined)
    expectType<Expected<string, undefined>>()(result3)()
  })

  it('set - source not of the correct type', () => {
    const result = O.set(optic, 'foo', 123)
    expectType<Expected<string, number>>()(result)()
  })

  it('set - value not an array', () => {
    const result = O.set(optic, 123, 'foo')
    expectType<Expected<string, number>>()(result)()
  })
})
