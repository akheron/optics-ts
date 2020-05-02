import { OpticType, compositionType } from '../src/internals'

const header = `\
// This file is generated, do not edit! See ../scripts/generate-index.ts

import * as I from './internals'
import {
  ElemType,
  Eq,
  IfElse,
  RequireString,
  Simplify
} from './utils'
import {
  Adapt,
  Apply,
  Choice,
  Compose,
  DisallowTypeChange,
  ElemUnion,
  Elems,
  HKT,
  Id,
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

const isReadOnly = (optic: OpticType): boolean =>
  optic === 'Getter' || optic === 'AffineFold' || optic === 'Fold'

const opticHeader = (optic: OpticType, composee: OpticType) => `\
  // ${optic} · ${composee} => ${compositionType[optic][composee]}
`

type Composition = (typeOp: string, resultType: string) => string

const makeComposition = (
  optic: OpticType,
  composee: OpticType
): Composition | undefined => {
  const composition = compositionType[optic][composee]
  if (composition === undefined) return undefined
  if (isReadOnly(composition)) {
    return (_, resultType) => `${composition}<S, ${resultType}>`
  }
  return (typeOp, resultType) =>
    `${composition}<S, Compose<T, ${typeOp}>, ${resultType}>`
}

const composeMethod = (composee: OpticType, composition: Composition) =>
  (isReadOnly(composee)
    ? `compose<A2>(optic: ${composee}<A, A2>)`
    : `compose<T2 extends HKT, A2>(optic: ${composee}<A, T2, A2>)`) +
  `: ${composition('T2', 'A2')}
`

const equivalence = () => ''

const iso = (composition: Composition) => `\
  iso<U>(
    there: (a: A) => U,
    back: (u: U) => A
  ): ${composition('Adapt<A, U>', 'U')}
`

const lens = (composition: Composition) => `\
  prop<K extends keyof A>(key: K): ${composition('Prop<A, K>', 'A[K]')}
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3],
    K5 extends keyof A[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5]
  ): ${composition('Path5<A, K1, K2, K3, K4, K5>', 'A[K1][K2][K3][K4][K5]')}
  path<
    K1 extends keyof A,
    K2 extends keyof A[K1],
    K3 extends keyof A[K1][K2],
    K4 extends keyof A[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4]
  ): ${composition('Path4<A, K1, K2, K3, K4>', 'A[K1][K2][K3][K4]')}
  path<K1 extends keyof A, K2 extends keyof A[K1], K3 extends keyof A[K1][K2]>(
    path: [K1, K2, K3]
  ): ${composition('Path3<A, K1, K2, K3>', 'A[K1][K2][K3]')}
  path<K1 extends keyof A, K2 extends keyof A[K1]>(
    path: [K1, K2]
  ): ${composition('Path2<A, K1, K2>', 'A[K1][K2]')}
  path<K1 extends keyof A>(path: [K1]): ${composition('Prop<A, K1>', 'A[K1]')}
  pick<K extends keyof A>(
    keys: K[]
  ): ${composition('Plant<A, K>', 'Pick<A, K>')}
  filter(
    predicate: (item: ElemType<A>) => boolean
  ): ${composition('Union<A>', 'A')}
`

const prism = (composition: Composition) => `\
  optional(): ${composition('Optional', 'Exclude<A, undefined>')}
  guard_<F extends HKT>(): <U extends A>(
    g: (a: A) => a is U
  ) => ${composition('F', 'U')}
  guard<U extends A>(g: (a: A) => a is U): ${composition('Choice<A, U>', 'U')}
  find(
    predicate: (item: ElemType<A>) => boolean
  ): ${composition('ElemUnion<A>', 'ElemType<A>')}
  when(predicate: (item: A) => boolean): ${composition('Union<A>', 'A')}
`

const removablePrism = (composition: Composition) => `\
  index(i: number): IfElse<Eq<A, string>, ${composition(
    'DisallowTypeChange<string>',
    'string'
  )}, ${composition('ElemUnion<A>', 'ElemType<A>')}>
  head(): IfElse<Eq<A, string>, ${composition(
    'DisallowTypeChange<string>',
    'string'
  )}, ${composition('ElemUnion<A>', 'ElemType<A>')}>
`

const traversal = (composition: Composition) => `\
  elems(): ${composition('Elems', 'ElemType<A>')}
  chars(): RequireString<A, ${composition(
    'DisallowTypeChange<string>',
    'string'
  )}>
  words(): RequireString<A, ${composition(
    'DisallowTypeChange<string>',
    'string'
  )}>
`

const getter = (composition: Composition) => `\
  to<B>(f: (a: A) => B): ${composition('', 'B')}
`

const affineFold = () => ``

const fold = () => ``

const setter = (composition: Composition) => `\
  prependTo(): ${composition('ElemUnion<A>', 'ElemType<A>')}
  appendTo(): ${composition('ElemUnion<A>', 'ElemType<A>')}
`

const opticNames: OpticType[] = [
  'Equivalence',
  'Iso',
  'Lens',
  'Prism',
  'RemovablePrism',
  'Traversal',
  'Getter',
  'AffineFold',
  'Fold',
  'Setter',
]

const methodGeneratorMap: Record<
  OpticType,
  (composition: Composition) => string
> = {
  Equivalence: equivalence,
  Iso: iso,
  Lens: lens,
  Prism: prism,
  RemovablePrism: removablePrism,
  Traversal: traversal,
  Getter: getter,
  AffineFold: affineFold,
  Fold: fold,
  Setter: setter,
}

const generateOpticInterface = (optic: OpticType) => {
  const typeSig = isReadOnly(optic) ? '<S, A>' : '<S, T extends HKT, A>'
  return `\
export interface ${optic}${typeSig} {
  _tag: '${optic}'

${opticNames
  .map(composee => {
    const composition = makeComposition(optic, composee)
    if (composition === undefined) return ''

    const opticMethods = methodGeneratorMap[composee]
    return (
      opticHeader(optic, composee) +
      composeMethod(composee, composition) +
      opticMethods(composition)
    )
  })
  .join('\n')}
}
`
}

const generateOpticInterfaces = () =>
  opticNames.map(optic => generateOpticInterface(optic)).join('\n')

const composeFunction = (optic: OpticType, composee: OpticType): string => {
  const [typeSig1, optic1] = isReadOnly(optic)
    ? ['S, A', `optic1: ${optic}<S, A>`]
    : ['S, T extends HKT, A', `optic1: ${optic}<S, T, A>`]
  const [typeSig2, optic2] = isReadOnly(composee)
    ? ['A2', `optic2: ${composee}<A, A2>`]
    : ['T2 extends HKT, A2', `optic2: ${composee}<A, T2, A2>`]
  const composition = makeComposition(optic, composee)
  if (composition === undefined) return ''
  return `\
// ${optic} · ${composee} => ${compositionType[optic][composee]}
export function compose<${typeSig1}, ${typeSig2}>(${optic1}, ${optic2}): ${composition(
    'T2',
    'A2'
  )}
`
}

const generateComposeSignatures = () =>
  opticNames
    .map(optic =>
      opticNames.map(composee => composeFunction(optic, composee)).join('')
    )
    .join('')

const composeImpl = `\
export function compose(optic1: any, optic2: any) {
  return optic1.compose(optic2)
}`

const generateComposeFn = () => `
${generateComposeSignatures()}${composeImpl}
`

const topLevelFunctions = `\
export function optic<S>(): OpticFor<S> {
  return I.optic as any
}

export function optic_<S>(): OpticFor_<S> {
  return I.optic as any
}

export function get<S, A>(
  optic: Equivalence<S, any, A> | Iso<S, any, A> | Lens<S, any, A> | Getter<S, A>
): (source: S) => A {
  return source => I.get((optic as any)._ref, source)
}

export function preview<S, A>(
  optic: Prism<S, any, A> | RemovablePrism<S, any, A> | Traversal<S, any, A> | AffineFold<S, A> | Fold<S, A>
): (source: S) => A | undefined {
  return source => I.preview((optic as any)._ref, source)
}

export function collect<S, A>(
  optic: Prism<S, any, A> | RemovablePrism<S, any, A> | Traversal<S, any, A> | Fold<S, A>
): (source: S) => A[] {
  return source => I.collect((optic as any)._ref, source)
}

export function modify<S, T extends HKT, A>(
  optic:
    | Equivalence<S, T, A>
    | Iso<S, T, A>
    | Lens<S, T, A>
    | Prism<S, T, A>
    | RemovablePrism<S, T, A>
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
    | RemovablePrism<S, T, A>
    | Traversal<S, T, A>
    | Setter<S, T, A>
): <B>(value: B) => (source: S) => Simplify<S, Apply<T, B>> {
  return value => source => I.set((optic as any)._ref, value, source)
}

export function remove<S>(
  optic: RemovablePrism<S, any, any>
): (source: S) => S {
  return source => I.remove((optic as any)._ref, source)
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
