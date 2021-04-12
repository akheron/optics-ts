import * as O from '../src/index'

describe('lens/to', () => {
  type Source = { foo: string; xyzzy: number }
  const source: Source = { foo: 'foobarfoobar', xyzzy: 42 }

  const getter = O.optic_<Source>()
    .prop('foo')
    .to((s) => s.length / 2)
  type Focus = number

  it('get', () => {
    const result: Focus = O.get(getter)(source)
    expect(result).toEqual(6)
  })
})

describe('prism/to', () => {
  type Source = { foo: string } | undefined
  const source: Source = { foo: 'foobarfoobar' }

  const affineFold = O.optic_<Source>()
    .optional()
    .prop('foo')
    .to((s) => s.length / 2)
  type Focus = number | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(affineFold)(source)
    expect(result).toEqual(6)
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(affineFold)(undefined)
    expect(result).toBeUndefined()
  })
})

describe('traversal/to', () => {
  type Source = { bar: string }
  const source: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]

  const fold = O.optic_<Source[]>()
    .elems()
    .prop('bar')
    .to((s) => s.length / 2)
  type Focus = number[]

  it('collect', () => {
    const result: Focus = O.collect(fold)(source)
    expect(result).toEqual([1.5, 2, 2.5])
  })
})
