import * as O from '../src/index'

describe('lens/entries', () => {
  type Source = { foo: Record<'bar' | 'baz', number>; other: string }
  const source: Source = {
    foo: { bar: 42, baz: 99 },
    other: 'quux',
  }

  const traversal = O.optic_<Source>().prop('foo').entries()
  type Focus = ['bar' | 'baz', number]

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual([
      ['bar', 42],
      ['baz', 99],
    ])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)(([k, v]): [
      'bar' | 'baz',
      number
    ] => [k, v + 100])(source)
    expect(result).toEqual({
      foo: { bar: 142, baz: 199 },
      other: 'quux',
    })
  })

  type Target = { foo: Record<'baaar' | 'baaaz', string>; other: string }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)(([k, v]): [
      'baaar' | 'baaaz',
      string
    ] => [k === 'bar' ? 'baaar' : 'baaaz', v.toString()])(source)
    expect(result).toEqual({
      foo: { baaar: '42', baaaz: '99' },
      other: 'quux',
    })
  })
})
