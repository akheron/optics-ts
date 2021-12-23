import * as O from '.'

describe('at (on array)', () => {
  type Source = string[]
  const source1: Source = ['foo', 'bar', 'baz', 'quux']
  const source2: Source = ['foo']

  const prism = O.at(1)
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
    expect(result).toEqual(['foo', 'UPDATED', 'baz', 'quux'])
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })
  it('modify defined - monomorphic', () => {
    const result: Source = O.modify(prism, (x) => `${x} UPDATED`, source1)
    expect(result).toEqual(['foo', 'bar UPDATED', 'baz', 'quux'])
  })
  it('modify undefined - monomorphic', () => {
    const result: Source = O.modify(prism, (x) => `${x} UPDATED`, source2)
    expect(result).toEqual(source2)
  })

  type Target = Array<string | number>
  it('modify defined - polymorphic', () => {
    const result: Target = O.modify(prism, (x) => x.length, source1)
    expect(result).toEqual(['foo', 3, 'baz', 'quux'])
  })
  it('modify undefined - polymorphic', () => {
    const result: Target = O.modify(prism, (x) => x.length, source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source = O.remove(prism, source1)
    expect(result).toEqual(['foo', 'baz', 'quux'])
  })

  it('remove undefined', () => {
    const result: Source = O.remove(prism, source2)
    expect(result).toEqual(source2)
  })
})

describe('at (on string)', () => {
  type Source = string
  const source1: Source = 'foobarbaz'
  const source2: Source = 'foo'

  const prism = O.at(3)
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism, source1)
    expect(result).toEqual('b')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism, source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source1)
    expect(result).toEqual('fooUPDATEDarbaz')
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism, 'UPDATED', source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source = O.remove(prism, source1)
    expect(result).toEqual('fooarbaz')
  })

  it('remove undefined', () => {
    const result: Source = O.remove(prism, source2)
    expect(result).toEqual(source2)
  })
})
