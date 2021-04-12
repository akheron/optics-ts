import * as O from '../src/index'

describe('lens/when', () => {
  type Source = { foo: number }
  const source1 = { foo: 5 }
  const source2 = { foo: 15 }

  const prism = O.optic_<Source>()
    .prop('foo')
    .when((x) => x < 10)
  type Focus = number

  it('preview defined', () => {
    const result: Focus | undefined = O.preview(prism)(source1)
    expect(result).toEqual(5)
  })
  it('preview undefined', () => {
    const result: Focus | undefined = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('modify defined', () => {
    const result: Source = O.modify(prism)((x) => -x)(source1)
    expect(result).toEqual({ foo: -5 })
  })
  it('modify defined', () => {
    const result: Source = O.modify(prism)((x) => -x)(source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: number | string }
  it('modify defined - polymorphic', () => {
    const result: Target = O.modify(prism)((x) => `${x}`)(source1)
    expect(result).toEqual({ foo: '5' })
  })
  it('modify undefined - polymorphic', () => {
    const result: Target = O.modify(prism)((x) => `${x}`)(source2)
    expect(result).toEqual(source2)
  })
})

describe('traversal/when', () => {
  type Source = number[][]
  const source: Source = [
    [65, 66],
    [68, 69, 70],
  ]

  const traversal = O.optic_<number[][]>()
    .elems()
    .elems()
    .when((x) => x % 2 == 0)
  type Focus = number

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual([66, 68, 70])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)((x) => -x)(source)
    expect(result).toEqual([
      [65, -66],
      [-68, 69, -70],
    ])
  })

  type Target = (string | number)[][]
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)((x) => String.fromCharCode(x))(
      source
    )
    expect(result).toEqual([
      [65, 'B'],
      ['D', 69, 'F'],
    ])
  })
})
