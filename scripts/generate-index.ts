import { compositionType } from '../src/internals'

const header = `\
// This file is generated, do not edit! See ../scripts/generate-index.ts

import * as I from './internals'
import { ElemType, Eq, Simplify } from './utils'
import {
  Adapt,
  Apply,
  Choice,
  Compose,
  DisallowTypeChange,
  ElemUnion,
  Elems,
  Id,
  HKT,
  Path2,
  Path3,
  Path4,
  Path5,
  Plant,
  Prop,
  Optional,
  Union,
} from './hkt'

export { Apply, Compose, Eq, HKT }

export type OpticFor<S> = Equivalence<S, DisallowTypeChange<S>, S>
export type OpticFor_<S> = Equivalence<S, Id, S>
`

const opticHeader = (optic: string, target: string, composition: string) => `\
  // ${optic} · ${target} => ${composition}
  compose<T2 extends HKT, A2>(optic: ${target}<A, T2, A2>): ${composition}<S, Compose<T, T2>, A2>
`

const equivalence = () => ''

const iso = (composition: string) => `\
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): ${composition}<S, Compose<T, Adapt<A, U>>, U>
`

const lens = (composition: string) => `\
  prop<K extends keyof A>(key: K): ${composition}<S, Compose<T, Prop<A, K>>, A[K]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): ${composition}<S, Compose<T, Path5<A, K1, K2, K3, K4, K5>>, A[K1][K2][K3][K4][K5]>
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): ${composition}<S, Compose<T, Path4<A, K1, K2, K3, K4>>, A[K1][K2][K3][K4]>
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): ${composition}<S, Compose<T, Path3<A, K1, K2, K3>>, A[K1][K2][K3]>
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): ${composition}<S, Compose<T, Path2<A, K1, K2>>, A[K1][K2]>
  path<K1 extends keyof A>(path: [K1]): ${composition}<S, Compose<T, Prop<A, K1>>, A[K1]>
  pick<K extends keyof A>(
    keys: K[]
  ): ${composition}<S, Compose<T, Plant<A, K>>, Pick<A, K>>
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): ${composition}<S, Compose<T, Union<A>>, A>
`

const prism = (composition: string) => `\
  optional(): ${composition}<S, Compose<T, Optional>, Exclude<A, undefined>>
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => ${composition}<S, Compose<T, F>, U>
  guard<U extends A>(g: (a: A) => a is U): ${composition}<S, Compose<T, Choice<A, U>>, U>
  index(i: number): ${composition}<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  find(
    predicate: (item: ElemType<A>) => boolean
  ): ${composition}<S, Compose<T, ElemUnion<A>>, ElemType<A>>
  when(predicate: (item: A) => boolean): ${composition}<S, Compose<T, Union<A>>, A>
`

const traversal = (composition: string) => `\
  elems(): ${composition}<S, Compose<T, Elems>, ElemType<A>>
`

type OpticType = 'Equivalence' | 'Iso' | 'Lens' | 'Prism' | 'Traversal'

const opticNames: OpticType[] = [
  'Equivalence',
  'Iso',
  'Lens',
  'Prism',
  'Traversal',
]

const methodGeneratorMap: Record<OpticType, (composition: string) => string> = {
  Equivalence: equivalence,
  Iso: iso,
  Lens: lens,
  Prism: prism,
  Traversal: traversal,
}

const generateOpticInterface = (optic: OpticType) => `\
export interface ${optic}<S, T extends HKT, A> {
  _tag: '${optic}'

${opticNames
  .map(target => {
    const composition = compositionType[optic][target]
    const generateMethods = methodGeneratorMap[target]
    return (
      opticHeader(optic, target, composition) + generateMethods(composition)
    )
  })
  .join('\n')}
}
`

const generateOpticInterfaces = () =>
  opticNames.map(optic => generateOpticInterface(optic)).join('\n')

const generateComposeSignatures = () =>
  opticNames
    .map(source =>
      opticNames
        .map(
          optic => `\
// ${source} · ${optic} => ${compositionType[source][optic]}
export function compose<S, T1 extends HKT, A1, T2 extends HKT, A2>(
  optic1: ${source}<S, T1, A1>,
  optic2: ${optic}<A1, T2, A2>
): ${compositionType[source][optic]}<S, Compose<T1, T2>, A2>
`
        )
        .join('')
    )
    .join('\n')

const composeImpl = `\
export function compose(optic1: any, optic2: any) {
  return optic1.compose(optic2)
}
`

const generateComposeFn = () => `
${generateComposeSignatures()}
${composeImpl}
`

const topLevelFunctions = `\
export function optic<S>(): OpticFor<S> {
  return I.optic as any
}

export function optic_<S>(): OpticFor_<S> {
  return I.optic as any
}

export function get<S, T extends HKT, A>(
  optic: Equivalence<S, T, A> | Iso<S, T, A> | Lens<S, T, A>
): (source: S) => A {
  return source => I.get((optic as any)._ref, source)
}

export function preview<S, T extends HKT, A>(
  optic: Prism<S, T, A> | Traversal<S, T, A>
): (source: S) => A | undefined {
  return source => I.preview((optic as any)._ref, source)
}

export function collect<S, T extends HKT, A>(
  optic: Prism<S, T, A> | Traversal<S, T, A>
): (source: S) => A[] {
  return source => I.collect((optic as any)._ref, source)
}

export function modify<S, T extends HKT, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
): <B>(f: (a: A) => B) => (source: S) => Simplify<S, Apply<T, B>> {
  return f => source => I.modify((optic as any)._ref, f, source)
}

export function set<S, T extends HKT, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | Traversal<S, T, A>
): <B>(value: B) => (source: S) => Simplify<S, Apply<T, B>> {
  return value => source => I.set((optic as any)._ref, value, source)
}

// Taken from fp-ts
export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): D
export function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export function pipe(
  a: unknown,
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return a
    case 2:
      return ab!(a)
    case 3:
      return bc!(ab!(a))
    case 4:
      return cd!(bc!(ab!(a)))
    case 5:
      return de!(cd!(bc!(ab!(a))))
    case 6:
      return ef!(de!(cd!(bc!(ab!(a)))))
    case 7:
      return fg!(ef!(de!(cd!(bc!(ab!(a))))))
    case 8:
      return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
    case 9:
      return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
    case 10:
      return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
  }
  return
}
`

const generateIndexTs = () => `\
${header}
${generateOpticInterfaces()}
${generateComposeFn()}
${topLevelFunctions}
`

console.log(generateIndexTs())
