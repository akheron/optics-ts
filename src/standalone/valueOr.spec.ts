import * as O from '.'

describe('valueOr', () => {
  type Source = { foo?: string | undefined }
  const source1: Source = { foo: 'bar' }
  const source2: Source = {}

  const lens = O.compose('foo', O.valueOr(42))
  type Focus = string | number

  it('get defined', () => {
    const result: Focus = O.get(lens, source1)
    expect(result).toEqual('bar')
  })
  it('get undefined', () => {
    const result: Focus = O.get(lens, source2)
    expect(result).toEqual(42)
  })

  type Target = { foo: boolean }
  it('set defined - polymorphic', () => {
    const result: Target = O.set(lens, true, source1)
    expect(result).toEqual({ foo: true })
  })
  it('set undefined - polymorphic', () => {
    const result: Target = O.set(lens, false, source2)
    expect(result).toEqual({ foo: false })
  })
})
