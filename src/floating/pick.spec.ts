import * as O from '.'

describe('pick', () => {
  type Source = {
    foo: string
    bar: boolean
    baz: { quux: number }
    xyzzy: number
  }
  const source: Source = {
    foo: 'blurp',
    bar: true,
    baz: { quux: 42 },
    xyzzy: 999,
  }

  const lens = O.pick('foo', 'bar', 'baz')
  type Focus = { foo: string; bar: boolean; baz: { quux: number } }

  it('get', () => {
    const result: Focus = O.get(lens, source)
    expect(result).toEqual({ foo: 'blurp', bar: true, baz: { quux: 42 } })
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(
      lens,
      {
        foo: 'updated',
        bar: false,
        baz: { quux: 0 },
      },
      source
    )
    expect(result).toEqual({
      foo: 'updated',
      bar: false,
      baz: { quux: 0 },
      xyzzy: 999,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(
      lens,
      ({ foo, bar, baz }) => ({
        foo: `${foo} UPDATED`,
        bar: !bar,
        baz: { quux: baz.quux * 100 },
      }),
      source
    )
    expect(result).toEqual({
      foo: 'blurp UPDATED',
      bar: false,
      baz: { quux: 4200 },
      xyzzy: 999,
    })
  })

  type Target = {
    foo: number
    baz: number
    added: string
    xyzzy: number
  }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(
      lens,
      ({ foo, bar, baz }) => ({
        foo: foo.length + +bar,
        baz: baz.quux,
        added: 'wow',
      }),
      source
    )
    expect(result).toEqual({
      foo: 6,
      baz: 42,
      added: 'wow',
      xyzzy: 999,
    })
  })
})
