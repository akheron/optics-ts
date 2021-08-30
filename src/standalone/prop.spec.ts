import * as O from '.'

describe('prop', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.compose('foo', 'bar', 'baz')
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens, source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens, 'UPDATED', source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens, (x) => `${x} UPDATED`, source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result: Target = O.set(lens, 999, source)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result: Target = O.modify(lens, (x) => x.length, source)
    expect(result).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})
