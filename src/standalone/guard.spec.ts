import * as O from '.'

type Bar = { bar: string }
type Baz = { baz: boolean }

function isBar(v: Bar | Baz): v is Bar {
  return 'bar' in v
}

describe('lens/guard (polymorphic)', () => {
  type Source = { foo: Bar | Baz }
  const source1: Source = { foo: { bar: 'quux' } }
  const source2: Source = { foo: { baz: false } }

  interface BarF extends O.HKT {
    0: this[1] extends { bar: infer T } ? { bar: T } : never
  }

  const prism = O.compose('foo', O.guard<BarF>()(isBar), 'bar')
  type Focus = string | undefined

  it('preview matching', () => {
    const result: Focus = O.preview(prism, source1)
    expect(result).toEqual('quux')
  })
  it('preview non-matching', () => {
    const result: Focus = O.preview(prism, source2)
    expect(result).toBeUndefined()
  })

  it('set matching - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set non-matching - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: { bar: number } }
  it('modify matching - polymorphic', () => {
    const result: Target = O.modify(prism, (x) => x.length, source1)
    expect(result).toEqual({
      foo: { bar: 4 },
    })
  })
  it('modify non-matching - polymorphic', () => {
    const result: Target = O.modify(prism, (x) => x.length, source2)
    expect(result).toEqual(source2)
  })
})

describe('lens/guard (monomorphic)', () => {
  type Bar = { bar: string }
  type Baz = { baz: number }

  function isBar(v: Bar | Baz): v is Bar {
    return Object.prototype.hasOwnProperty.call(v, 'bar')
  }

  type Source = { foo: Bar | Baz }
  const source1: Source = { foo: { bar: 'quux' } }
  const source2: Source = { foo: { baz: 42 } }

  const prism = O.compose('foo', O.guard(isBar), 'bar')
  type Focus = string | undefined

  it('preview matching', () => {
    const result: Focus = O.preview(prism, source1)
    expect(result).toEqual('quux')
  })
  it('preview non-matching', () => {
    const result: Focus = O.preview(prism, source2)
    expect(result).toBeUndefined()
  })

  it('set matching - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set non-matching - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })
})
