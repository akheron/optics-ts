import * as O from '../src/index'

describe('partsOf', () => {
  type Source = { foo: number[] }[]
  const source = [{ foo: [1, 2] }, { foo: [] }, { foo: [3] }]

  const lens = O.optic_<Source>().partsOf((o) => o.elems().prop('foo').elems())
  type Focus = number[]

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual([1, 2, 3])
  })

  it('get - partsOf with static traversal arg', () => {
    const lens2 = O.optic_<Source>().partsOf(
      O.optic_<Source>().elems().prop('foo').elems()
    )
    const result: Focus = O.get(lens2)(source)
    expect(result).toEqual([1, 2, 3])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)((x) => [x[1], x[2], x[0]])(source)
    expect(result).toEqual([{ foo: [2, 3] }, { foo: [] }, { foo: [1] }])
  })

  type Target = { foo: string[] }[]
  it('modify - polymorphic', () => {
    const result: Target = O.set(lens)(['baz', 'quux', 'xyzzy'])(source)
    expect(result).toEqual([
      { foo: ['baz', 'quux'] },
      { foo: [] },
      { foo: ['xyzzy'] },
    ])
  })

  it('lol', () => {
    const result = O.modify(O.optic<string>().partsOf((o) => o.words()))(
      (words) => [...words].reverse()
    )('this is a test')
    expect(result).toEqual('test a is this')
  })

  it('disallows add/remove', () => {
    expect(() => {
      O.set(lens)([])(source)
    }).toThrow('cannot add/remove elements through partsOf')
    expect(() => {
      O.set(lens)([1, 2, 3, 4])(source)
    }).toThrow('cannot add/remove elements through partsOf')
  })
})
