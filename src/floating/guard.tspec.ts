import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import { Expected } from './guard.js'

type Bar = { bar: string }
type Baz = { baz: number }

function isBar(v: Bar | Baz): v is Bar {
  return Object.prototype.hasOwnProperty.call(v, 'bar')
}

describe('guard (polymorphic)', () => {
  interface BarF extends O.HKT {
    0: this[1] extends { bar: infer T } ? { bar: T } : 'not gonna happen'
  }
  const optic = O.guard<BarF>()(isBar)

  it('preview - source not of the correct type', () => {
    const result = O.preview(optic, true)
    expectType<Expected<Bar | Baz, boolean>>()(result)()

    const result2 = O.preview(optic, null)
    expectType<Expected<Bar | Baz, null>>()(result2)()

    const result3 = O.preview(optic, undefined)
    expectType<Expected<Bar | Baz, undefined>>()(result3)()
  })

  it('set - source not of the correct type', () => {
    const result = O.set(optic, { bar: 'foo' }, 123)
    expectType<Expected<Bar | Baz, number>>()(result)()
  })

  it('set - value not of the correct type', () => {
    const result = O.set(optic, { baz: 123 }, { bar: 'foo' })
    expectType<'not gonna happen'>()(result)()
  })
})

describe('guard (monomorphic)', () => {
  const optic = O.guard(isBar)

  it('preview - source not of the correct type', () => {
    const result = O.preview(optic, true)
    expectType<Expected<Bar | Baz, boolean>>()(result)()

    const result2 = O.preview(optic, null)
    expectType<Expected<Bar | Baz, null>>()(result2)()

    const result3 = O.preview(optic, undefined)
    expectType<Expected<Bar | Baz, undefined>>()(result3)()
  })

  it('set - source not of the correct type', () => {
    const result = O.set(optic, { bar: 'foo' }, 123)
    expectType<Expected<Bar | Baz, number>>()(result)()
  })

  it('set - value not of the correct type', () => {
    const result = O.set(optic, { baz: 123 }, { bar: 'foo' })
    expectType<Expected<Bar, Baz>>()(result)()
  })
})
