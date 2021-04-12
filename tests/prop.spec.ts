import * as O from '../src/index'

describe('lens/prop', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>().prop('foo').prop('bar').prop('baz')
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens)('UPDATED')(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result: Target = O.set(lens)(999)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result: Target = O.modify(lens)((x) => x.length)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})

describe('prism/prop', () => {
  type Source = { foo: { bar: string } } | undefined
  const source: Source = { foo: { bar: 'baz' } }

  const prism = O.optic_<Source>().optional().prop('foo').prop('bar')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source)
    expect(result).toEqual('baz')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(undefined)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source)
    expect(result).toEqual({ foo: { bar: 'UPDATED' } })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(undefined)
    expect(result).toBeUndefined()
  })

  type Target = { foo: { bar: number } } | undefined
  it('set defined - polymorphic', () => {
    const result: Target = O.set(prism)(42)(source)
    expect(result).toEqual({ foo: { bar: 42 } })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(prism)(42)(undefined)
    expect(result).toBeUndefined()
  })
})

describe('traversal/prop', () => {
  type Source = { bar: string }
  const source: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]

  const traversal = O.optic_<Source[]>().elems().prop('bar')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['baz', 'quux', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { bar: 'baz UPDATED' },
      { bar: 'quux UPDATED' },
      { bar: 'xyzzy UPDATED' },
    ])
  })

  type Target = { bar: number }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)((x) => x.length)(source)
    expect(result).toEqual([{ bar: 3 }, { bar: 4 }, { bar: 5 }])
  })
})

describe('traversal/prop/prop', () => {
  type Source = { bar: { baz: string } }
  const source: Source[] = [
    { bar: { baz: 'a' } },
    { bar: { baz: 'b' } },
    { bar: { baz: 'c' } },
  ]

  const traversal = O.optic_<Source[]>().elems().prop('bar').prop('baz')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { bar: { baz: 'a UPDATED' } },
      { bar: { baz: 'b UPDATED' } },
      { bar: { baz: 'c UPDATED' } },
    ])
  })

  type Target = { bar: { baz: number } }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)((x) => x.charCodeAt(0))(source)
    expect(result).toEqual([
      { bar: { baz: 97 } },
      { bar: { baz: 98 } },
      { bar: { baz: 99 } },
    ])
  })
})
