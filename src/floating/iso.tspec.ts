import * as O from '.'
import { expectType } from './test-utils.tspec.js'
import { DisallowedTypeChange } from './iso.js'

describe('iso', () => {
  const optic = O.iso(
    (x: string) => x.split(''),
    (x: string[]) => x.join('')
  )

  it('disallowed type change', () => {
    expectType<DisallowedTypeChange<string[], number>>()(
      O.set(optic, 123, 'foo')
    )()
  })
})
