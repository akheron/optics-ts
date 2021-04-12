import * as O from '../src/index'

describe('equivalence', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const eq = O.optic_<Source>()

  it('get', () => {
    const result: Source = O.get(eq)(source)
    expect(result).toEqual(source)
  })
  it('set - polymorphic', () => {
    const result: number = O.set(eq)(123)(source)
    expect(result).toEqual(123)
  })
})
