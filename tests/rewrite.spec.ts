import * as O from '../src/index'

describe('rewrite', () => {
  const lens = O.optic<string>().rewrite((x) => x.toUpperCase())

  it('get', () => {
    const result: string = O.get(lens)('foo')
    expect(result).toEqual('foo')
  })

  it('set - monomorphic', () => {
    const result: string = O.set(lens)('foo')('')
    expect(result).toEqual('FOO')
  })

  // rewrite() is monomorphic
})
