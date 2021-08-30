import * as O from '.'

describe('elems', () => {
  type Source = { foo: Array<{ bar: string }>; other: number }
  const source: Source = {
    foo: [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }],
    other: 42,
  }

  const traversal = O.compose('foo', O.elems, 'bar')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal, source)
    expect(result).toEqual(['baz', 'quux', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal, (x) => `${x} UPDATED`, source)
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
    const result: Target = O.modify(traversal, (x) => x.length === 4, source)
    expect(result).toEqual({
      foo: [{ bar: false }, { bar: true }, { bar: false }],
      other: 42,
    })
  })
})
