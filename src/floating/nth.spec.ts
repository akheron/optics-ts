import * as O from '.'

describe('nth', () => {
  type Source = [boolean, 'foo' | 'bar', number | undefined]
  const source1: Source = [true, 'foo', 42]
  const source2: Source = [false, 'bar', undefined]

  it('get 0', () => {
    const lens = O.nth(0)
    type Focus = boolean

    const result1: Focus = O.get(lens, source1)
    expect(result1).toEqual(true)

    const result2: Focus = O.get(lens, source2)
    expect(result2).toEqual(false)
  })

  it('get 1', () => {
    const lens = O.nth(1)
    type Focus = 'foo' | 'bar'

    const result1: Focus = O.get(lens, source1)
    expect(result1).toEqual('foo')

    const result2: Focus = O.get(lens, source2)
    expect(result2).toEqual('bar')
  })

  it('get 2', () => {
    const lens = O.nth(2)
    type Focus = number | undefined

    const result1: Focus = O.get(lens, source1)
    expect(result1).toEqual(42)

    const result2: Focus = O.get(lens, source2)
    expect(result2).toBeUndefined()
  })

  it('set - monomorphic', () => {
    const lens = O.nth(1)
    const result: Source = O.set(lens, 'bar' as const, source1)
    expect(result).toEqual([true, 'bar', 42])
  })

  it('set - polymorphic', () => {
    const lens = O.nth(1)
    type Target = [boolean, { foo: string }, number | undefined]
    const result: Target = O.set(lens, { foo: 'hello' }, source1)
    expect(result).toEqual([true, { foo: 'hello' }, 42])
  })
})
