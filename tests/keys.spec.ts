import * as O from '../src/index'

describe('lens/keys', () => {
  type Source = { foo: Record<'bar' | 'baz', number>; other: string }
  const source: Source = {
    foo: { bar: 42, baz: 99 },
    other: 'quux',
  }

  const traversal = O.optic_<Source>().prop('foo').keys()
  type Focus = 'bar' | 'baz'

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual(['bar', 'baz'])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)((k) =>
      k === 'bar' ? 'baz' : 'bar'
    )(source)
    expect(result).toEqual({
      foo: { baz: 42, bar: 99 },
      other: 'quux',
    })
  })

  type Target = { foo: Record<'baaar' | 'baaaz', number>; other: string }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)((k) =>
      k === 'bar' ? 'baaar' : 'baaaz'
    )(source)
    expect(result).toEqual({
      foo: { baaar: 42, baaaz: 99 },
      other: 'quux',
    })
  })
})
