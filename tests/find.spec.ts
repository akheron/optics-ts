import * as O from '../src/index'

describe('find', () => {
  type Source = { bar: string }
  const source1: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]
  const source2: Source[] = [
    { bar: 'baz' },
    { bar: 'nomatch' },
    { bar: 'xyzzy' },
  ]

  const prism = O.optic_<Source[]>().find((item) => item.bar === 'quux')
  type Focus = Source | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual({ bar: 'quux' })
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('modify defined - monomorphic', () => {
    const result: Source[] = O.modify(prism)((x) => ({
      bar: `${x.bar} UPDATED`,
    }))(source1)
    expect(result).toEqual([
      { bar: 'baz' },
      { bar: 'quux UPDATED' },
      { bar: 'xyzzy' },
    ])
  })
  it('modify undefined - monomorphic', () => {
    const result: Source[] = O.modify(prism)((x) => ({
      bar: `${x.bar} UPDATED`,
    }))(source2)
    expect(result).toEqual(source2)
  })

  type Target = { bar: string } | number
  it('modify defined - polymorphic', () => {
    const result: Target[] = O.modify(prism)((x) => x.bar.length)(source1)
    expect(result).toEqual([{ bar: 'baz' }, 4, { bar: 'xyzzy' }])
  })
  it('modify undefined - polymorphic', () => {
    const result: Target[] = O.modify(prism)((x) => x.bar.length)(source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source[] = O.remove(prism)(source1)
    expect(result).toEqual([{ bar: 'baz' }, { bar: 'xyzzy' }])
  })
  it('remove undefined', () => {
    const result: Source[] = O.remove(prism)(source2)
    expect(result).toEqual(source2)
  })
})
