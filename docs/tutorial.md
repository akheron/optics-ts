# 教程 {#tutorial}

所有示例都假定了以下的导入。

方法链：

```typescript
import * as O from 'optics-ts'
```

独立：

```typescript
import * as O from 'optics-ts/standalone'
```

查看[两种语法](two-syntaxes.md)了解两者之间的区别，以及应该选择哪一种。以下所有的描述和示例都将以两种语法给出。

## 镜头 {#lens}

=== "方法链"

    镜头是你将要使用的最常见的光学元素。你可以通过调用 `optic()` 为一个数据结构创建一个光学元素，并通过 `prop` 将其转换为一个关注对象属性的镜头：

    ```typescript
    type Data = {
      foo: { bar: number }
      other: string
    }
    const foo = O.optic<Data>().prop('foo')
    ```

    `foo` 现在是一个关注 `Data.foo` 的镜头。

    要深入挖掘，只需再次调用 `prop`：

    ```typescript
    const bar = O.optic<Data>().prop('foo').prop('bar')
    // 或者从我们上面定义的 `foo` 镜头开始
    const bar = foo.prop('bar')
    // 或者使用 .path() 通过一次调用组合多个 prop 镜头
    const bar = O.optic<Data>().path('foo', 'bar')
    // 或者使用带有点分隔的字符串路径的 path
    const bar = O.optic<Data>().path('foo.bar')
    ```

    使用 `get` 通过镜头读取一个值：

    ```typescript
    const data: Data = {
      foo: { bar: 42 },
      other: 'stuff',
    }

    O.get(bar)(data)
    // 42
    ```

    使用 `set` 或 `modify` 通过镜头写入关注的值：

    ```typescript
    O.set(bar)(99)(data)
    // {
    //   foo: { bar: 99 },
    //   other: 'stuff'
    // }

    O.modify(bar, (x) => x * 100, data)
    // {
    //   foo: { bar: 4200 },
    //   other: 'stuff'
    // }
    ```

=== "独立"

    镜头是你将要使用的最常见的光学元素。你可以创建一个关注对象属性的镜头：

    ```typescript
    const foo = O.prop('foo')
    ```

    `foo` 现在是一个关注任何给定对象的 `foo` 属性的镜头。

    要深入挖掘，组合多个 `prop` 镜头：

    ```typescript
    const bar = O.compose(O.prop('foo'), O.prop('bar'))
    // 或者复用我们上面定义的 `foo` 镜头
    const bar = O.compose(foo, O.prop('bar'))
    ```

    因为 `prop` 是一个经常使用的镜头，你可以直接将字符串参数传递给 `compose`，它们将被视为 `prop` 镜头：

    ```typescript
    const bar = O.compose('foo', 'bar')
    ```

    使用 `get` 通过镜头读取一个值：

    ```typescript
    const data = {
      foo: { bar: 42 },
      other: 'stuff',
    }

    O.get(bar, data)
    // 42
    ```

    使用 `set` 或 `modify` 通过镜头写入关注的值：

    ```typescript
    O.set(bar, 99, data)
    // {
    //   foo: { bar: 99 },
    //   other: 'stuff'
    // }

    O.modify(bar, (x) => x * 100, data)
    // {
    //   foo: { bar: 4200 },
    //   other: 'stuff'
    // }
    ```

通过光学元素写入总是会创建一个新的数据结构，而不是就地修改现有的数据结构，只复制所需的部分。换句话说，数据是不可变的。

## Prism {#prism}

透镜非常适合聚焦到更大结构的一部分。棱镜很像透镜，但它们不一定匹配任何东西，即它们可以有零焦点。

一个实际的例子是聚焦到联合类型的一个分支。在这里，`User.age`字段可以是`number`或`undefined`。使用`optional`棱镜，我们只在值为`number`时聚焦，当它为`undefined`时不做任何事情：

=== "方法链"

        ```typescript
        type User = {
            name: string
            age?: number | undefined
        }

        const age = O.optic<User>().prop('age').optional()
        ```

=== "独立"

        ```typescript
        type User = {
            name: string
            age?: number | undefined
        }

        const age = O.compose('age', O.optional)
        ```

你可以使用`preview`函数通过棱镜阅读。当棱镜不匹配时，它返回`undefined`。

=== "方法链"

        ```typescript
        const userWithAge: User = {
            name: 'Betty',
            age: 42,
        }
        O.preview(age)(userWithAge)
        // 42

        const userWithoutAge: User = {
            name: 'Max',
            age: undefined,
        }
        O.preview(age)(userWithoutAge)
        // undefined
        ```

=== "独立"

        ```typescript
        const userWithAge: User = {
            name: 'Betty',
            age: 42,
        }
        O.preview(age, userWithAge)
        // 42

        const userWithoutAge: User = {
            name: 'Max',
            age: undefined,
        }
        O.preview(age, userWithoutAge)
        // undefined
        ```

你可以用`set`和`modify`正常地通过棱镜写入。如果棱镜不匹配，值不变：

=== "方法链"

        ```typescript
        O.modify(age)((n) => n + 1)(userWithAge)
        // {
        //   name: 'Betty',
        //   age: 43,
        // }

        O.set(age)(60)(userWithoutAge)
        // {
        //   name: 'Max',
        //   age: undefined,
        // }
        ```

=== "独立"

        ```typescript
        O.modify(age, (n) => n + 1, userWithAge)
        // {
        //   name: 'Betty',
        //   age: 43,
        // }

        O.set(age, 60, userWithoutAge)
        // {
        //   name: 'Max',
        //   age: undefined,
        // }
        ```

`guard`是创建棱镜的另一种方式。它是`optional`的泛化，意味着你可以匹配联合类型的任何分支，而不仅仅是非`undefined`部分：

```typescript
interface Circle {
    kind: 'circle'
    radius: number
}
interface Rectangle {
    kind: 'rectangle'
    width: number
    height: number
}
type Shape = Circle | Rectangle

function isRectangle(s: Shape): s is Rectangle {
    return s.kind === 'rectangle'
}
```

=== "方法链"

        ```typescript
        const rectWidth = O.optic<Shape>().guard(isRectangle).prop('width')

        O.preview(rectWidth)({ kind: 'circle', radius: 10 })
        // undefined

        O.preview(rectWidth)({ kind: 'rectangle', width: 5, height: 7 })
        // 5

        O.modify(rectWidth)((w) => w * 2)({ kind: 'rectangle', width: 5, height: 7 })
        // { kind: 'rectangle', width: 10, height: 7 })
        ```

=== "独立"

        ```typescript
        const rectWidth = O.compose(O.guard(isRectangle), 'width')

        O.preview(rectWidth, { kind: 'circle', radius: 10 })
        // undefined

        O.preview(rectWidth, { kind: 'rectangle', width: 5, height: 7 })
        // 5

        O.modify(rectWidth, (w) => w * 2, { kind: 'rectangle', width: 5, height: 7 })
        // { kind: 'rectangle', width: 10, height: 7 })
        ```

注意，上面我们如何将`guard`棱镜与`prop`透镜组合。这产生了一个棱镜，所以我们使用`preview`来通过它阅读。查看[组合规则](reference-intro.md#rules-of-composition)以获取更多信息。

## 可移除的光学元素 {#removable-optics}

有些光学元素是可移除的。这意味着它们聚焦到容器（例如，数组）的一个元素，并且你可以从容器中移除该元素。

`at`是一个可移除的棱镜。它聚焦到数组的一个索引，并且也让你可以移除该索引：

=== "方法链"

        ```typescript
        interface User {
            name: string
        }

        const threeUsers: User[] = [
            { name: 'Max' },
            { name: 'Betty' },
            { name: 'Alice' },
        ]

        const secondUser = O.optic<User[]>().at(1)
        O.remove(secondUser)(threeUsers)
        // [{ name: 'Max' }, { name: 'Alice' }]
        ```

=== "独立"

        ```typescript
        interface User {
            name: string
        }

        const threeUsers: User[] = [
            { name: 'Max' },
            { name: 'Betty' },
            { name: 'Alice' },
        ]

        O.remove(O.at(1), threeUsers)
        // [{ name: 'Max' }, { name: 'Alice' }]
        ```

如果光学元素不匹配，移除操作没有效果：

=== "方法链"

        ```typescript
        const oneUser: User[] = [{ name: 'Max' }]

        O.remove(secondUser)(oneUser)
        // [{ name: 'Max' }]
        ```

=== "独立"

        ```typescript
        const oneUser: User[] = [{ name: 'Max' }]

        O.remove(O.at(1), oneUser)
        // [{ name: 'Max' }]
        ```

## 遍历 {#traversal}

下一个光学元素类型是遍历。虽然透镜有一个焦点，棱镜有零个或一个焦点（不匹配或匹配），遍历有零个或更多的焦点。

遍历的最简单例子是聚焦到数组的所有元素。要创建这样的遍历，使用`elems`：

=== "方法链"

        ```typescript
        type Person {
            name: string
            friends: Person[]
        }

        const friendsNames = O.optic<Person>()
            .prop('friends')
            .elems()
            .prop('name')
        ```

=== "独立"

        ```typescript
        type Person {
            name: string
            friends: Person[]
        }

        const friendsNames = O.compose('friends', O.elems, 'name')
        ```

要通过遍历进行读取，调用`collect`将所有聚焦的元素收集到一个数组中：

=== "方法链"

        ```typescript
        const john = { name: 'John', friends: [] }
        const bruce = { name: 'Bruce', friends: [] }
        const amy = { name: 'Amy', friends: [john, bruce] }

        O.collect(friendsNames)(amy)
        // [ 'John', 'Bruce' ]
        ```

=== "独立"

        ```typescript
        const john = { name: 'John', friends: [] }
        const bruce = { name: 'Bruce', friends: [] }
        const amy = { name: 'Amy', friends: [john, bruce] }

        O.collect(friendsNames, amy)
        // [ 'John', 'Bruce' ]
        ```

通过遍历进行写入会写入到所有聚焦的值：

=== "方法链"

        ```typescript
        O.modify(friendsNames)((name) => `${name} Wayne`)(amy)
        // {
        //   name: 'Amy',
        //   friends: [
        //     { name: 'John Wayne', friends: [] },
        //     { name: 'Bruce Wayne', friends: [] },
        //   ],
        // }
        ```

=== "独立"

        ```typescript
        O.modify(friendsNames, (name) => `${name} Wayne`, amy)
        // {
        //   name: 'Amy',
        //   friends: [
        //     { name: 'John Wayne', friends: [] },
        //     { name: 'Bruce Wayne', friends: [] },
        //   ],
        // }
        ```

再次注意我们如何使用`prop`、`elems`和`prop`，将透镜与遍历组合，然后再与透镜组合。这产生了一个遍历。查看[组合规则](reference-intro.md#rules-of-composition)以获取更多信息。

有时候，我们需要进一步关注遍历的某些元素。这可以通过将遍历与像`when`这样的棱镜组合来实现，`when`会跳过不符合谓词的项：

=== "方法链"

        ```typescript
        const even = O.optic<number[]>()
            .elems()
            .when((n) => n % 2 === 0)

        O.modify(even)((n) => -n)([1, 2, 3, 4, 5])
        // [1, -2, 3, -4, 5]
        ```

=== "独立"

        ```typescript
        const even = O.compose(
            O.elems,
            O.when((n: number) => n % 2 === 0)
        )

        O.modify(even, (n) => -n, [1, 2, 3, 4, 5])
        // [1, -2, 3, -4, 5]
        ```

## 多态性 {#polymorphism}

=== "方法链"

        光学元素可以是多态的，这意味着你可以通过光学元素改变焦点的类型。由于这是一个相对罕见的用例，如果不小心进行可能会造成混淆，因此使用`optic_`（注意下划线）创建多态光学元素：

        ```typescript
        type Data = {
            foo: { bar: string }
            other: boolean
        }
        const bar = O.optic_<Data>().path('foo.bar')
        ```

=== "独立"

        光学元素可以是多态的，这意味着你可以通过光学元素改变焦点的类型。

        ```typescript
        type Data = {
            foo: { bar: string }
            other: boolean
        }
        const bar = O.compose('foo', 'bar')
        ```

让我们修改`bar`，使其包含原始字符串的长度：

=== "方法链"

        ```typescript
        const data: Data = {
            foo: { bar: 'hello there' },
            other: true,
        }

        const updated = O.modify(bar)((str) => str.length)(data)
        // {
        //   foo: { bar: 11 },
        //   other: true
        // }
        ```

        这是一个类型安全的操作，即编译器知道`updated.foo.bar`的类型是`number`，编辑器自动完成工作正常，等等。

        如果你在`optics-ts`函数的返回值中看到了`DisallowedTypeChange`类型，那就意味着你试图通过非多态（单态）光学元素改变类型。

=== "独立"

        ```typescript
        const data: Data = {
            foo: { bar: 'hello there' },
            other: true,
        }

        const updated = O.modify(bar, (str) => str.length, data)
        // {
        //   foo: { bar: 11 },
        //   other: true
        // }
        ```

        这是一个类型安全的操作，即编译器知道`updated.foo.bar`的类型是`number`，编辑器自动完成工作正常，等等。
