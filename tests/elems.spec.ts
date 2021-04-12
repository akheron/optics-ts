import * as O from '../src/index'

describe('lens/elems', () => {
  type Source = { foo: Array<{ bar: string }>; other: number }
  const source: Source = {
    foo: [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }],
    other: 42,
  }

  const traversal = O.optic_<Source>().prop('foo').elems().prop('bar')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['baz', 'quux', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: [
        { bar: 'baz UPDATED' },
        { bar: 'quux UPDATED' },
        { bar: 'xyzzy UPDATED' },
      ],
      other: 42,
    })
  })

  type Target = { foo: Array<{ bar: boolean }>; other: number }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)((x) => x.length === 4)(source)
    expect(result).toEqual({
      foo: [{ bar: false }, { bar: true }, { bar: false }],
      other: 42,
    })
  })
})

describe('traversal/elems', () => {
  type Source = number[][]
  const source: Source = [
    [65, 66],
    [67, 68],
  ]

  const traversal = O.optic_<number[][]>().elems().elems()
  type Focus = number

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual([65, 66, 67, 68])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)((x) => x / 10)(source)
    expect(result).toEqual([
      [6.5, 6.6],
      [6.7, 6.8],
    ])
  })

  type Target = string[][]
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)((x) => String.fromCharCode(x))(
      source
    )
    expect(result).toEqual([
      ['A', 'B'],
      ['C', 'D'],
    ])
  })
})
