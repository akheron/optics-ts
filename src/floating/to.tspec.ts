import * as O from '.'
import { expectType } from './test-utils.tspec.js'
import { Expected } from './to.js'

const optic = O.to((x: string) => x.length)

describe('to', () => {
  it('get - source not of the correct type', () => {
    const result = O.get(optic, true)
    expectType<Expected<string, boolean>>()(result)()

    const result2 = O.get(optic, null)
    expectType<Expected<string, null>>()(result2)()

    const result3 = O.get(optic, undefined)
    expectType<Expected<string, undefined>>()(result3)()
  })
})
