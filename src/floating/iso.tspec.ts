import * as O from '.'
import { expectType } from './test-utils.tspec'
import { DisallowedTypeChange } from './iso'

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
