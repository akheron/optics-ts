import * as O from '../src/index'

describe('indexed', () => {
  type Source = string[]
  const source: Source = ['foo', 'bar', 'baz']

  const iso = O.optic_<Source>().indexed()
  type Focus = [number, string][]

  it('get', () => {
    const result: Focus = O.get(iso)(source)
    expect(result).toEqual([
      [0, 'foo'],
      [1, 'bar'],
      [2, 'baz'],
    ])
  })

  describe('set - monomorphic', () => {
    it('already in order', () => {
      const value: [number, string][] = [
        [0, 'FOO'],
        [1, 'BAR'],
        [2, 'BAZ'],
      ]
      const result: Source = O.set(iso)(value)(source)
      expect(result).toEqual(['FOO', 'BAR', 'BAZ'])
    })
    it('contiguous 0-based indexes', () => {
      const value: [number, string][] = [
        [1, 'foo'],
        [0, 'bar'],
        [3, 'baz'],
        [2, 'quux'],
      ]
      const result: Source = O.set(iso)(value)(source)
      expect(result).toEqual(['bar', 'foo', 'quux', 'baz'])
    })
    it('non-contiguous indexes', () => {
      const value: [number, string][] = [
        [23, 'foo'],
        [99, 'bar'],
        [21, 'baz'],
        [60, 'quux'],
      ]
      const result: Source = O.set(iso)(value)(source)
      expect(result).toEqual(['baz', 'foo', 'quux', 'bar'])
    })
    it('same index twice takes the last', () => {
      const value: [number, string][] = [
        [1, 'foo'],
        [2, 'bar'],
        [1, 'baz'],
        [3, 'quux'],
      ]
      const result: Source = O.set(iso)(value)(source)
      expect(result).toEqual(['baz', 'bar', 'quux'])
    })
  })

  type Target = { foo: string }[]
  it('set - polymorphic', () => {
    const value: [number, { foo: string }][] = [
      [3, { foo: 'bar' }],
      [2, { foo: 'baz' }],
      [1, { foo: 'quux' }],
    ]
    const result: Target = O.set(iso)(value)(source)
    expect(result).toEqual([{ foo: 'quux' }, { foo: 'baz' }, { foo: 'bar' }])
  })
})
