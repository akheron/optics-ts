import * as O from '../src/index'

describe('lens/values', () => {
  type Source = { foo: Record<'bar' | 'baz', number>; other: string }
  const source: Source = {
    foo: { bar: 42, baz: 99 },
    other: 'quux',
  }

  const traversal = O.optic_<Source>().prop('foo').values()
  type Focus = number

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual([42, 99])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)((v) => v + 100)(source)
    expect(result).toEqual({
      foo: { bar: 142, baz: 199 },
      other: 'quux',
    })
  })

  type Target = { foo: Record<'bar' | 'baz', string>; other: string }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)((v) => v.toString())(source)
    expect(result).toEqual({
      foo: { bar: '42', baz: '99' },
      other: 'quux',
    })
  })
})
