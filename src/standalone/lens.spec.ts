import * as O from '.'

describe('lens', () => {
  type Source = string | number
  type Focus = number

  const optic = O.lens<Source, Focus>(
    (v) => (typeof v === 'string' ? 0 : v),
    (_, u) => u
  )

  it('get', () => {
    const result1: Focus = O.get(optic, 'foo')
    expect(result1).toEqual(0)

    const result2: Focus = O.get(optic, 100)
    expect(result2).toEqual(100)
  })

  it('set - monomorphic', () => {
    const result1: Source = O.set(optic, 1, 'foo')
    expect(result1).toEqual(1)

    const result2: Source = O.set(optic, 2, 100)
    expect(result2).toEqual(2)
  })

  it('modify - monomorphic', () => {
    const result1: Source = O.modify(optic, (x) => x + 10, 'foo')
    expect(result1).toEqual(10)

    const result2: Source = O.modify(optic, (x) => x + 10, 10)
    expect(result2).toEqual(20)
  })
})
