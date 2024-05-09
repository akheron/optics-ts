# optics-ts {#optics-ts}

`optics-ts` 为 TypeScript 提供类型安全、符合人体工程学、多态的光学元素

- 许多光学类型：镜头、棱镜、遍历、获取器、仿射折叠、折叠、设置器
- 用于操作多种数据类型的光学元素：对象、数组、辨识联合、字符串。
- 可移除的光学元素：允许从容器中移除项目。
- 人体工程学 API：无样板文件，简洁的命名。
- 类型安全：编译器将对您进行的所有操作进行类型检查。永远不会有 `any`。
- 大多数光学元素都是完全多态的：您可以编写不同的数据类型并仍然获得完全的类型安全性。
- 在单一代码库中支持 ES6 和 CommonJS 模块。
- 通过独立光学元素支持树摇动（请参见[两种语法](two-syntaxes.md)）。

## 示例 {#example}

=== "方法链"

    ```typescript
    import * as O from 'optics-ts'

    type Book = {
      title: string
      isbn: string
      author: {
        name: string
      }
    }

    // 创建一个聚焦于 author.name 的镜头
    const optic = O.optic_<Book>()
      .prop('author')
      .prop('name')

    // 这是输入数据
    const input: Book = {
      title: "银河系漫游指南"
      isbn: "978-0345391803",
      author: {
        name: "道格拉斯·亚当斯"
      }
    }

    // 通过光学元素读取
    O.get(optic)(input)
    // "道格拉斯·亚当斯"

    // 通过光学元素写入
    O.set(optic)("亚瑟·登特")(input)
    // {
    //   title: "银河系漫游指南"
    //   isbn: "978-0345391803",
    //   author: {
    //     name: "亚瑟·登特"
    //   }
    // }

    // 通过光学元素更新现有值，同时也改变数据类型
    O.modify(optic)(str => str.length + 29)(input)
    // {
    //   title: "银河系漫游指南"
    //   isbn: "978-0345391803",
    //   author: {
    //     name: 42
    //   }
    // }
    ```

=== "独立"

    ```typescript
    import * as O from 'optics-ts/standalone'

    // 创建一个聚焦于 author.name 的镜头
    const optic = O.compose('author', 'name')

    // 这是输入数据
    const input = {
      title: "银河系漫游指南"
      isbn: "978-0345391803",
      author: {
        name: "道格拉斯·亚当斯"
      }
    }

    // 通过光学元素读取
    O.get(optic, input)
    // "道格拉斯·亚当斯"

    // 通过光学元素写入
    O.set(optic, "亚瑟·登特", input)
    // {
    //   title: "银河系漫游指南"
    //   isbn: "978-0345391803",
    //   author: {
    //     name: "亚瑟·登特"
    //   }
    // }

    // 通过光学元素更新现有值，同时也改变数据类型
    O.modify(optic, (str) => str.length + 29, input)
    // {
    //   title: "银河系漫游指南"
    //   isbn: "978-0345391803",
    //   author: {
    //     name: 42
    //   }
    // }
    ```

有关方法链和独立语法之间的差异的更多信息，请参见[两种语法](two-syntaxes.md)。
