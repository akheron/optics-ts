import * as O from '../src/index'

describe('lens/general', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>().lens(
    (s) => s.foo.bar.baz,
    (s, v: string) => ({
      ...s,
      foo: { ...s.foo, bar: { ...s.foo.bar, baz: v } },
    })
  )
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result = O.set(lens)('UPDATED')(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result = O.modify(lens)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })
})

describe('lens/general chained', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>()
    .prop('foo')
    .lens(
      (s) => s.bar.baz,
      (s, v: string) => ({ ...s, bar: { baz: v } })
    )
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result = O.set(lens)('UPDATED')(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result = O.modify(lens)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })
})

describe('lens/general chained iso', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: { test: Source } = {
    test: { foo: { bar: { baz: 'quux' } }, xyzzy: 42 },
  }

  const lens = O.optic_<{ test: Source }>()
    .iso(
      (a: { test: Source }) => a.test,
      (a: Source) => ({
        test: a,
      })
    )
    .prop('foo')
    .lens(
      (s) => s.bar.baz,
      (s, v) => ({ bar: { ...s.bar, baz: v } })
    )

  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result = O.set(lens)('UPDATED')(source)
    expect(result.test).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result = O.modify(lens)((x) => `${x} UPDATED`)(source)
    expect(result.test).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })
})
