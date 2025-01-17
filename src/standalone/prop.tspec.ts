import { expectType } from './test-utils.tspec.js'
import * as O from '.'
import type { NoSuchProperty } from './errors.js'

type Source = { foo: number; bar: { baz: string } }
declare const s: Source

type A = {
  URI: 'A'
  common: string
  a: boolean
}
type B = {
  URI: 'B'
  common: string
  b: number
}

type AOrB = A | B

describe('prop', () => {
  it('error', () => {
    const result = O.get(O.prop('invalid'))(s)
    expectType<NoSuchProperty<'invalid', Source>>()(result)()
  })

  it('error - composed', () => {
    const result = O.get(O.compose('bar', 'baz', 'invalid'))(s)
    expectType<NoSuchProperty<'invalid', string>>()(result)()
  })

  it('preserves union', () => {
    const a = { URI: 'A', common: 'common', a: true } as AOrB
    const result = O.modify(O.prop('common'))((old: string) => `${old}new`)(a)
    expectType<AOrB>()(result)
  })

  it('preserves union', () => {
    const b: AOrB = { URI: 'B', common: 'common', b: 7 } as AOrB
    const result = O.modify(O.prop('common'))((old: string) => `${old}new`)(b)
    expectType<AOrB>()(result)
  })
})
