import * as O from '../src/index'

describe('compose', () => {
  it('lens - lens', () => {
    type Source = { foo: Inner }
    type Inner = { bar: number }

    const lens1 = O.optic<Source>().prop('foo')
    const lens2 = O.optic<Inner>().prop('bar')
    const lens = O.compose(lens1, lens2)
    type Focus = number

    const source: Source = { foo: { bar: 42 } }
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual(42)
  })

  describe('lens - prism', () => {
    type Source = { foo: Inner }
    type Inner = { bar: number } | undefined

    const lens1 = O.optic<Source>().prop('foo')
    const prism2 = O.optic<Inner>().optional().prop('bar')
    const prism = O.compose(lens1, prism2)
    type Focus = number | undefined

    it('defined', () => {
      const source: Source = { foo: { bar: 42 } }
      const result: Focus = O.preview(prism)(source)
      expect(result).toEqual(42)
    })
    it('undefined', () => {
      const source: Source = { foo: undefined }
      const result: Focus = O.preview(prism)(source)
      expect(result).toBeUndefined
    })
  })

  it('lens - traversal', () => {
    type Source = { foo: Inner }
    type Inner = number[]

    const lens1 = O.optic<Source>().prop('foo')
    const traversal2 = O.optic<Inner>().elems()
    const traversal = O.compose(lens1, traversal2)
    type Focus = number[]

    const source: Source = { foo: [10, 20, 30] }
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual([10, 20, 30])
  })

  describe('prism - lens', () => {
    type Source = Inner | undefined
    type Inner = { bar: number }

    const prism1 = O.optic<Source>().optional()
    const lens2 = O.optic<Inner>().prop('bar')
    const prism = O.compose(prism1, lens2)
    type Focus = number | undefined

    it('defined', () => {
      const source: Source = { bar: 42 }
      const result: Focus = O.preview(prism)(source)
      expect(result).toEqual(42)
    })
    it('undefined', () => {
      const source: Source = undefined
      const result: Focus = O.preview(prism)(source)
      expect(result).toBeUndefined()
    })
  })

  describe('prism - prism', () => {
    type Source = Inner | undefined
    type Inner = { bar: number | undefined }

    const prism1 = O.optic<Source>().optional()
    const prism2 = O.optic<Inner>().prop('bar')
    const prism = O.compose(prism1, prism2)
    type Focus = number | undefined

    it('defined/defined', () => {
      const source: Source = { bar: 42 }
      const result: Focus = O.preview(prism)(source)
      expect(result).toEqual(42)
    })
    it('defined/undefined', () => {
      const source: Source = { bar: undefined }
      const result: Focus = O.preview(prism)(source)
      expect(result).toBeUndefined()
    })
    it('undefined', () => {
      const source: Source = undefined
      const result: Focus = O.preview(prism)(source)
      expect(result).toBeUndefined()
    })
  })

  describe('prism - traversal', () => {
    type Source = Inner | undefined
    type Inner = number[]

    const prism1 = O.optic<Source>().optional()
    const traversal2 = O.optic<Inner>().elems()
    const traversal = O.compose(prism1, traversal2)
    type Focus = number[] | undefined

    it('defined', () => {
      const source: Source = [10, 20, 30]
      const result: Focus = O.collect(traversal)(source)
      expect(result).toEqual([10, 20, 30])
    })
    it('undefined', () => {
      const source: Source = undefined
      const result: Focus = O.collect(traversal)(source)
      expect(result).toEqual([])
    })
  })

  it('traversal - lens', () => {
    type Source = Inner[]
    type Inner = { bar: number }

    const traversal1 = O.optic<Source>().elems()
    const lens2 = O.optic<Inner>().prop('bar')
    const traversal = O.compose(traversal1, lens2)
    type Focus = number[]

    const source: Source = [{ bar: 10 }, { bar: 20 }, { bar: 30 }]
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual([10, 20, 30])
  })

  it('traversal - prism', () => {
    type Source = Inner[]
    type Inner = number | undefined

    const traversal1 = O.optic<Source>().elems()
    const prism2 = O.optic<Inner>().optional()
    const traversal = O.compose(traversal1, prism2)
    type Focus = number[]

    const source: Source = [10, undefined, 30]
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual([10, 30])
  })

  it('traversal - traversal', () => {
    type Source = Inner[]
    type Inner = number[]

    const traversal1 = O.optic<Source>().elems()
    const traversal2 = O.optic<Inner>().elems()
    const traversal = O.compose(traversal1, traversal2)
    type Focus = number[]

    const source: Source = [[10, 20], [30], [40, 50]]
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual([10, 20, 30, 40, 50])
  })
})
