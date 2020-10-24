import { IsEmpty } from './utils'
import { Prop } from './hkt'

export type DescendPath<A, K> = K extends keyof A ? A[K] :
  K extends `${infer P}.${infer Rest}` ?
    (P extends keyof A ? DescendPath<A[P], Rest> : never) :
    K extends [infer PK, ...infer PRest] ?
      (PK extends keyof A ? IsEmpty<PRest, A[PK], DescendPath<A[PK], PRest>> : never) : never;

export type DescendProp<A, K> = K extends keyof A ? Prop<A, K> :
  K extends `${infer P}.${infer Rest}` ?
    (P extends keyof A ? DescendProp<A[P], Rest> : never) :
    K extends [infer P, ...infer Rest] ?
      (P extends keyof A ?
        IsEmpty<Rest, Prop<A, P>, DescendProp<A[P], Rest>> : never)
      : never;