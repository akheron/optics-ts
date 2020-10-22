import * as O from '../src/index'

describe('equivalence', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const eq = O.optic_<Source>()

  it('get', () => {
    const result: Source = O.get(eq)(source)
    expect(result).toEqual(source)
  })
  it('set - polymorphic', () => {
    const result: number = O.set(eq)(123)(source)
    expect(result).toEqual(123)
  })
})

describe('lens/iso', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic<Source>()
    .prop('foo')
    .iso(
      a => ({ value: a.bar.baz }),
      b => ({ bar: { baz: b.value } })
    )
  type Focus = { value: string }

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual({ value: 'quux' })
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens)({ value: 'UPDATED' })(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)(x => ({
      value: `${x.value} UPDATED`,
    }))(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })

  // iso is monomorphic -> polymorphic set/modify is not possible
})

describe('lens/prop', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>().prop('foo').prop('bar').prop('baz')
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens)('UPDATED')(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)(x => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result: Target = O.set(lens)(999)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result: Target = O.modify(lens)(x => x.length)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})

describe('lens/path', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>().path(['foo', 'bar', 'baz'])
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens)('UPDATED')(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)(x => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 'quux UPDATED' } },
      xyzzy: 42,
    })
  })

  type Target = { foo: { bar: { baz: number } }; xyzzy: number }
  it('set - polymorphic', () => {
    const result: Target = O.set(lens)(999)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('modify - polymorphic', () => {
    const result: Target = O.modify(lens)(x => x.length)(source)
    expect(result).toEqual({
      foo: { bar: { baz: 4 } },
      xyzzy: 42,
    })
  })
})
describe('lens/path/prop', () => {
  type Source = { foo: { bar: { baz: string } }; xyzzy: number }
  const source: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }

  const lens = O.optic_<Source>().prop('foo.bar.baz')
  type Focus = string

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual('quux')
  })

})

describe('lens/pick', () => {
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

  const lens = O.optic_<Source>().pick(['foo', 'bar', 'baz'])
  type Focus = { foo: string; bar: boolean; baz: { quux: number } }

  it('get', () => {
    const result: Focus = O.get(lens)(source)
    expect(result).toEqual({ foo: 'blurp', bar: true, baz: { quux: 42 } })
  })

  it('set - monomorphic', () => {
    const result: Source = O.set(lens)({
      foo: 'updated',
      bar: false,
      baz: { quux: 0 },
    })(source)
    expect(result).toEqual({
      foo: 'updated',
      bar: false,
      baz: { quux: 0 },
      xyzzy: 999,
    })
  })
  it('modify - monomorphic', () => {
    const result: Source = O.modify(lens)(({ foo, bar, baz }) => ({
      foo: `${foo} UPDATED`,
      bar: !bar,
      baz: { quux: baz.quux * 100 },
    }))(source)
    expect(result).toEqual({
      foo: 'blurp UPDATED',
      bar: false,
      baz: { quux: 4200 },
      xyzzy: 999,
    })
  })

  type Target = {
    foo: number
    baz: number
    added: string
    xyzzy: number
  }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(lens)(({ foo, bar, baz }) => ({
      foo: foo.length + +bar,
      baz: baz.quux,
      added: 'wow',
    }))(source)
    expect(result).toEqual({
      foo: 6,
      baz: 42,
      added: 'wow',
      xyzzy: 999,
    })
  })
})

describe('at (on array)', () => {
  type Source = string[]
  const source1: Source = ['foo', 'bar', 'baz', 'quux']
  const source2: Source = ['foo']

  const prism = O.optic_<Source>().at(1)
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('bar')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual(['foo', 'UPDATED', 'baz', 'quux'])
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })
  it('modify defined - monomorphic', () => {
    const result: Source = O.modify(prism)(x => `${x} UPDATED`)(source1)
    expect(result).toEqual(['foo', 'bar UPDATED', 'baz', 'quux'])
  })
  it('modify undefined - monomorphic', () => {
    const result: Source = O.modify(prism)(x => `${x} UPDATED`)(source2)
    expect(result).toEqual(source2)
  })

  type Target = Array<string | number>
  it('modify defined - polymorphic', () => {
    const result: Target = O.modify(prism)(x => x.length)(source1)
    expect(result).toEqual(['foo', 3, 'baz', 'quux'])
  })
  it('modify undefined - polymorphic', () => {
    const result: Target = O.modify(prism)(x => x.length)(source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source = O.remove(prism)(source1)
    expect(result).toEqual(['foo', 'baz', 'quux'])
  })

  it('remove undefined', () => {
    const result: Source = O.remove(prism)(source2)
    expect(result).toEqual(['foo'])
  })
})

describe('at (on string)', () => {
  type Source = string
  const source1: Source = 'foobarbaz'
  const source2: Source = 'foo'

  const prism = O.optic_<string>().at(3)
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('b')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual('fooUPDATEDarbaz')
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source = O.remove(prism)(source1)
    expect(result).toEqual('fooarbaz')
  })

  it('remove undefined', () => {
    const result: Source = O.remove(prism)(source2)
    expect(result).toEqual('foo')
  })
})

describe('lens/optional', () => {
  type Source = { foo: { bar: { baz: string } | undefined }; xyzzy: number }
  const source1: Source = { foo: { bar: { baz: 'quux' } }, xyzzy: 42 }
  const source2: Source = { foo: { bar: undefined }, xyzzy: 42 }

  const prism = O.optic_<Source>()
    .prop('foo')
    .prop('bar')
    .optional()
    .prop('baz')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('quux')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual({
      foo: { bar: { baz: 'UPDATED' } },
      xyzzy: 42,
    })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: { bar: { baz: number } | undefined }; xyzzy: number }
  it('set defined - polymorphic', () => {
    const result: Target = O.set(prism)(999)(source1)
    expect(result).toEqual({
      foo: { bar: { baz: 999 } },
      xyzzy: 42,
    })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(prism)(999)(source2)
    expect(result).toEqual(source2)
  })
})

describe('lens/guard_', () => {
  type Inner<T> = Bar<T> | Baz
  type Bar<T> = { bar: T }
  type Baz = { baz: boolean }

  function isBar<T>(v: Inner<T>): v is Bar<T> {
    return v.hasOwnProperty('bar')
  }

  interface InnerBarF extends O.HKT {
    0: this[1] extends Bar<any> ? Inner<this[1]['bar']> : never
  }

  type Source = { foo: Inner<string> }
  const source1: Source = { foo: { bar: 'quux' } }
  const source2: Source = { foo: { baz: false } }

  const prism = O.optic_<Source>()
    .prop('foo')
    .guard_<InnerBarF>()(isBar)
    .prop('bar')
  type Focus = string | undefined

  it('preview matching', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('quux')
  })
  it('preview non-matching', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set non-matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: Inner<number> }
  it('modify matching - polymorphic', () => {
    const result: Target = O.modify(prism)(x => x.length)(source1)
    expect(result).toEqual({
      foo: { bar: 4 },
    })
  })
  it('modify non-matching - polymorphic', () => {
    const result: Target = O.modify(prism)(x => x.length)(source2)
    expect(result).toEqual(source2)
  })
})

describe('lens/guard', () => {
  type Bar = { bar: string }
  type Baz = { baz: number }

  function isBar(v: Bar | Baz): v is Bar {
    return v.hasOwnProperty('bar')
  }

  type Source = { foo: Bar | Baz }
  const source1: Source = { foo: { bar: 'quux' } }
  const source2: Source = { foo: { baz: 42 } }

  const prism = O.optic_<Source>().prop('foo').guard(isBar).prop('bar')
  type Focus = string | undefined

  it('preview matching', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('quux')
  })
  it('preview non-matching', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set non-matching - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  // guard is monomorphic -> polymorphic set/modify is not possible
})

describe('find', () => {
  type Source = { bar: string }
  const source1: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]
  const source2: Source[] = [
    { bar: 'baz' },
    { bar: 'nomatch' },
    { bar: 'xyzzy' },
  ]

  const prism = O.optic_<Source[]>().find(item => item.bar === 'quux')
  type Focus = Source | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual({ bar: 'quux' })
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('modify defined - monomorphic', () => {
    const result: Source[] = O.modify(prism)(x => ({
      bar: `${x.bar} UPDATED`,
    }))(source1)
    expect(result).toEqual([
      { bar: 'baz' },
      { bar: 'quux UPDATED' },
      { bar: 'xyzzy' },
    ])
  })
  it('modify undefined - monomorphic', () => {
    const result: Source[] = O.modify(prism)(x => ({
      bar: `${x.bar} UPDATED`,
    }))(source2)
    expect(result).toEqual(source2)
  })

  type Target = { bar: string } | number
  it('modify defined - polymorphic', () => {
    const result: Target[] = O.modify(prism)(x => x.bar.length)(source1)
    expect(result).toEqual([{ bar: 'baz' }, 4, { bar: 'xyzzy' }])
  })
  it('modify undefined - polymorphic', () => {
    const result: Target[] = O.modify(prism)(x => x.bar.length)(source2)
    expect(result).toEqual(source2)
  })

  it('remove defined', () => {
    const result: Source[] = O.remove(prism)(source1)
    expect(result).toEqual([{ bar: 'baz' }, { bar: 'xyzzy' }])
  })
  it('remove undefined', () => {
    const result: Source[] = O.remove(prism)(source2)
    expect(result).toEqual(source2)
  })
})

describe('lens/when', () => {
  type Source = { foo: number }
  const source1 = { foo: 5 }
  const source2 = { foo: 15 }

  const prism = O.optic_<Source>()
    .prop('foo')
    .when(x => x < 10)
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
    const result: Source = O.modify(prism)(x => -x)(source1)
    expect(result).toEqual({ foo: -5 })
  })
  it('modify defined', () => {
    const result: Source = O.modify(prism)(x => -x)(source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: number | string }
  it('modify defined - polymorphic', () => {
    const result: Target = O.modify(prism)(x => `${x}`)(source1)
    expect(result).toEqual({ foo: '5' })
  })
  it('modify undefined - polymorphic', () => {
    const result: Target = O.modify(prism)(x => `${x}`)(source2)
    expect(result).toEqual(source2)
  })
})

describe('lens/filter', () => {
  type Source = { bar: string }
  const source: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]

  const traversal = O.optic_<Source[]>()
    .filter(item => item.bar !== 'quux')
    .elems()
    .prop('bar')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['baz', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)(x => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { bar: 'baz UPDATED' },
      { bar: 'quux' },
      { bar: 'xyzzy UPDATED' },
    ])
  })

  type Target = { bar: string | boolean }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)(x => x.length === 3)(source)
    expect(result).toEqual([{ bar: true }, { bar: 'quux' }, { bar: false }])
  })
})

describe('valueOr', () => {
  type Source = { foo?: string | undefined }
  const source1: Source = { foo: 'bar' }
  const source2: Source = {}

  const lens = O.optic_<Source>().prop('foo').valueOr(42)
  type Focus = string | number

  it('get defined', () => {
    const result: Focus = O.get(lens)(source1)
    expect(result).toEqual('bar')
  })
  it('get undefined', () => {
    const result: Focus = O.get(lens)(source2)
    expect(result).toEqual(42)
  })

  type Target = { foo: boolean }
  it('set defined - polymorphic', () => {
    const result: Target = O.set(lens)(true)(source1)
    expect(result).toEqual({ foo: true })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(lens)(false)(source2)
    expect(result).toEqual({ foo: false })
  })
})

describe('lens/elems', () => {
  type Source = { foo: Array<{ bar: string }>; other: number }
  const source: Source = {
    foo: [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }],
    other: 42,
  }

  const traversal = O.optic_<Source>().prop('foo').elems().prop('bar')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['baz', 'quux', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)(x => `${x} UPDATED`)(source)
    expect(result).toEqual({
      foo: [
        { bar: 'baz UPDATED' },
        { bar: 'quux UPDATED' },
        { bar: 'xyzzy UPDATED' },
      ],
      other: 42,
    })
  })

  type Target = { foo: Array<{ bar: boolean }>; other: number }
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)(x => x.length === 4)(source)
    expect(result).toEqual({
      foo: [{ bar: false }, { bar: true }, { bar: false }],
      other: 42,
    })
  })
})

describe('lens/to', () => {
  type Source = { foo: string; xyzzy: number }
  const source: Source = { foo: 'foobarfoobar', xyzzy: 42 }

  const getter = O.optic_<Source>()
    .prop('foo')
    .to(s => s.length / 2)
  type Focus = number

  it('get', () => {
    const result: Focus = O.get(getter)(source)
    expect(result).toEqual(6)
  })
})

describe('prism/prop', () => {
  type Source = { foo: { bar: string } } | undefined
  const source: Source = { foo: { bar: 'baz' } }

  const prism = O.optic_<Source>().optional().prop('foo').prop('bar')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source)
    expect(result).toEqual('baz')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(undefined)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source)
    expect(result).toEqual({ foo: { bar: 'UPDATED' } })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(undefined)
    expect(result).toBeUndefined()
  })

  type Target = { foo: { bar: number } } | undefined
  it('set defined - polymorphic', () => {
    const result: Target = O.set(prism)(42)(source)
    expect(result).toEqual({ foo: { bar: 42 } })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(prism)(42)(undefined)
    expect(result).toBeUndefined()
  })
})

describe('prism/optional', () => {
  type Source = { foo: { bar: string } | undefined } | undefined
  const source1: Source = { foo: { bar: 'baz' } }
  const source2: Source = { foo: undefined }

  const prism = O.optic_<Source>().optional().prop('foo').optional().prop('bar')
  type Focus = string | undefined

  it('preview defined', () => {
    const result: Focus = O.preview(prism)(source1)
    expect(result).toEqual('baz')
  })
  it('preview undefined', () => {
    const result: Focus = O.preview(prism)(source2)
    expect(result).toBeUndefined()
  })

  it('set defined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source1)
    expect(result).toEqual({
      foo: { bar: 'UPDATED' },
    })
  })
  it('set undefined - monomorphic', () => {
    const result: Source = O.set(prism)('UPDATED')(source2)
    expect(result).toEqual(source2)
  })

  type Target = { foo: { bar: number } | undefined } | undefined
  it('set defined - polymorphic', () => {
    const result: Target = O.set(prism)(42)(source1)
    expect(result).toEqual({
      foo: { bar: 42 },
    })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(prism)(42)(source2)
    expect(result).toEqual(source2)
  })
})

describe('prism/to', () => {
  type Source = { foo: string } | undefined
  const source: Source = { foo: 'foobarfoobar' }

  const affineFold = O.optic_<Source>()
    .optional()
    .prop('foo')
    .to(s => s.length / 2)
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

describe('traversal/prop', () => {
  type Source = { bar: string }
  const source: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]

  const traversal = O.optic_<Source[]>().elems().prop('bar')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['baz', 'quux', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)(x => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { bar: 'baz UPDATED' },
      { bar: 'quux UPDATED' },
      { bar: 'xyzzy UPDATED' },
    ])
  })

  type Target = { bar: number }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)(x => x.length)(source)
    expect(result).toEqual([{ bar: 3 }, { bar: 4 }, { bar: 5 }])
  })
})

describe('traversal/optional', () => {
  type Source = { bar: string } | undefined
  const source: Source[] = [{ bar: 'baz' }, undefined, { bar: 'xyzzy' }]

  const traversal = O.optic_<Source[]>().elems().optional().prop('bar')
  type Focus = Array<string>

  it('collect', () => {
    const result: Focus | undefined = O.collect(traversal)(source)
    expect(result).toEqual(['baz', 'xyzzy'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)(x => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { bar: 'baz UPDATED' },
      undefined,
      { bar: 'xyzzy UPDATED' },
    ])
  })

  type Target = { bar: number } | undefined
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)(x => x.length)(source)
    expect(result).toEqual([{ bar: 3 }, undefined, { bar: 5 }])
  })
})

describe('traversal/to', () => {
  type Source = { bar: string }
  const source: Source[] = [{ bar: 'baz' }, { bar: 'quux' }, { bar: 'xyzzy' }]

  const fold = O.optic_<Source[]>()
    .elems()
    .prop('bar')
    .to(s => s.length / 2)
  type Focus = number[]

  it('collect', () => {
    const result: Focus = O.collect(fold)(source)
    expect(result).toEqual([1.5, 2, 2.5])
  })
})

describe('traversal/prop/prop', () => {
  type Source = { bar: { baz: string } }
  const source: Source[] = [
    { bar: { baz: 'a' } },
    { bar: { baz: 'b' } },
    { bar: { baz: 'c' } },
  ]

  const traversal = O.optic_<Source[]>().elems().prop('bar').prop('baz')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)(x => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { bar: { baz: 'a UPDATED' } },
      { bar: { baz: 'b UPDATED' } },
      { bar: { baz: 'c UPDATED' } },
    ])
  })

  type Target = { bar: { baz: number } }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)(x => x.charCodeAt(0))(source)
    expect(result).toEqual([
      { bar: { baz: 97 } },
      { bar: { baz: 98 } },
      { bar: { baz: 99 } },
    ])
  })
})

describe('traversal/filter', () => {
  type Source = { type: number; value: string }
  const source: Source[] = [
    { type: 1, value: 'foo' },
    { type: 2, value: 'bar' },
    { type: 3, value: 'baz' },
    { type: 4, value: 'quux' },
  ]

  const traversal = O.optic_<Source[]>()
    .filter(item => item.type % 2 == 0)
    .elems()
    .prop('value')
  type Focus = string[]

  it('collect', () => {
    const result: Focus = O.collect(traversal)(source)
    expect(result).toEqual(['bar', 'quux'])
  })

  it('modify - monomorphic', () => {
    const result: Source[] = O.modify(traversal)(x => `${x} UPDATED`)(source)
    expect(result).toEqual([
      { type: 1, value: 'foo' },
      { type: 2, value: 'bar UPDATED' },
      { type: 3, value: 'baz' },
      { type: 4, value: 'quux UPDATED' },
    ])
  })

  type Target = { type: number; value: string | number }
  it('modify - polymorphic', () => {
    const result: Target[] = O.modify(traversal)(x => x.length)(source)
    expect(result).toEqual([
      { type: 1, value: 'foo' },
      { type: 2, value: 3 },
      { type: 3, value: 'baz' },
      { type: 4, value: 4 },
    ])
  })
})

describe('traversal/elems', () => {
  type Source = number[][]
  const source: Source = [
    [65, 66],
    [67, 68],
  ]

  const traversal = O.optic_<number[][]>().elems().elems()
  type Focus = number

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual([65, 66, 67, 68])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)(x => x / 10)(source)
    expect(result).toEqual([
      [6.5, 6.6],
      [6.7, 6.8],
    ])
  })

  type Target = string[][]
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)(x => String.fromCharCode(x))(
      source
    )
    expect(result).toEqual([
      ['A', 'B'],
      ['C', 'D'],
    ])
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
    .when(x => x % 2 == 0)
  type Focus = number

  it('collect', () => {
    const result: Focus[] = O.collect(traversal)(source)
    expect(result).toEqual([66, 68, 70])
  })

  it('modify - monomorphic', () => {
    const result: Source = O.modify(traversal)(x => -x)(source)
    expect(result).toEqual([
      [65, -66],
      [-68, 69, -70],
    ])
  })

  type Target = (string | number)[][]
  it('modify - polymorphic', () => {
    const result: Target = O.modify(traversal)(x => String.fromCharCode(x))(
      source
    )
    expect(result).toEqual([
      [65, 'B'],
      ['D', 69, 'F'],
    ])
  })
})

describe('prependTo & appendTo', () => {
  const prepend = O.optic_<Source>().prependTo()
  const append = O.optic_<Source>().appendTo()

  type Source = string[]
  const source = ['foo', 'bar']

  it('write - monomorphic', () => {
    const result1: Source = O.set(prepend)('abc')(source)
    expect(result1).toEqual(['abc', 'foo', 'bar'])
    const result2: Source = O.set(append)('abc')(source)
    expect(result2).toEqual(['foo', 'bar', 'abc'])
  })

  type Target = (string | number)[]
  it('write - polymorphic', () => {
    const result1: Target = O.set(prepend)(42)(source)
    expect(result1).toEqual([42, 'foo', 'bar'])
    const result2: Target = O.set(append)(42)(source)
    expect(result2).toEqual(['foo', 'bar', 42])
  })
})

describe('strings', () => {
  describe('chars', () => {
    const traversal = O.optic<string>().chars()

    it('read', () => {
      const result: string[] = O.collect(traversal)('foo')
      expect(result).toEqual(['f', 'o', 'o'])
    })

    it('write', () => {
      const nextChar = (c: string) => String.fromCharCode(c.charCodeAt(0) + 1)
      const result: string = O.modify(traversal)(nextChar)('foo')
      expect(result).toEqual('gpp')
    })

    it('write longer', () => {
      const result: string = O.modify(traversal)(s => s + s)('abc')
      expect(result).toEqual('aabbcc')
    })

    it('remove chars', () => {
      const result: string = O.modify(traversal)(s =>
        s === 'b' || s === 'f' ? '' : s
      )('abcdef')
      expect(result).toEqual('acde')
    })
  })

  describe('words', () => {
    const traversal = O.optic<string>().words()

    it('read', () => {
      const source = ' foo  bar baz  '
      const result: string[] = O.collect(traversal)(source)
      expect(result).toEqual(['foo', 'bar', 'baz'])
    })

    it('write', () => {
      const source = ' foo  bar baz  '
      const result: string = O.modify(traversal)(s => s.toUpperCase())(source)
      expect(result).toEqual(' FOO  BAR BAZ  ')
    })

    it('write longer', () => {
      const source = ' foo  bar baz  '
      const result: string = O.modify(traversal)(s => s + s)(source)
      expect(result).toEqual(' foofoo  barbar bazbaz  ')
    })

    it('write shorter', () => {
      const source = ' foo  bar baz  '
      const result: string = O.modify(traversal)(s =>
        s === 'bar' ? '' : s === 'foo' ? 'f' : s
      )(source)
      expect(result).toEqual(' f   baz  ')
    })
  })
})

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
