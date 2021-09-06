import * as M from './index.js'
import * as S from './standalone/index.js'
import * as I from './interop.js'

describe('interop', () => {
  it('get', () => {
    type Source = { foo: string }
    const source: Source = { foo: 'bar' }

    const valueM: string = I.get(M.optic<Source>().prop('foo'), source)
    expect(valueM).toEqual('bar')

    const valueS: string = I.get(S.prop('foo'), source)
    expect(valueS).toEqual('bar')
  })

  it('preview', () => {
    type Source = { foo?: string | undefined }
    const source: Source = { foo: 'bar' }

    const valueM: string | undefined = I.preview(
      M.optic<Source>().prop('foo').optional(),
      source
    )
    expect(valueM).toEqual('bar')

    const valueS: string | undefined = I.preview(
      S.compose('foo', S.optional),
      source
    )
    expect(valueS).toEqual('bar')
  })

  it('collect', () => {
    type Source = string
    const source: Source = 'foo bar'

    const valueM: string[] = I.collect(M.optic<Source>().words(), source)
    expect(valueM).toEqual(['foo', 'bar'])

    const valueS: string[] = I.collect(S.words, source)
    expect(valueS).toEqual(['foo', 'bar'])
  })

  it('modify', () => {
    type Source = string
    const source: Source = 'foo bar'

    const valueM: string = I.modify(
      M.optic<Source>()
        .words()
        .when((s) => s.startsWith('b')),
      (s) => s.toUpperCase(),
      source
    )
    expect(valueM).toEqual('foo BAR')

    const valueS: string = I.modify(
      S.compose(
        S.words,
        S.when((s: string) => s.startsWith('b'))
      ),
      (s) => s.toUpperCase(),
      source
    )
    expect(valueS).toEqual('foo BAR')
  })

  it('set', () => {
    type Source = string
    const source: Source = 'foo bar'

    const valueM: string = I.set(
      M.optic<Source>()
        .words()
        .when((s) => s.startsWith('b')),
      'lol',
      source
    )
    expect(valueM).toEqual('foo lol')

    const valueS: string = I.set(
      S.compose(
        S.words,
        S.when((s: string) => s.startsWith('b'))
      ),
      'lol',
      source
    )
    expect(valueS).toEqual('foo lol')
  })

  it('remove', () => {
    type Source = number[]
    const source: Source = [0, 1, 2]

    const valueM: Source = I.remove(M.optic<Source>().at(1), source)
    expect(valueM).toEqual([0, 2])

    const valueS: Source = I.remove(S.at(1), source)
    expect(valueS).toEqual([0, 2])
  })
})
