import * as O from '.'

describe('rewrite', () => {
  const lens = O.rewrite((x: string) => x.toUpperCase())

  it('get', () => {
    const result: string = O.get(lens, 'foo')
    expect(result).toEqual('foo')
  })

  it('set - monomorphic', () => {
    const result: string = O.set(lens, 'foo', '')
    expect(result).toEqual('FOO')
  })

  // rewrite() is monomorphic
})
