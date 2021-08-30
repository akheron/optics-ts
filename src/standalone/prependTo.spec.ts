import * as O from '.'

describe('prependTo', () => {
  type Source = string[]
  const source = ['foo', 'bar']

  it('set - monomorphic', () => {
    const result1: Source = O.set(O.prependTo, 'abc', source)
    expect(result1).toEqual(['abc', 'foo', 'bar'])
  })

  type Target = (string | number)[]
  it('set - polymorphic', () => {
    const result1: Target = O.set(O.prependTo, 42, source)
    expect(result1).toEqual([42, 'foo', 'bar'])
  })
})
