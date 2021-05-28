import * as O from '.'

describe('appendTo', () => {
  type Source = string[]
  const source = ['foo', 'bar']

  it('set - monomorphic', () => {
    const result1: Source = O.set(O.appendTo, 'abc', source)
    expect(result1).toEqual(['foo', 'bar', 'abc'])
  })

  type Target = (string | number)[]
  it('set - polymorphic', () => {
    const result1: Target = O.set(O.appendTo, 42, source)
    expect(result1).toEqual(['foo', 'bar', 42])
  })
})
