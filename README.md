# optics-ts

[![构建](https://github.com/akheron/optics-ts/workflows/tests/badge.svg)](https://github.com/akheron/optics-ts/actions/workflows/tests.yml)

`optics-ts`为TypeScript提供类型安全、人性化、多态的光学特性：

- **光学特性**允许你从深层嵌套的数据结构中读取或修改值，同时保持所有数据的不变性。
- **人性化**：光学特性通过方法链进行组合，使其易用且有趣！
- **多态**：通过光学特性写入时，你可以改变嵌套结构中的数据类型。
- **类型安全**：编译器将对你执行的所有操作进行类型检查。永远不会有 `any`。

➡ [文档](https://akheron.github.io/optics-ts) ⬅

## 特性

`optics-ts`支持镜头、棱镜、遍历、从容器中移除项目，等等！

自 optics-ts v2.2.0起，定义光学特性有两种语法：方法链（默认）和独立光学特性（实验性）。查看[文档](https://akheron.github.io/optics-ts)获取更多信息！

## 入门

安装：

```bash
npm install optics-ts
```

或者

```bash
yarn add optics-ts
```

这是一个简单的示例，演示了如何使用镜头深入到嵌套的数据结构中：

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
const optic = O.optic_<Book>().prop('author').prop('name')

// 这是输入数据
const input: Book = {
  title: "The Hitchhiker's Guide to the Galaxy",
  isbn: '978-0345391803',
  author: {
    name: 'Douglas Adams',
  },
}

// 通过光学特性读取
O.get(optic)(input)
// "Douglas Adams"

// 通过光学特性写入
O.set(optic)('Arthur Dent')(input)
// {
//   title: "The Hitchhiker’s Guide to the Galaxy"
//   isbn: "978-0345391803",
//   author: {
//     name: "Arthur Dent"
//   }
// }

// 通过光学特性更新现有值，同时改变数据类型
O.modify(optic)((str) => str.length + 29)(input)
// {
//   title: "The Hitchhiker’s Guide to the Galaxy"
//   isbn: "978-0345391803",
//   author: {
//     name: 42
//   }
// }
```

另一个示例，将所有长度大于5个字符的单词转换为大写：

```typescript
import * as O from 'optics-ts/standalone'

const optic = O.optic<string>().words().when(s => s.length >= 5)

const input = 'This is a string with some shorter and some longer words'
O.modify(optic)((s) => s.toUpperCase()(input)
// "This is a STRING with some SHORTER and some LONGER WORDS"
```

查看[文档](https://akheron.github.io/optics-ts)获取教程和所有支持的光学特性的详细参考。

## 开发

运行 `yarn` 安装依赖。

### 运行测试套件

运行 `yarn test`。

为了在文件更改时编译和运行测试，分别在不同的终端运行以下命令：

```bash
yarn build:test --watch
yarn jest dist-test/ --watchAll
```

### 文档

你需要Python 3来构建文档。

```bash
python3 -m venv venv
./venv/bin/pip install mkdocs-material
```

运行一个实时重载的文档服务器：

```bash
./venv/bin/mkdocs serve
```

在浏览器中打开 http://localhost:8000/。

### 发布

```bash
$ yarn version --new-version <major|minor|patch>
$ yarn publish
$ git push origin main --tags
```

打开 https://github.com/akheron/optics-ts/releases，编辑草稿发布，选择最新的版本标签，根据需要调整描述。
