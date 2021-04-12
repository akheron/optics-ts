import * as O from '../src/index'

describe('filter', () => {
  describe('read', () => {
    type Source = string[]
    const source: Source = ['baz', 'quux', 'xyzzy']

    const lens = O.optic_<Source>().filter((item) => item !== 'quux')
    type Focus = string[]

    it('get', () => {
      const result: Focus = O.get(lens)(source)
      expect(result).toEqual(['baz', 'xyzzy'])
    })
  })

  describe('write same number of elems', () => {
    type Source = string[]
    const source: Source = ['baz', 'quux', 'xyzzy']

    const lens = O.optic_<Source>().filter((item) => item !== 'quux')

    it('set - monomorphic', () => {
      const result: Source = O.set(lens)(['BAZ', 'XYZZY'])(source)
      expect(result).toEqual(['BAZ', 'quux', 'XYZZY'])
    })

    type Target = (string | boolean)[]
    it('set - polymorphic', () => {
      const result: Target = O.set(lens)([true, false])(source)
      expect(result).toEqual([true, 'quux', false])
    })
  })

  describe('add/remove elems', () => {
    type Source = number[]
    const source: Source = [1, 2, 3, 5, 6]

    const isOdd = (x: number) => x % 2 === 1
    const lens = O.optic_<Source>().filter(isOdd)

    type Focus = (number | string)[]

    it('remove elements', () => {
      const result: Focus = O.set(lens)(['foo', 'bar'])(source)
      expect(result).toEqual(['foo', 2, 'bar', 6])
    })
    it('add elements', () => {
      const result: Focus = O.set(lens)(['foo', 'bar', 'baz', 'quux', 'xyzzy'])(
        source
      )
      expect(result).toEqual(['foo', 2, 'bar', 'baz', 6, 'quux', 'xyzzy'])
    })
  })

  it('narrows the type', () => {
    type Source = (number | string)[]
    const source = [1, 'foo', 'bar', 2, 3]

    const lens = O.optic<Source>().filter(
      (x): x is string => typeof x === 'string'
    )
    type Focus = string[]

    const result: Focus = O.get(lens)(source)
    expect(result).toEqual(['foo', 'bar'])
  })
})

describe('traversal/filter', () => {
  type Source = { type: number; value: string }
  const source: Source[] = [
    { type: 1, value: 'foo' },
    { type: 2, value: 'bar' },
    { type: 3, value: 'baz' },
    { type: 4, value: 'quux' },
  ]

  const traversal = O.optic_<Source[]>()
    .filter((item) => item.type % 2 == 0)
    .elems()
    .prop('value')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['bar', 'quux'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)((x) => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { type: 1, value: 'foo' },
      { type: 2, value: 'bar UPDATED' },
      { type: 3, value: 'baz' },
      { type: 4, value: 'quux UPDATED' },
    ])
  })

  type Target = { type: number; value: string | number }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)((x) => x.length)(source)
    expect(result).toEqual([
      { type: 1, value: 'foo' },
      { type: 2, value: 3 },
      { type: 3, value: 'baz' },
      { type: 4, value: 4 },
    ])
  })
})
