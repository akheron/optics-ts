import * as O from '.'

describe('get', () => {
  const optic = O.prop('foo')
  const source = { foo: 'bar' }
  type Focus = string

  it('total', () => {
    const result: Focus = O.get(optic, source)
    expect(result).toEqual('bar')
  })
  it('partial', () => {
    const result: Focus = O.get(optic)(source)
    expect(result).toEqual('bar')
  })
})

describe('preview', () => {
  const optic = O.at(0)
  const source = ['bar']
  type Focus = string | undefined

  it('total', () => {
    const result: Focus = O.preview(optic, source)
    expect(result).toEqual('bar')
  })
  it('partial', () => {
    const result: Focus = O.preview(optic)(source)
    expect(result).toEqual('bar')
  })
})

describe('collect', () => {
  const optic = O.elems
  const source = ['bar']
  type Focus = string[]

  it('total', () => {
    const result: Focus = O.collect(optic, source)
    expect(result).toEqual(['bar'])
  })
  it('partial', () => {
    const result: Focus = O.collect(optic)(source)
    expect(result).toEqual(['bar'])
  })
})

describe('modify', () => {
  const optic = O.prop('foo')
  const source = { foo: 'bar' }
  type Target = { foo: number }

  it('total', () => {
    const result: Target = O.modify(optic, (x) => x.length, source)
    expect(result).toEqual({ foo: 3 })
  })
  it('partial1', () => {
    const result: Target = O.modify(optic, (x: string) => x.length)(source)
    expect(result).toEqual({ foo: 3 })
  })
  it('partial2', () => {
    const result: Target = O.modify(optic)((x: string) => x.length)(source)
    expect(result).toEqual({ foo: 3 })
  })
})

describe('set', () => {
  const optic = O.prop('foo')
  const source = { foo: 'bar' }
  type Target = { foo: number }

  it('total', () => {
    const result: Target = O.set(optic, 42, source)
    expect(result).toEqual({ foo: 42 })
  })
  it('partial1', () => {
    const result: Target = O.set(optic, 42)(source)
    expect(result).toEqual({ foo: 42 })
  })
  it('partial2', () => {
    const result: Target = O.set(optic)(42)(source)
    expect(result).toEqual({ foo: 42 })
  })
})

describe('remove', () => {
  const optic = O.at(0)
  const source = [1, 2]
  type Target = number[]

  it('total', () => {
    const result: Target = O.remove(optic, source)
    expect(result).toEqual([2])
  })
  it('partial', () => {
    const result: Target = O.remove(optic)(source)
    expect(result).toEqual([2])
  })
})
