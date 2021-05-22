import * as O from '.'

describe('words', () => {
  it('read', () => {
    const source = ' foo  bar baz  '
    const result: string[] = O.collect(O.words, source)
    expect(result).toEqual(['foo', 'bar', 'baz'])
  })

  it('write', () => {
    const source = ' foo  bar baz  '
    const result: string = O.modify(O.words, (s) => s.toUpperCase(), source)
    expect(result).toEqual(' FOO  BAR BAZ  ')
  })

  it('write longer', () => {
    const source = ' foo  bar baz  '
    const result: string = O.modify(O.words, (s) => s + s, source)
    expect(result).toEqual(' foofoo  barbar bazbaz  ')
  })

  it('write shorter', () => {
    const source = ' foo  bar baz  '
    const result: string = O.modify(
      O.words,
      (s) => (s === 'bar' ? '' : s === 'foo' ? 'f' : s),
      source
    )
    expect(result).toEqual(' f   baz  ')
  })
})
