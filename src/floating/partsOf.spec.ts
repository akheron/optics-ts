import * as O from '.'

describe('partsOf', () => {
  type Source = { foo: number[] }[]
  const source = [{ foo: [1, 2] }, { foo: [] }, { foo: [3] }]

  const lens = O.partsOf(O.elems, 'foo', O.elems)
  type Focus = number[]

  it('get - single argument', () => {
    const lens = O.partsOf(O.compose(O.elems, 'foo', O.elems))
    const result: Focus = O.get(lens, source)
    expect(result).toEqual([1, 2, 3])
  })

  it('get', () => {
    const result: Focus = O.get(lens, source)
    expect(result).toEqual([1, 2, 3])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens, (x) => [x[1], x[2], x[0]], source)
    expect(result).toEqual([{ foo: [2, 3] }, { foo: [] }, { foo: [1] }])
  })

  type Target = { foo: string[] }[]
  it('modify - polymorphic', () => {
    const result: Target = O.set(lens, ['baz', 'quux', 'xyzzy'], source)
    expect(result).toEqual([
      { foo: ['baz', 'quux'] },
      { foo: [] },
      { foo: ['xyzzy'] },
    ])
  })

  it('lol', () => {
    const result = O.modify(
      O.partsOf(O.words),
      (words) => [...words].reverse(),
      'this is a test'
    )
    expect(result).toEqual('test a is this')
  })

  it('disallows add/remove', () => {
    expect(() => {
      O.set(lens, [], source)
    }).toThrow('cannot add/remove elements through partsOf')
    expect(() => {
      O.set(lens, [1, 2, 3, 4], source)
    }).toThrow('cannot add/remove elements through partsOf')
  })
})
