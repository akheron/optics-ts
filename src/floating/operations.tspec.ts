import { expectType } from './test-utils.tspec.js'
import type { InvalidModifyFn } from './errors.js'
import * as O from '.'

describe('modify', () => {
  it('invalid fn', () => {
    const result = O.modify(O.prop('foo'), (x: number) => x + 1)({ foo: 'bar' })
    expectType<InvalidModifyFn<string, number>>()(result)()

    const result2 = O.modify(O.prop('foo'))((x: number) => x + 1)({
      foo: 'bar',
    })
    expectType<InvalidModifyFn<string, number>>()(result2)()
  })
})
