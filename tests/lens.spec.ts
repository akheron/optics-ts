import * as O from '../src/index'

describe('lens/general', () => {
  type Source = { foo: { bar: { baz: string | number } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>().lens(
    (s) => s.foo.bar.baz,
    (s, v: number | string) => ({
      ...s,
      foo: { ...s.foo, bar: { ...s.foo.bar, baz: v } },
    })
  )
  type Focus = string | number

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

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result = O.set(lens)(999)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result = O.modify(lens)((x) => (x as string).length)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})

describe('lens/general chained', () => {
  type Source = { foo: { bar: { baz: number | string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>()
    .prop('foo')
    .lens(
      (s) => s.bar.baz,
      (s, v: number | string) => ({ ...s, bar: { baz: v } })
    )
  type Focus = number | string

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

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result = O.set(lens)(999)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result = O.modify(lens)((x) => (x as string).length)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})

describe('lens/general chained iso', () => {
  type Source = { foo: { bar: { baz: number | string } }; xyzzy: number }
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

  type Focus = number | string

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

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result = O.set(lens)(999)(source)
    expect(result.test).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result = O.modify(lens)((x) => x.length)(source)
    expect(result.test).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})
