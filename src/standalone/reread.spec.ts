import * as O from '.'

describe('reread', () => {
  const lens = O.reread((x: string) => x.toUpperCase())

  it('get', () => {
    const result: string = O.get(lens, 'foo')
    expect(result).toEqual('FOO')
  })

  it('set - monomorphic', () => {
    const result: string = O.set(lens, 'foo', '')
    expect(result).toEqual('foo')
  })

  // reread() is monomorphic
})
