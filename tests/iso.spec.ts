import * as O from '../src/index'

describe('lens/iso', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic<Source>()
    .prop('foo')
    .iso(
      (a) => ({ value: a.bar.baz }),
      (b) => ({ bar: { baz: b.value } })
    )
  type Focus = { value: string }

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual({ value: 'quux' })
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens)({ value: 'UPDATED' })(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)((x) => ({
      value: `${x.value} UPDATED`,
    }))(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })

  // iso is monomorphic -> polymorphic set/modify is not possible
})
