import * as O from '../src/index'

describe('lens/omit', () => {
  type Source = {
    foo: string
    bar: boolean
    baz: { quux: number }
    xyzzy: number
  }
  const source: Source = {
    foo: 'blurp',
    bar: true,
    baz: { quux: 42 },
    xyzzy: 999,
  }

  const lens = O.optic_<Source>().omit(['foo'])
  type Focus = {
    bar: boolean
    baz: { quux: number }
    xyzzy: number
  }

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual({ bar: true, baz: { quux: 42 }, xyzzy: 999 })
  })

  it('set - monomorphic', () => {
    const result: Focus = O.set(lens)({
      bar: false,
      baz: { quux: 0 },
      xyzzy: 1,
    })(source)
    expect(result).toEqual({
      bar: false,
      baz: { quux: 0 },
      xyzzy: 1,
    })
  })
  it('modify - monomorphic', () => {
    const result: Focus = O.modify(lens)(({ bar, baz, xyzzy }) => ({
      bar: !bar,
      baz: { quux: baz.quux * 100 },
      xyzzy: -1 * xyzzy,
    }))(source)
    expect(result).toEqual({
      bar: false,
      baz: { quux: 4200 },
      xyzzy: -999,
    })
  })

  type Target = {
    baz: number
    added: string
    xyzzy: string
  }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(lens)(({ baz }) => ({
      baz: baz.quux,
      added: 'wow',
      xyzzy: 'test',
    }))(source)
    expect(result).toEqual({
      baz: 42,
      bar: true,
      added: 'wow',
      xyzzy: 'test',
    })
  })
})
