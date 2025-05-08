import * as O from '.'

describe('omit', () => {
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

  const lens = O.omit('foo')
  type Focus = { bar: boolean; baz: { quux: number }; xyzzy: number }

  it('get', () => {
    const result: Focus = O.get(lens, source)
    expect(result).toEqual({ bar: true, baz: { quux: 42 }, xyzzy: 999 })
  })

  it('set - monomorphic', () => {
    const result: Focus = O.set(
      lens,
      {
        bar: false,
        baz: { quux: 0 },
      },
      source
    )
    expect(result).toEqual({
      bar: false,
      baz: { quux: 0 },
      xyzzy: 999,
    })
  })
  it('modify - monomorphic', () => {
    const result: Focus = O.modify(
      lens,
      ({ bar, baz, xyzzy }) => ({
        bar: !bar,
        baz: { quux: baz.quux * 100 },
        xyzzy: -1 * xyzzy,
      }),
      source
    )
    expect(result).toEqual({
      bar: false,
      baz: { quux: 4200 },
      xyzzy: -999,
    })
  })

  type Target = {
    foo: number
    baz: number
    added: string
  }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(
      lens,
      ({ bar, baz, xyzzy }) => ({
        foo: xyzzy + +bar,
        baz: baz.quux,
        added: 'wow',
      }),
      source
    )
    expect(result).toEqual({
      bar: true,
      xyzzy: 999,
      foo: 1000,
      baz: 42,
      added: 'wow',
    })
  })

  it('get - empty', () => {
    const result: Record<string, number> = O.get(O.omit(), { foo: 42 })
    expect(result).toEqual({ foo: 42 })
  })

  it('set - empty', () => {
    type T = { foo: number; bar: boolean }
    const result: T = O.set(O.omit(), { foo: 42 }, { bar: true })
    expect(result).toEqual({ foo: 42, bar: true })
  })
})
