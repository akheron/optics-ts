# 方法链 API {#method-chaining-api}

!!! 注意

        自 optics-ts v2.2.0 起，光学有两种语法：**方法链**
        和 **独立光学**。关于它们之间的区别的更多信息，
        请参见 [两种语法](two-syntaxes.md)。

以下所有内容都假设有如下导入：

```typescript
import * as O from 'optics-ts'
```

光学通过方法链进行组合。这意味着每种光学类型都有
大部分下面文档中记录的方法，无论该方法创建的光学类型是什么。
唯一的区别是返回类型，由上述组合规则确定。

例如，假设我们有一个变量 `myLens`，它持有一个 `Lens`，并在其上调用
`.optional()`：

```typescript
const newOptic = myLens.optional()
```

`.optional()` 创建一个棱镜，所以 `newOptic` 将是镜头和
棱镜的组合，即一个棱镜。

每种光学类型具有哪些方法取决于在
[组合规则](reference-intro.md#rules-of-composition) 中提出的组合规则。例如，
`.prop()` 方法创建一个镜头，所以 getter 有这个方法，因为你可以
组合一个 getter 和一个镜头。另一方面，`.appendTo()` 方法，它
创建一个 setter，在 getter 中不可用，因为 getter 不能
与 setter 组合。

## 类型参数 {#type-parameters}

所有可写光学都有 3 个类型参数：`<S, T, A>`，所有只读
光学有 2 个类型参数：`<S, A>`：

- `S` 是光学操作的源

- `A` 是焦点或焦点的类型

- `T` 是一个类型，它编码了如何用多态
    写入构造输出类型，以及关于光学的可移除性的信息

从概念上讲，当你写入类型为 `B` 的值时，输出类型将是 `S`
在光学的焦点或焦点处由 `A` 替换为 `B`。`T` 包含一个机制
将 `B` 转换为输出类型。这种构造使得
光学在类型级别上可以是多态的。只读光学不需要 `T`
因为你不能通过它们写入或删除它们的焦点。

在下面，我们为了清晰起见，省略了每个光学的 `T` 的确切定义，
只在它的位置写下 `_`。通常从光学的工作方式可以清楚地看出，
如果你写入一个不同类型的值，会出来什么。

在可以用来通过光学写入的函数的文档中，
返回类型由 `T<B>` 表示。虽然这不是有效的 TypeScript 语法（因为
`T` 是一个类型参数，而不是一个具体的类型），但这很好地捕获了含义：
`B` 被应用到 "更高级别" 的类型 `T`，产生输出类型。

感兴趣的读者可以参考
[hkt.ts](https://github.com/akheron/optics-ts/tree/main/src/hkt.ts) 来看看
如何实际实现更高级别的类型/部分应用的类型操作符。

## 顶级函数 {#top-level-functions}

这些函数作为 `optics-ts` 模块的顶级导出可用。

大多数函数在其签名中有 `Optic`。这意味着多个光学
可以与该函数一起工作。实际适用的光学类
在函数描述中有文档记录。

### `optic` {#`optic`}

签名：`optic<S>(): Equivalence<S, _, S>`

为 `S` 创建一个单态等价性。如果你看到类型
`DisallowedTypeChange`，这意味着你试图用一个
单态光学改变一个类型。

### `optic_` {#`optic_`}

签名：`optic_<S>(): Equivalence<S, _, S>`

为 `S` 创建一个多态等价性。

### `get` {#`get`}

签名：`get<S, A>(optic: Optic<S, _, A>) => (source: S) => A`

通过 `Equivalence`、`Iso`、`Lens` 或 `Getter` 读取一个值。

### `preview` {#`preview`}

签名：
`preview<S, A>(optic: Optic<S, _, A>) => (source: S) => A | undefined`

通过 `Prism`、`Traversal`、`AffineFold` 或 `Fold` 读取一个值。对于 `Prism`
和 `AffineFold`，如果光学不匹配（没有焦点），返回 `undefined`。对于 `Traversal` 和 `Fold`，返回第一个焦点的值，或
如果没有焦点，则返回 `undefined`。

### `collect` {#`collect`}

签名：`collect<S, A>(optic: Optic<S, _, A>) => (source: S) => A[]`

通过 `Prism`、`Traversal`、`AffineFold` 或 `Fold` 读取所有焦点值。
对于 `Prism` 和 `AffineFold`，返回值是一个包含 0 或 1 个元素的数组。
对于 `Traversal` 和 `Fold`，返回值是一个包含零个或多个
元素的数组。

### `modify` {#`modify`}

签名：
`modify<S, T, A>(optic: Optic<S, T, A>) => <B>(f: (a: A) => B) => (source: S) => T<B>`

通过 `Equivalence`、`Iso`、`Lens`、`Prism` 或
`Traversal` 修改焦点值。返回一个更新的 `source` 副本，所有焦点都通过
映射它们通过函数 `f` 进行修改。

### `set` {#`set`}

签名：
`set<S, T, A>(optic: Optic<S, T, A>) => <B>(value: B) => (source: S) => T<B>`

通过`Equivalence`、`Iso`、`Lens`、`Prism`或`Traversal`写入一个常量值。返回一个更新的`source`副本，所有焦点都被`value`替换。

### `remove` {#`remove`}

签名： `remove<S, T, A>(optic: Optic<S, T, A>) => (source: S) => S`

从其包含的容器中移除`RemovablePrism`的焦点。

### `compose` {#`compose`}

签名：
`compose<S, A1, A2><optic1: Optic<S, _, A1>, optic2: Optic<A1, _, A2>): Optic<S, _, A2>`

组合两个光学元素。如果第一个光学元素是从`S`到`A1`，第二个光学元素是从`A1`到`A2`，那么结果就是从`S`到`A2`。

参见[组合规则](reference-intro.md#rules-of-composition)了解组合规则。

### `pipe` {#`pipe`}

签名：
`pipe<A, B, C, ..., V>(a: A, ab: (a: A) => B, bc: (b: B) => C, ...): V`

将表达式(`a`)的值传入最多9个一元函数(`ab`, `bc`, ...)的管道。

## 创建光学元素 {#creating-optics}

以下文档中的方法适用于所有光学类型：`Equivalence`、`Iso`、`Lens`、`Prism`、`Traversal`、`Getter`、`AffineFold`和`Fold`。文档中返回的类型是这些方法创建的光学元素的类型。实际的返回类型是调用方法的光学元素和方法创建的光学元素的组合。

注意，没有函数可以创建`AffineFold`或`Fold`光学元素。你只能通过组合其他类型的光学元素来获取这些。`Equivalence`可以通过调用顶级[`optic`](#optic)或[`optic_`](#optic_)函数来创建。

## 同构 {#isomorphisms}

同构具有类型`Iso<S, T, A>`。在下面，我们为了清晰起见，省略了`T`的确切定义，而使用`_`代替。参见[类型参数](#type-parameters)了解类型参数的含义。

### `iso` {#`iso`}

签名： `iso<U>(there: (a: A) => U, back: (u: U) => A): Iso<S, _, U>`

通过函数`there`和`back`创建一个同构。`there`接受焦点并将其转换为另一个值。`back`是`there`的逆函数。

注意，`iso`是单态的。还没有多态替代品（暂时）。

### `indexed` {#`indexed`}

签名： `indexed(): Iso<S, _, [number, ElemType<A>][]>`

只适用于数组。`ElemType<A>`是数组类型`A`的元素类型。

从值数组创建一个索引-值对数组的同构，即从`[a, b, ...]`到`[[0, a], [1, b], ...]`。

在写方向上，元素按索引排序，重复的索引只保留最后一个。

## Lenses {#lenses}

Lenses具有类型`Lens<S, T, A>`。在下面，我们为了清晰起见，省略了`T`的确切定义，而使用`_`代替。参见[类型参数](#type-parameters)了解类型参数的含义。

### `prop` {#`prop`}

签名：`prop<K extends keyof A>(key: K): Lens<S, _, A[K]>`

创建一个聚焦于 `A` 的属性 `K` 的镜头。

**注意：** `prop()` 仅适用于字符串属性，尽管 TypeScript 的类型系统也允许在使用 `keyof` 时使用数组的数字索引。使用 [`at`](#at) 棱镜聚焦于给定索引的数组元素。

### `path` {#`path`}

签名：`path<K1, K2, ...>(...keys: [K1, K2, ...]): Lens<S, _, A[K1][K2]...>`

一个聚焦于属性链的快捷方式。

```typescript
foo.path('a.b.c')
```

等同于

```typescript
foo.path('a', 'b', 'c')
```

等同于

```typescript
foo.prop('a').prop('b').prop('c')
```

### `nth` {#`nth`}

签名：`nth<N extends number>(n: N): Lens<S, _, Nth<A, N>>`

仅适用于长度至少为 `N + 1` 的元组。

创建一个聚焦于 `A` 的索引 `N` 的镜头。这是一个镜头，因为 `A` 的长度在类型级别上进行了检查，所以索引 `N` 总是被定义的。

参见下面的 [`at`](#at) ，这是一个类似的棱镜，适用于任意长度的数组。

### `pick` {#`pick`}

签名：`pick<K extends keyof A>(keys: K[]): Lens<S, _, Pick<A, K>>`

创建一个聚焦于具有给定属性的 `A` 的子对象的镜头。通过多态的 `.pick()` 镜头写入时，您可以添加或删除属性。

示例：

```typescript
const data = {
    foo: 'something',
    bar: 42,
    baz: true,
}
const lens = O.optic_<typeof data>().pick(['foo', 'bar'])

O.get(lens)(data)
// {
//  foo: 'something',
//  baz: true,
// }

O.set(lens)({ quux: null })(data)
// {
//   quux: null,
//   baz: true,
// }

// 同一镜头的单态版本
const monoLens = O.optic<typeof data>().compose(lens)

O.set(monoLens)({ quux: null })(data)
// DisallowedTypeChange
```

### `filter` {#`filter`}

签名：

- `filter(pred: (item: ElemType<A>) => boolean): Lens<S, _, A>`
- `filter<B>(pred: (item: ElemType<A>) => item is B): Lens<S, _, B[]>`

仅适用于数组。`ElemType<A>` 是数组类型 `A` 的元素类型。

创建一个聚焦于由 `pred` 匹配的元素的镜头。如果 `pred` 是 `B` 的类型保护，将焦点的类型缩小到 `B[]`。

```typescript
const l = O.optic_<number[]>().filter((x) => x % 2 === 1)

// 写入相同长度的数组替换元素
O.set(l)(['a', 'b', 'c'])([1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6]

// 写入较短的数组删除元素
O.set(l)(['a', 'b'])([1, 2, 3, 5, 6])
// ['a', 2, 'b', 6]

// 写入较长的数组将元素添加到末尾
O.set(l)(['a', 'b', 'c', 'd', 'e'])([1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6, 'd', 'e']
```

当写入不同类型 `U extends any[]` 时，结果将具有类型 `A | U`，即 `(ElemType<A> | ElemType<U>)[]`。

### `valueOr` {#`valueor`}

签名：`valueOr<B>(defaultValue: B): Lens<S, _, Exclude<A, undefined> | B>`

创建一个镜头，当通过它读取时，如果聚焦的值为 `undefined`，则返回 `defaultValue`。如果焦点不是 `undefined`，则返回未改变的焦点。

在写方向上完全多态。

### `partsOf` {#`partsof`}

签名：

- `partsOf(traversal: Traversal<A, _, B>): Lens<S, _, B[]>`
- `partsOf(makeTraversal: (o: Optic<A>) => Traversal<A, _, B>): Lens<S, _, B[]>`

从给定的遍历或由给定函数返回的遍历创建一个镜头。通过读取时，结果是一个元素数组，就像由 [`collect`](#collect) 生成的一样。通过写入时，遍历的焦点被替换为从写入数组中的值。对于多态写入，遍历的焦点获取写入数组元素的类型。如果写入了较短或较长的数组，**将抛出错误**。这是为了确保所有焦点都被替换并且类型是正确的。

例如，这将反转字符串的单词：

```typescript
const lens = O.optic<string>().partsOf((o) => o.words())
O.modify(lens)((words) => [...words].reverse())('this is a test')
// 'test a is this'
```

请注意，将 `partsOf` 与设置器（如 `appendTo` 或 `prependTo`）组合，或通过 `partsOf` 删除元素将无法工作，因为设置器添加的额外元素或删除的元素将导致 `partsOf` 抛出。

### `reread` {#`reread`}

### `rewrite` {#`rewrite`}

签名：

- `reread(fn: (value: A) => A): Lens<S, _, A>`
- `rewrite(fn: (value: A) => A): Lens<S, _, A>`

创建一个镜头，可以在读取方向（`reread()`）或写入方向（`rewrite()`）修改值。这在某些情况下确保数据结构不变性很有用。

请注意，`reread` 和 `rewrite` 都是单态的。

### `lens` {#`lens`}

签名：
`lens<U>(view: (a: A) => U, update: (a: A, u: U) => A): Lens<S, _, U>`

从函数 `view` 和 `update` 创建一个镜头。`view` 接受当前焦点并返回一个新焦点。`update` 接受原始焦点和一个值，并使用该值更新原始焦点。

请注意，`lens` 是单态的。还没有多态替代品（暂时）。

## Prisms {#prisms}

Prisms 的类型为 `Prism<S, T, A>`。在下面，我们为了清晰起见省略了 `T` 的确切定义，并使用 `_` 代替。请参阅 [类型参数](#type-parameters) 了解类型参数的含义。

### `optional` {#`optional`}

签名：`optional(): Prism<S, _, Exclude<A, undefined>>`

创建一个棱镜，聚焦于 `A` 的非 `undefined` 子类型。

### `guard` {#`guard`}

签名：`guard<U extends A>(g: (a: A) => a is U): Prism<S, _, U>`

创建一个棱镜，聚焦于匹配类型保护 `g` 的 `A` 的子类型 `U`。

请注意，`guard()` 是单态的。如果你想要一个多态保护，请使用 `guard_`。

### `guard_` {#`guard_`}

签名：
`guard_<F extends HKT>(): <U extends A>(g: (a: A) => a is U) => Prism<S, T · F, U>`

创建一个棱镜，聚焦于匹配类型保护 `g` 的 `A` 的子类型。写入时，使用更高级别的类型 `F` 构造输出类型。

### `at` {#`at`}

签名：`at(i: number): RemovablePrism<S, _, ElemType<A>>`

仅适用于数组和字符串。可移除的。`ElemType<A>` 是数组类型 `A` 的元素类型。

创建一个棱镜，聚焦于数组 `A` 的元素类型，或者如果 `A` 是 `string`，则聚焦于长度为 1 的子字符串。

当将不同类型 `B` 的元素写入数组时，结果数组将具有类型 `Array<A | B>`。

写入字符串时，只能写入字符串。写入的字符串长度可以不是 1。

### `head` {#`head`}

签名：`head(): Prism<S, _, ElemType<A>>`

相当于 `at(0)`。

### `index` {#`index`}

签名：`index(i: number): RemovablePrism<S, _, ElemType<A>>`

**已弃用**。别名为 [`at`](#at)。

### `find` {#`find`}

签名：
`find(p: (e: ElemType<A>) => boolean): RemovablePrism<S, _, ElemType<A>>`

仅适用于数组类型。可移除。`ElemType<A>` 是数组类型 `A` 的元素类型。

类似于 [`at`](#at)，但是要聚焦的索引是通过找到第一个匹配给定谓词的元素来确定的。

当通过此光学元素写入不同类型 `B` 的元素时，结果数组将具有类型 `Array<A | B>`。

### `when` {#`when`}

签名：`when(f: (a: A) => boolean): Prism<S, _, A>`

创建一个棱镜，如果焦点不匹配给定的谓词，就跳过焦点。特别适用于过滤遍历的焦点。

当通过此光学元素写入不同类型 `B` 的元素时，结果值将具有类型 `A | B`。

## Traversals {#traversals}

遍历的类型为 `Traversal<S, T, A>`。在下面，我们为了清晰起见省略了 `T` 的确切定义，并使用 `_` 代替。请参阅 [类型参数](#type-parameters) 了解类型参数的含义。

### `elems` {#`elems`}

签名：`elems(): Traversal<S, _, ElemType<A>>`

仅适用于数组类型。`ElemType<A>` 是数组类型 `A` 的元素类型。

创建一个遍历，聚焦于数组的所有元素。

## Getters {#getters}

获取器是具有单一焦点的只读光学元素。你可以将它们视为单向同构或只读镜头。

获取器的类型为 `Getter<S, A>`。请参阅 [类型参数](#type-parameters) 了解类型参数的含义。

### `to` {#`to`}

签名：`to<B>(f: (a: A) => B): Getter<S, B>`

创建一个获取器，将函数 `f` 应用于其焦点。

## Setters {#setters}

设置器的类型为 `Setter<S, T, A>`。在下面，我们为了清晰起见省略了 `T` 的确切定义，并使用 `_` 代替。请参阅 [类型参数](#type-parameters) 了解类型参数的含义。

### `prependTo` {#`prependto`}

### `appendTo` {#`appendto`}

签名：

- `prependTo(): Setter<S, _, ElemType<A>>`
- `appendTo(): Setter<S, _, ElemType<A>>`

仅适用于数组。`ElemType<A>` 是数组类型 `A` 的元素类型。

创建一个设置器，聚焦于焦点数组的 _第一个元素之前_ 或 _最后一个元素之后_ 的部分。写入时，将值前置或追加到数组。

当写入不同类型 `B` 的元素时，结果数组将具有类型 `Array<A | B>`。

## Composing {#composing}

### `compose` {#`compose`}

签名：`compose<B>(other: Optic<A, _, B>): Optic<S, _, B>`

## Strings {#strings}

以下光学元素仅适用于字符串。

### `chars` {#`chars`}

签名：`chars(): Traversal<S, _, string>`

创建一个遍历，聚焦于当前字符串焦点的所有字符。

写入时，可以通过写入空字符串来删除字符，或者更改为更长的字符串。

### `words` {#`words`}

签名：`words(): Traversal<S, _, string>`

创建一个遍历，聚焦于当前字符串焦点的所有单词。单词是由空格分隔的子字符串。

写入时，可以通过写入空字符串来删除单词，或者更改为更长或更短的字符串。
