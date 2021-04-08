import * as O from '.'

describe('iso', () => {
  type Source = string
  const source: Source = 'foo'

  const optic = O.iso(
    (x: string) => x.split(''),
    (x: string[]) => x.join('')
  )
  type Focus = string[]

  it('get', () => {
    const result: Focus = O.get(optic, source)
    expect(result).toEqual(['f', 'o', 'o'])
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(optic, ['a', 'b'], source)
    expect(result).toEqual('ab')
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(optic, (x) => [...x].reverse(), source)
    expect(result).toEqual('oof')
  })
})
