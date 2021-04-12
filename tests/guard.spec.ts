import * as O from '../src/index'

describe('lens/guard_', () => {
  type Inner<T> = Bar<T> | Baz
  type Bar<T> = { bar: T }
  type Baz = { baz: boolean }

  function isBar<T>(v: Inner<T>): v is Bar<T> {
    return Object.prototype.hasOwnProperty.call(v, 'bar')
  }

  interface InnerBarF extends O.HKT {
    0: this[1] extends Bar<any> ? Inner<this[1]['bar']> : never
  }

  type Source = { foo: Inner<string> }
  const source1: Source = { foo: { bar: 'quux' } }
  const source2: Source = { foo: { baz: false } }

  const prism = O.optic_<Source>()
    .prop('foo')
    .guard_<InnerBarF>()(isBar)
    .prop('bar')
  type Focus = string | undefined

  it('preview matching', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('quux')
  })
  it('preview non-matching', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set non-matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: Inner<number> }
  it('modify matching - polymorphic', () => {
    const result: Target = O.modify(prism)((x) => x.length)(source1)
    expect(result).toEqual({
      foo: { bar: 4 },
    })
  })
  it('modify non-matching - polymorphic', () => {
    const result: Target = O.modify(prism)((x) => x.length)(source2)
    expect(result).toEqual(source2)
  })
})

describe('lens/guard', () => {
  type Bar = { bar: string }
  type Baz = { baz: number }

  function isBar(v: Bar | Baz): v is Bar {
    return Object.prototype.hasOwnProperty.call(v, 'bar')
  }

  type Source = { foo: Bar | Baz }
  const source1: Source = { foo: { bar: 'quux' } }
  const source2: Source = { foo: { baz: 42 } }

  const prism = O.optic_<Source>().prop('foo').guard(isBar).prop('bar')
  type Focus = string | undefined

  it('preview matching', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('quux')
  })
  it('preview non-matching', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set non-matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  // guard is monomorphic -> polymorphic set/modify is not possible
})
