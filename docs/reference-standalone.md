# 独立API {#standalone-api}

!!! 注意

        自 optics-ts v2.2.0 起，光学有两种语法：**方法链**和**独立光学**。有关它们之间的差异的更多信息，请参阅[两种语法](two-syntaxes.md)。

!!! 危险 "实验性"

        此模块是实验性的，可能会接收到向后不兼容的更改，而不会有相应的 semver bump。

以下所有内容都假定有以下导入：

```typescript
import * as O from 'optics-ts/standalone'
```

## TypeScript 类型 {#typescript-types}

通常，光学的 TypeScript 类型看起来像 `Optic<C, A, T, R>`。

- `C` 是光学类型作为字符串，例如 `'Lens'` 或 `'Prism'`

- `A` 和 `T` 编码光学的读写方向转换为
    "更高级别的" 类型

- `R` 是 `true` 如果光学是可移除的，否则是 `undefined`。

在下面，我们为了清晰起见，省略了确切的类型签名，而使用了一种手摇式的伪语法。光学描述试图明确光学和函数的操作方式。

感兴趣的读者可以参考
[hkt.ts](https://github.com/akheron/optics-ts/tree/main/src/hkt.ts) 来看看
更高级别的类型/部分应用类型运算符实际上是如何实现的。

## 操作 {#operations}

这些函数本身不是光学，而是在光学和数据上操作。

### `compose` {#`compose`}

`compose :: (optic, ...optics) => Optic`

组合光学以创建更复杂的光学。使用字符串作为光学是[prop](#prop)的简写。

示例：

```typescript
const fooBar = O.compose('foo', O.optional, 'bar')

O.preview(fooBar, { foo: undefined })
// undefined

O.preview(fooBar, { foo: { bar: 5 } })
// 5
```

### `get` {#`get`}

`get :: (optic, source) => value`<br> `get :: (optic) => (source) => value`

通过 `Equivalence`、`Iso`、`Lens` 或 `Getter` 读取值。

示例：

```typescript
O.get(O.pick('foo', 'baz'), { foo: 1, bar: 2, baz: 3 })
// { foo: 1, baz: 3 }
```

### `preview` {#`preview`}

`preview :: (optic, source) => value | undefined`<br>
`preview :: (optic) => (source) => value | undefined`

通过 `Prism`、`Traversal`、`AffineFold` 或 `Fold` 读取值。对于 `Prism`
和 `AffineFold`，如果光学不匹配（没有焦点），则返回 `undefined`。对于 `Traversal` 和 `Fold`，返回第一个焦点的值，或者如果没有焦点，则返回 `undefined`。

示例：

```typescript
O.preview(O.optional, 1)
// 1

O.preview(O.elems, [])
// undefined
```

### `collect` {#`collect`}

`collect :: (optic, source) => value[]`<br>
`collect :: (optic) => (source) => value[]`

通过 `Prism`、`Traversal`、`AffineFold` 或 `Fold` 读取所有焦点值。
对于 `Prism` 和 `AffineFold`，返回值是一个包含 0 或 1 个元素的数组。
对于 `Traversal` 和 `Fold`，返回值是一个包含零个或多个元素的数组。

示例：

```typescript
O.collect(O.optional, 1)
// [1]

O.collect(O.elems, [])
// []
```

### `modify` {#`modify`}

`modify :: (optic, fn, source) => value`<br>
`modify :: (optic) => (fn, source) => value`<br>
`modify :: (optic) => (fn) => (source) => value`

通过 `Equivalence`、`Iso`、`Lens`、`Prism` 或
`Traversal` 修改焦点值。返回 `source` 的更新副本，所有焦点都通过映射它们通过函数 `fn` 进行修改。

示例：

```typescript
O.modify(O.prop('foo'), (value) => value.length, { foo: 'bar' })
// { foo: 3 }
```

### `set` {#`set`}

签名：

`set :: (optic, newValue, source) => value`<br>
`set :: (optic) => (newValue, source) => value`<br>
`set :: (optic) => (newValue) => (source) => value`

通过 `Equivalence`、`Iso`、`Lens`、`Prism` 或
`Traversal` 写入常量值。返回 `source` 的更新副本，所有焦点都被 `newValue` 替换。

示例：

```typescript
O.set(O.prop('foo'), null, { foo: 'bar' })
// { foo: null }
```

### `remove` {#`remove`}

`remove :: (optic, source) => value`<br>
`remove :: (optic) => (source) => value`

从其包含的容器中删除 `RemovablePrism` 的焦点。

示例：

```typescript
O.remove(O.at(1), [1, 2, 3])
// [1, 3]
```

## 同构 {#isomorphisms}

### `iso` {#`iso`}

`iso :: (there: (v) => u, back: (u) => v) => Iso`

从函数 `there` 和 `back` 创建一个同构。`there` 接受焦点并将其转换为另一个值。`back` 是 `there` 的逆函数。

注意，`iso` 是单态的，即你不能在写入时更改值类型。还没有多态的替代品（尚未）。

示例：

```typescript
const sep = O.iso(
    (value: string) => value.split(','),
    (arr: string[]) => arr.join(',')
)

O.get(sep, 'foo,bar,baz')
// ['foo', 'bar', 'baz']

O.modify(sep, (arr) => [...arr].reverse(), 'foo,bar,baz')
// 'baz,bar,foo'
```

### `indexed` {#`indexed`}

`indexed :: Iso`

_只适用于数组。_

`indexed` 是从值数组到索引-值对数组的同构，即从 `[a, b, ...]` 到 `[[0, a], [1, b], ...]`。

在写入方向，元素按索引排序，只保留重复索引的最后一个。

示例：

```typescript
O.get(O.indexed, ['a', 'b', 'c'])
// [[0, 'a'], [1, 'b'], [2, 'c']] 

O.set(O.compose(O.indexed, O.at(1), O.nth(0)), 3, ['a', 'b', 'c'])
// ['a', 'c', 'b']
```

## 透镜 {#lenses}

### `prop` {#`prop`}

`prop :: (key) => Lens`

创建一个聚焦于对象属性 `key` 的透镜。

你也可以简单地将字符串传递给 [`compose`](#compose)，而不是使用 `prop`。

示例：

```typescript
O.set(O.prop('foo'), 42, { foo: null })
// { foo: 42 }
```

请参阅 [`atKey`](#atKey) 了解在记录上工作的类似棱镜。

### `nth` {#`nth`}

`nth :: (n) => Lens`

_只适用于长度至少为 `n + 1` 的
[元组](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)。_

创建一个聚焦于元组索引 `n` 的透镜。这是一个透镜，因为焦点的长度在类型级别上进行检查，所以索引 `n` 总是已定义的。

请参阅 [`at`](#at) 了解在数组上工作的类似棱镜。

### `pick` {#`pick`}

`pick :: (...keys) => Lens`

创建一个从对象中选择给定属性的透镜。通过透镜写入时，你可以添加或删除属性。

示例：

```typescript
const data = {
    foo: 'something',
    bar: 42,
    baz: true,
}

O.get(O.pick('foo', 'bar'), data)
// {
//  foo: 'something',
//  baz: true,
// }

O.set(O.pick('foo'), {}, data)
// {
//   bar: 42,
//   baz: true,
// }

O.set(O.pick(), { quux: 'added' }, data)
// {
//   foo: 'something'
//   bar: 42,
//   baz: true,
//   quux: 'added',
// }
```

### `filter` {#`filter`}

`filter :: (fn: (elem) => boolean) => Lens`

_只适用于数组。_

创建一个聚焦于由 `fn` 匹配的数组元素的透镜。如果 `fn` 是类型 `T` 的类型保护，则将焦点的类型缩小为 `T[]`。

写入更长/更短的数组会添加/删除元素。额外的元素被添加到数组的末尾。

示例：

```typescript
const l = O.filter((x: number) => x % 2 === 1)

O.set(l, ['a', 'b', 'c'], [1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6]

O.set(l, ['a', 'b'], [1, 2, 3, 5, 6])
// ['a', 2, 'b', 6]

O.set(l, ['a', 'b', 'c', 'd', 'e'], [1, 2, 3, 5, 6])
// ['a', 2, 'b', 'c', 6, 'd', 'e']
```

### `valueOr` {#`valueor`}

`valueOr :: (defaultValue) => Lens`

创建一个透镜，当通过它读取时，如果焦点值为 `undefined`，则返回 `defaultValue`。如果焦点不是 `undefined`，则返回未更改的焦点。

示例：

```typescript
O.get(O.valueOr(0), undefined)
// 0

O.get(O.valueOr(0), 42)
// 42

O.get(O.compose('maxAge', O.valueOr(100)), { maxAge: undefined })
// 100
```

### `partsOf` {#`partsof`}

`partsOf :: (traversal) => Lens`

给定一个遍历，创建一个聚焦于遍历焦点的数组的透镜。当通过读取时，结果是一个元素数组，就像由 [`collect`](#collect) 生成的那样。当通过写入时，遍历的焦点被替换为来自写入数组的值。对于多态写入，遍历的焦点获取写入数组元素的类型。如果写入了更短或更长的数组，**会抛出错误**。这是为了确保所有焦点都被替换，类型是正确的。

示例：

```typescript
O.set(
    O.partsOf(O.compose(O.elems, 'foo')),
    ['x', 'y', 'z'],
    [{ foo: 'a' }, { foo: 'b' }, { foo: 'c' }]
)
// [{ foo: 'x' }, { foo: 'y' }, { foo: 'z' }]

O.modify(O.partsOf(O.words), (words) => [...words].reverse(), 'this is a test')
// 'test a is this'
```

注意，将 `partsOf` 与设置器（如 `appendTo` 或 `prependTo`）组合，或通过 `partsOf` 删除元素将不起作用，因为设置器添加的额外元素或删除的元素将导致 `partsOf` 抛出错误。

### `reread`, `rewrite` {#`reread`,-`rewrite`}

`reread :: (fn: (value) => value) => Lens`<br>
`rewrite :: (fn: (value) => value) => Lens`

创建一个可以在读方向（`reread`）或写方向（`rewrite`）修改值的镜头。这在某些情况下确保数据结构不变性很有用。

`reread` 和 `rewrite` 都是单态的。

示例：

```typescript
const read = O.reread((x: string) => x.toUpperCase())
const write = O.rewrite((x: string) => x.toUpperCase())

O.get(read, 'foo')
// FOO

O.get(write, 'foo')
// foo

O.set(read, null, 'foo')
// foo

O.set(write, null, 'foo')
// FOO
```

### `lens` {#`lens`}

`lens :: (view: (v) => u, update: (v, u) => v) => Lens`

从 `view` 和 `update` 函数创建一个镜头。`view` 接受当前焦点并返回一个新焦点。`update` 接受原始焦点和一个值，并用该值更新原始焦点。

注意，`lens` 是单态的，即你不能在写入时更改值类型。还没有多态的替代品（暂时）。

示例：

```typescript
const lens = O.lens<number | string, number>(
    (v) => (typeof v === 'string' ? 0 : v),
    (_, u) => u
)

O.get(lens, 100)
// 100

O.get(lens, 'foo')
// 0
```

## Prisms {#prisms}

### `optional` {#`optional`}

`optional :: Prism`

如果值不是 `undefined`，则匹配的棱镜。将类型缩小以删除 `undefined`，例如 `number | undefined` 缩小为 `number`。

示例：

```typescript
const prism = O.compose('foo', O.optional, 'bar')

O.preview(prism, { foo: { bar: 42 } })
// 42

O.preview(prism, { foo: undefined })
// undefined
```

### `guard` {#`guard`}

`guard :: (fn: (value) => boolean) => Prism` (单态)<br>
`guard :: <F>() => (fn: (value) => boolean) => Prism` (多态)

创建一个棱镜，如果值匹配类型保护 `fn`，则匹配。

第一个，更简单的签名返回一个单态棱镜，只能用于不改变焦点类型的写入。

第二个签名返回一个使用类型转换 `F` 构造结果类型的多态棱镜。

单态示例：

```typescript
type Circle = { type: 'circle'; radius: number }
type Square = { type: 'square'; size: number }
type Shape = Circle | Square

function isCircle(value: Shape): value is Circle {
    return value.type === 'circle'
}

const circle = { type: 'circle', radius: 42 }
const square = { type: 'square', size: 10 }

const circleRadius = O.compose(O.guard(isCircle), 'radius')

O.preview(circleRadius, square)
// undefined

O.preview(circleRadius, circle)
// 42

O.set(circleRadius, 99, square)
// { type: 'square', size: 10 }

O.set(circleRadius, 99, circle)
// { type: 'circle', radius: 99 }
```

多态示例：

```typescript
type Some<T> = { type: 'some'; value: T }
type None = { type: 'none' }
type Option<T> = Some<T> | None

// O.HKT 是一个 "类型转换" 或 "高阶类型"。this[1] 是输入
// 类型，输出从 prop 0 取得。
//
// SomeF 类型转换只检查 this[1] 中的输入类型是否具有
// Some 的形状，并原样通过。换句话说，写入者可以更改 'value' prop 的类型，但不能更改其他任何东西。
//
interface SomeF extends O.HKT {
    0: this[1] extends Some<any> ? this[1] : never
}

function isSomeNumber(value: Option<number>): value is Some<number> {
    return value.type === 'some'
}

const someValue = O.compose(O.guard<SomeF>()(isSomeNumber), 'value')

const some: Option<number> = { type: 'some', value: 42 }
const none: Option<number> = { type: 'none' }

O.preview(someValue, none)
// undefined

O.preview(someValue, some)
// 42

const result1: Option<string> = O.set(someValue, 'foo', none)
// { type: 'none' }

const result2: Option<string> = O.set(someValue, 'foo', some)
// { type: 'some', value: 'foo' }
```

### `at` {#`at`}

`at :: (i) => RemovablePrism`

_只适用于数组和字符串。可移除。_

创建一个棱镜，专注于数组的第 n 个元素或字符串的第 n 个字符（长度为 1 的子字符串）。

在字符串上使用时，只能写入字符串。支持写入不同长度的字符串。

示例：

```typescript
O.preview(O.at(1), ['a', 'b', 'c'])
// 'b'

O.preview(O.at(1), ['a'])
// undefined

O.set(O.at(1), 123, ['a', 'b', 'c'])
// ['a', 123, 'c']

O.set(O.at(1), 123, ['a'])
// ['a']

O.remove(O.at(1), ['a', 'b', 'c'])
// ['a', 'c']

O.preview(O.at(1), 'abc')
// 'b'

O.preview(O.at(1), 'a')
// undefined

O.set(O.at(1), 'X', 'abc')
// 'aXc'

O.set(O.at(1), 'X', 'a')
// 'a'

O.set(O.at(1), 'XYZ', 'abc')
// 'aXYZc'

O.set(O.at(1), '', 'abc')
// 'ac'

O.remove(O.at(1), 'abc')
// 'ac'
```

### `head` {#`head`}

`head :: Prism`

`at(0)`的简写。

### `atKey` {#`atkey`}

`atKey :: (key) => RemovablePrism`

_仅适用于记录（`Record<string, T>`）。可移除。_

创建一个聚焦于记录键的棱镜。

示例：

```typescript
O.preview(O.atKey('foo'), { foo: 'bar' })
// 'bar'

O.preview(O.atKey('foo'), { hello: 'world' })
// undefined

O.set(O.atKey('foo'), 123, { foo: 'bar', hello: 'world' })
// { foo: 123, hello: 'world' }

O.set(O.atKey('foo'), 123, { hello: 'world' })
// { hello: 'world' }

O.remove(O.atKey('foo'), { foo: 'bar', hello: 'world' })
// { hello: 'world' }
```

### `find` {#`find`}

`find :: (fn: (elem) => boolean) => RemovablePrism`

_仅适用于数组。可移除。_

创建一个棱镜，聚焦于数组中第一个匹配谓词 `fn` 的元素。

示例：

```typescript
const negativeElem = O.find((x: number) => x < 0)

O.preview(negativeElem, [1, 0, -1, -2])
// -1

O.modify(negativeElem, (x) => -x, [1, 0, -1, -2])
// [1, 0, 1, -2]

O.preview(negativeElem, [0, 2, 1])
// undefined
```

### `when` {#`when`}

`when :: (fn: (value) => boolean) => Prism`

创建一个棱镜，当焦点匹配谓词 `fn` 时，它会匹配。特别适用于过滤遍历的焦点。

示例：

```typescript
const longWords = O.compose(
    O.words,
    O.when((s: string) => s.length >= 5)
)
const text = 'Some shorter and some longer words'

O.collect(longWords, text)
// ['shorter', 'longer', 'words']

O.modify(longWords, (s) => s.toUpperCase(), text)
// "Some SHORTER and some LONGER WORDS"
```

## Traversals {#traversals}

### `elems` {#`elems`}

`elems :: Traversal`

_仅适用于数组。_

一个遍历，聚焦于数组的所有元素。

```typescript
O.collect(O.compose(O.elems, 'foo', 'bar'), [
    { foo: { bar: 1 } },
    { foo: { bar: 2 } },
])
// [1, 2]
```

## Getters {#getters}

Getters 是具有单一焦点的只读光学元素。你可以将它们视为单向同构或只读镜头。

### `to` {#`to`}

`to :: (fn: (v) => u) => Getter`

创建一个 getter，将函数 `fn` 应用于其焦点。

## Setters {#setters}

### `prependTo`, `appendTo` {#`prependto`,-`appendto`}

`prependTo :: Setter`<br> `appendTo :: Setter`

_仅适用于数组。_

`prependTo` 聚焦于数组的第一个元素之前的部分，`appendTo` 聚焦于数组的最后一个元素之后的部分。当通过写入时，将值前置或追加到数组。

```typescript
O.set(O.appendTo, 3, [0, 1, 2])
// [0, 1, 2, 3]

O.set(O.prependTo, 3, [0, 1, 2])
// [3, 0, 1, 2]
```

## String traversals {#string-traversals}

### `chars` {#`chars`}

`chars :: Traversal`

_仅适用于字符串。_

一个遍历，聚焦于字符串的所有字符。

当通过写入时，可以通过写入空字符串来删除字符，或者更改为更长的字符串。

```typescript
O.collect(O.chars, 'foo')
// ['f', 'o', 'o']

O.modify(O.chars, (c) => (c == 'o' ? '' : c.toUpperCase()), 'foobar')
// 'FBAR'
```

### `words` {#`words`}

`words :: Traversal`

_仅适用于字符串。_

一个遍历，聚焦于字符串的所有单词。单词是由空格分隔的子字符串。

当通过写入时，可以通过写入空字符串来删除单词，或者更改为更长或更短的字符串。

```typescript
O.collect(O.words, 'foo, bar')
// ['foo,', 'bar']

O.modify(O.words, (word) => word.split('').reverse().join(''), 'foo, bar')
// ',oof rab'
```

## Miscellaneous {#miscellaneous}

### `eq` {#`eq`}

`eq :: Equivalence`

Equivalence 是一个不做任何事情的空操作。在组合中充当身份。

### `pipe` {#`pipe`}

`pipe :: (a, f1, f2, ...) => v`

将表达式的值（`a`）传入最多 9 个一元函数（`f1`，`f2`，...）的管道。

示例：

```typescript
pipe(
  { foo: 1, bar: { baz: 2 } },
  O.set(O.prop('foo'), 3),
  O.modify(O.compose('bar', 'baz'), (v: number) => -v)
)
// { foo: 3, bar: { baz: -2 } }
```
