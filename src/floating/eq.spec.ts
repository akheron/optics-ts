import * as O from '.'

describe('eq', () => {
  it('get', () => {
    const result: number = O.get(O.eq, 123)
    expect(result).toEqual(123)
  })

  it('set', () => {
    const result: string = O.set(O.eq, 'foo', 123)
    expect(result).toEqual('foo')
  })
})
