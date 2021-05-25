import * as O from '.'

describe('chars', () => {
  it('read', () => {
    const result: string[] = O.collect(O.chars, 'foo')
    expect(result).toEqual(['f', 'o', 'o'])
  })

  it('write', () => {
    const nextChar = (c: string) => String.fromCharCode(c.charCodeAt(0) + 1)
    const result: string = O.modify(O.chars, nextChar, 'foo')
    expect(result).toEqual('gpp')
  })

  it('write longer', () => {
    const result: string = O.modify(O.chars, (s) => s + s, 'abc')
    expect(result).toEqual('aabbcc')
  })

  it('remove chars', () => {
    const result: string = O.modify(
      O.chars,
      (s) => (s === 'b' || s === 'f' ? '' : s),
      'abcdef'
    )
    expect(result).toEqual('acde')
  })
})
