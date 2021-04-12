import * as O from '../src/index'

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
      const result: string = O.modify(traversal)((s) => s + s)('abc')
      expect(result).toEqual('aabbcc')
    })

    it('remove chars', () => {
      const result: string = O.modify(traversal)((s) =>
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
      const result: string = O.modify(traversal)((s) => s.toUpperCase())(source)
      expect(result).toEqual(' FOO  BAR BAZ  ')
    })

    it('write longer', () => {
      const source = ' foo  bar baz  '
      const result: string = O.modify(traversal)((s) => s + s)(source)
      expect(result).toEqual(' foofoo  barbar bazbaz  ')
    })

    it('write shorter', () => {
      const source = ' foo  bar baz  '
      const result: string = O.modify(traversal)((s) =>
        s === 'bar' ? '' : s === 'foo' ? 'f' : s
      )(source)
      expect(result).toEqual(' f   baz  ')
    })
  })
})
