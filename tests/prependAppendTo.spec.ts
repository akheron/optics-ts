import * as O from '../src/index'

describe('prependTo & appendTo', () => {
  const prepend = O.optic_<Source>().prependTo()
  const append = O.optic_<Source>().appendTo()

  type Source = string[]
  const source = ['foo', 'bar']

  it('write - monomorphic', () => {
    const result1: Source = O.set(prepend)('abc')(source)
    expect(result1).toEqual(['abc', 'foo', 'bar'])
    const result2: Source = O.set(append)('abc')(source)
    expect(result2).toEqual(['foo', 'bar', 'abc'])
  })

  type Target = (string | number)[]
  it('write - polymorphic', () => {
    const result1: Target = O.set(prepend)(42)(source)
    expect(result1).toEqual([42, 'foo', 'bar'])
    const result2: Target = O.set(append)(42)(source)
    expect(result2).toEqual(['foo', 'bar', 42])
  })
})
