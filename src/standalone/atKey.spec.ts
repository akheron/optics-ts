import * as O from '.'

describe('atKey', () => {
  type Source = Record<string, string>
  const source1: Source = { foo: 'bar', baz: 'quux' }
  const source2: Source = { hello: 'world' }

  const prism = O.atKey('foo')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism, source1)
    expect(result).toEqual('bar')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism, source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source1)
    expect(result).toEqual({ foo: 'UPDATED', baz: 'quux' })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })
  it('modify defined - monomorphic', () => {
    const result: Source = O.modify(prism, (x) => `${x} UPDATED`, source1)
    expect(result).toEqual({ foo: 'bar UPDATED', baz: 'quux' })
  })
  it('modify undefined - monomorphic', () => {
    const result: Source = O.modify(prism, (x) => `${x} UPDATED`, source2)
    expect(result).toEqual(source2)
  })

  type Target = Record<string, string | number>
  it('modify defined - polymorphic', () => {
    const result: Target = O.modify(prism, (x) => x.length, source1)
    expect(result).toEqual({ foo: 3, baz: 'quux' })
  })
  it('modify undefined - polymorphic', () => {
    const result: Target = O.modify(prism, (x) => x.length, source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source = O.remove(prism, source1)
    expect(result).toEqual({ baz: 'quux' })
  })

  it('remove undefined', () => {
    const result: Source = O.remove(prism, source2)
    expect(result).toEqual(source2)
  })
})
