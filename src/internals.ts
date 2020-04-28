export const id = (x: any) => x

type Either<E, T> = Left<E> | Right<T>
type Left<E> = { _tag: 'Left'; value: E }
type Right<T> = { _tag: 'Right'; value: T }

const Left = <E>(value: E): Left<E> => ({
  _tag: 'Left',
  value,
})

const Right = <T>(value: T): Right<T> => ({
  _tag: 'Right',
  value,
})

const either = <E, T, U>(
  mapLeft: (value: E) => U,
  mapRight: (value: T) => U,
  e: Either<E, T>
): U => (e._tag === 'Left' ? mapLeft(e.value) : mapRight(e.value))

const profunctorFn = {
  dimap: (f: (x: any) => any, g: (x: any) => any, fn: (x: any) => any) => (
    x: any
  ) => g(fn(f(x))),
  first: (f: (x: any) => any) => ([x, y]: [any, any]) => [f(x), y],
  right: (f: (x: any) => any) => (e: Either<any, any>): Either<any, any> =>
    e._tag === 'Left' ? e : Right(f(e.value)),
  wander: (f: any) => (xs: any[]) => xs.map(f),
}

const monoidFirst = {
  empty: () => undefined,
  foldMap: (f: (x: any) => any, xs: any[]) => {
    for (let i = 0; i < xs.length; i++) {
      const x = f(xs[i])
      if (x != undefined) return x
    }
    return undefined
  },
}

const monoidArray = {
  empty: () => [],
  foldMap: (f: (x: any) => any, xs: any[]) => {
    let acc: any[] = []
    xs.forEach(x => {
      acc = acc.concat(f(x))
    })
    return acc
  },
}

const profunctorConst = (monoid: any) => ({
  dimap: (f: (x: any) => any, _g: (x: any) => any, toF: (x: any) => any) => (
    x: any
  ) => toF(f(x)),
  first: (toF: (x: any) => any) => ([x, _y]: [any, any]) => toF(x),
  right: (toF: (x: any) => any) => (e: Either<any, any>) =>
    e._tag === 'Left' ? monoid.empty() : toF(e.value),
  wander: (toF: (x: any) => any) => (xs: any[]) => monoid.foldMap(toF, xs),
})

/////////////////////////////////////////////////////////////////////////////

type Profunctor = any

type OpticFn = (P: Profunctor, optic: OpticFn) => any

const compose = (optic1: OpticFn, optic2: OpticFn): OpticFn => (
  P: Profunctor,
  optic: OpticFn
) => optic1(P, optic2(P, optic))

const eq = (_P: any, optic: any) => optic

const iso = (there: (x: any) => any, back: (x: any) => any) => (
  P: any,
  optic: any
): Optic => P.dimap(there, back, optic)

const lens = (view: (x: any) => any, update: (x: any) => any): OpticFn => (
  P: Profunctor,
  optic: OpticFn
): any => P.dimap((x: any) => [view(x), x], update, P.first(optic))

const prism = (match: (x: any) => any, build: (x: any) => any) => (
  P: any,
  optic: any
): any => P.dimap(match, (x: any) => either(id, build, x), P.right(optic))

export const elems: any = (P: any, optic: any) =>
  P.dimap(id, id, P.wander(optic))

export const to: any = (fn: (a: any) => any) => (P: any, optic: any) =>
  P.dimap(fn, id, optic)

export const when = (pred: (x: any) => boolean) => (P: any, optic: any): any =>
  P.dimap(
    (x: any) => (pred(x) ? Right(x) : Left(x)),
    (x: any) => either(id, id, x),
    P.right(optic)
  )

/////////////////////////////////////////////////////////////////////////////

export const modify = (optic: any, fn: (x: any) => any, source: any): any =>
  optic(profunctorFn, fn)(source)

export const set = (optic: any, value: any, source: any): any =>
  optic(profunctorFn, () => value)(source)

export const get = (optic: any, source: any): any =>
  optic(profunctorConst({}), id)(source)

export const preview = (optic: any, source: any): any =>
  optic(profunctorConst(monoidFirst), id)(source)

export const collect = (optic: any, source: any): any =>
  optic(profunctorConst(monoidArray), (x: any) => [x])(source)

/////////////////////////////////////////////////////////////////////////////

const prop = (key: string): OpticFn =>
  lens(
    (source: any) => source[key],
    ([value, source]: [any, any]) => ({ ...source, [key]: value })
  )

const pick = (keys: string[]) =>
  lens(
    (source: any) => {
      const value: any = {}
      for (const key of keys) {
        value[key] = source[key]
      }
      return value
    },
    ([value, source]: [any, any]) => {
      const result = { ...source }
      for (const key of keys) {
        delete result[key]
      }
      return Object.assign(result, value)
    }
  )

const noMatch: unique symbol = Symbol('__no_match__')

const mustMatch = prism(
  (source: any) => (source === noMatch ? Left(source) : Right(source)),
  id
)

const index = (i: number): OpticFn =>
  compose(
    lens(
      (source: any[]) => (0 <= i && i < source.length ? source[i] : noMatch),
      ([value, source]: [any, any[] | string]) => {
        if (value === noMatch) {
          return source
        }
        if (typeof source === 'string') {
          if (i === 0) {
            return value + source.substring(1)
          }
          if (i === source.length) {
            return source.substring(0, i - 1) + value
          }
          return source.substring(0, i) + value + source.substring(i + 1)
        } else {
          const result = source.slice()
          result[i] = value
          return result
        }
      }
    ),
    mustMatch
  )

const optional = prism(
  (source: any) => (source === undefined ? Left(undefined) : Right(source)),
  id
)

const guard = <A, U extends A>(fn: (a: A) => a is U) =>
  prism((source: A) => (fn(source) ? Right(source) : Left(source)), id)

const find = (predicate: (item: any) => boolean): any =>
  compose(
    compose(
      lens(
        (source: any[]) => {
          const index = source.findIndex(predicate)
          if (index === -1) {
            return [noMatch, -1]
          }
          return [source[index], index]
        },
        ([[value, index], source]: [[any, number], any[]]) => {
          if (value === noMatch || index === -1) {
            return source
          }
          const result = source.slice()
          result[index] = value
          return result
        }
      ),
      index(0)
    ),
    mustMatch
  )

const filter = (predicate: (item: any) => boolean): any =>
  lens(
    (source: any[]) => {
      const indexes: any[] = source
        .map((item, index) => (predicate(item) ? index : null))
        .filter(index => index != null)
      return indexes.map(index => source[index])
    },
    ([values, source]: [any[], any[]]) => {
      const indexes: any[] = source
        .map((item, index) => (predicate(item) ? index : null))
        .filter(index => index != null)
      const result = source.slice()
      let j = 0
      for (const index of indexes) {
        result[index] = values[j]
        j++
      }
      return result
    }
  )

const prependTo = lens(
  (source: any[]) => undefined,
  ([value, source]: [any, any[]]) => {
    if (value === undefined) return source
    return [value, ...source]
  }
)

const appendTo = lens(
  (source: any[]) => undefined,
  ([value, source]: [any, any[]]) => {
    if (value === undefined) return source
    return [...source, value]
  }
)

const chars = compose(
  iso(
    s => s.split(''),
    a => a.join('')
  ),
  elems
)

const words = compose(
  compose(
    iso(
      s => s.split(/\b/),
      a => a.join('')
    ),
    elems
  ),
  when(s => !/\s+/.test(s))
)

/////////////////////////////////////////////////////////////////////////////

export type OpticType =
  | 'Equivalence'
  | 'Iso'
  | 'Lens'
  | 'Prism'
  | 'Traversal'
  | 'Getter'
  | 'AffineFold'
  | 'Fold'

type CompositionType = { [T in OpticType]: { [U in OpticType]: OpticType } }

export const compositionType: CompositionType = {
  Equivalence: {
    Equivalence: 'Equivalence',
    Iso: 'Iso',
    Lens: 'Lens',
    Prism: 'Prism',
    Traversal: 'Traversal',
    Getter: 'Getter',
    AffineFold: 'AffineFold',
    Fold: 'Fold',
  },
  Iso: {
    Equivalence: 'Iso',
    Iso: 'Iso',
    Lens: 'Lens',
    Prism: 'Prism',
    Traversal: 'Traversal',
    Getter: 'Getter',
    AffineFold: 'AffineFold',
    Fold: 'Fold',
  },
  Lens: {
    Equivalence: 'Lens',
    Iso: 'Lens',
    Lens: 'Lens',
    Prism: 'Prism',
    Traversal: 'Traversal',
    Getter: 'Getter',
    AffineFold: 'AffineFold',
    Fold: 'Fold',
  },
  Prism: {
    Equivalence: 'Prism',
    Iso: 'Prism',
    Lens: 'Prism',
    Prism: 'Prism',
    Traversal: 'Traversal',
    Getter: 'AffineFold',
    AffineFold: 'AffineFold',
    Fold: 'Fold',
  },
  Traversal: {
    Equivalence: 'Traversal',
    Iso: 'Traversal',
    Lens: 'Traversal',
    Prism: 'Traversal',
    Traversal: 'Traversal',
    Getter: 'Fold',
    AffineFold: 'Fold',
    Fold: 'Fold',
  },
  Getter: {
    Equivalence: 'Getter',
    Iso: 'Getter',
    Lens: 'Getter',
    Prism: 'AffineFold',
    Traversal: 'Fold',
    Getter: 'Getter',
    AffineFold: 'AffineFold',
    Fold: 'Fold',
  },
  AffineFold: {
    Equivalence: 'AffineFold',
    Iso: 'AffineFold',
    Lens: 'AffineFold',
    Prism: 'AffineFold',
    Traversal: 'Fold',
    Getter: 'AffineFold',
    AffineFold: 'AffineFold',
    Fold: 'Fold',
  },
  Fold: {
    Equivalence: 'Fold',
    Iso: 'Fold',
    Lens: 'Fold',
    Prism: 'Fold',
    Traversal: 'Fold',
    Getter: 'Fold',
    AffineFold: 'Fold',
    Fold: 'Fold',
  },
}

export class Optic {
  constructor(public _tag: OpticType, public _ref: OpticFn) {}

  compose(other: Optic): Optic {
    return new Optic(
      compositionType[this._tag][other._tag],
      compose(this._ref, other._ref)
    )
  }

  iso(there: (x: any) => any, back: (x: any) => any): Optic {
    return new Optic(
      compositionType[this._tag]['Iso'],
      compose(this._ref, iso(there, back))
    )
  }

  prop(key: string): Optic {
    return new Optic(
      compositionType[this._tag]['Lens'],
      compose(this._ref, prop(key))
    )
  }

  path(keys: string[]): Optic {
    return new Optic(
      compositionType[this._tag]['Lens'],
      keys.reduce((ref, key) => compose(ref, prop(key)), this._ref)
    )
  }

  pick(keys: string[]): Optic {
    return new Optic(
      compositionType[this._tag]['Lens'],
      compose(this._ref, pick(keys))
    )
  }

  filter(predicate: (item: any) => boolean): any {
    return new Optic(
      compositionType[this._tag]['Lens'],
      compose(this._ref, filter(predicate))
    )
  }

  prependTo(): any {
    return new Optic(
      compositionType[this._tag]['Lens'],
      compose(this._ref, prependTo)
    )
  }

  appendTo(): any {
    return new Optic(
      compositionType[this._tag]['Lens'],
      compose(this._ref, appendTo)
    )
  }

  optional(): Optic {
    return new Optic(
      compositionType[this._tag]['Prism'],
      compose(this._ref, optional)
    )
  }

  guard_() {
    return (fn: Function): Optic => this.guard(fn)
  }

  guard(fn: Function): Optic {
    return new Optic(
      compositionType[this._tag]['Prism'],
      compose(this._ref, guard(fn as any))
    )
  }

  index(i: number): Optic {
    return new Optic(
      compositionType[this._tag]['Prism'],
      compose(this._ref, index(i))
    )
  }

  head(): Optic {
    return new Optic(
      compositionType[this._tag]['Prism'],
      compose(this._ref, index(0))
    )
  }

  find(predicate: (item: any) => boolean): Optic {
    return new Optic(
      compositionType[this._tag]['Prism'],
      compose(this._ref, find(predicate))
    )
  }

  elems(): Optic {
    return new Optic(
      compositionType[this._tag]['Traversal'],
      compose(this._ref, elems)
    )
  }

  to(fn: Function): Optic {
    return new Optic(
      compositionType[this._tag]['Getter'],
      compose(this._ref, to(fn))
    )
  }

  when(predicate: (elem: any) => boolean): Optic {
    return new Optic(
      compositionType[this._tag]['Prism'],
      compose(this._ref, when(predicate))
    )
  }

  chars(): Optic {
    return new Optic(
      compositionType[this._tag]['Traversal'],
      compose(this._ref, chars)
    )
  }

  words(): Optic {
    return new Optic(
      compositionType[this._tag]['Traversal'],
      compose(this._ref, words)
    )
  }
}

export const optic = new Optic('Equivalence', eq)
