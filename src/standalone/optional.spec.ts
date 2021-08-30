import * as O from '.'

describe('lens/optional', () => {
  type Source = { foo: { bar: { baz: string } | undefined }; xyzzy: number }
  const source1: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }
  const source2: Source = { foo: { bar: undefined }, xyzzy: 42 }

  const prism = O.compose('foo', 'bar', O.optional, 'baz')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism, source1)
    expect(result).toEqual('quux')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism, source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source1)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: { bar: { baz: number } | undefined }; xyzzy: number }
  it('set defined - polymorphic', () => {
    const result: Target = O.set(prism, 999, source1)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(prism, 999, source2)
    expect(result).toEqual(source2)
  })
})

describe('prism/optional', () => {
  type Source = { foo: { bar: string } | undefined } | undefined
  const source1: Source = { foo: { bar: 'baz' } }
  const source2: Source = { foo: undefined }

  const prism = O.compose(O.optional, 'foo', O.optional, 'bar')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism, source1)
    expect(result).toEqual('baz')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism, source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: { bar: number } | undefined } | undefined
  it('set defined - polymorphic', () => {
    const result: Target = O.set(prism, 42, source1)
    expect(result).toEqual({
      foo: { bar: 42 },
    })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(prism, 42, source2)
    expect(result).toEqual(source2)
  })
})

describe('traversal/optional', () => {
  type Source = { bar: string } | undefined
  const source: Source[] = [{ bar: 'baz' }, undefined, { bar: 'xyzzy' }]

  const traversal = O.compose(O.elems, O.optional, 'bar')
  type Focus = Array<string>

  it('collect', () => {
    const result: Focus | undefined = O.collect(traversal, source)
    expect(result).toEqual(['baz', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal, (x) => `${x} UPDATED`, source)
    expect(result).toEqual([
      { bar: 'baz UPDATED' },
      undefined,
      { bar: 'xyzzy UPDATED' },
    ])
  })

  type Target = { bar: number } | undefined
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal, (x) => x.length, source)
    expect(result).toEqual([{ bar: 3 }, undefined, { bar: 5 }])
  })
})
