import { pipe } from '.'

const plus1 = (v: number): number => v + 1

describe('spec', () => {
  it('works', () => {
    const result: number = pipe(1, plus1)
    expect(result).toEqual(2)

    const result2 = pipe(
      1,
      plus1,
      plus1,
      plus1,
      plus1,
      plus1,
      plus1,
      plus1,
      plus1,
      plus1
    )
    expect(result2).toEqual(10)
  })
})
