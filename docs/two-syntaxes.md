# 两种语法 {#the-two-syntaxes}

自optics-ts v2.2.0起，光学有两种语法：**方法链**和**独立光学**。方法链是默认的，经过试验和测试的语法。独立语法仍然是实验性的，但它可能会在未来成为默认语法。

在文档的其他部分，所有的例子都以两种语法给出。某些光学在语义上也有细微的差异，这些都有明确的文档记录。

以下部分总结了两种语法之间的最大差异。

## 导入 {#importing}

**方法链**

```typescript
import * as O from 'optics-ts'
```

**独立**

```typescript
import * as O from 'optics-ts/standalone'
```

## 组合 {#composing}

**方法链**

这种语法的名字是"方法链"，因为光学是通过方法链来组合的，也被称为[流畅接口](https://en.wikipedia.org/wiki/Fluent_interface)。组合总是从某个根类型（下面的例子中的`MyType`）开始，这将光学绑定到它操作的数据结构的类型上。

```typescript
O.optic<MyType>()
    .prop('foo')
    .optional()
    .when((value) => value > 42)
```

**独立**

这种语法的名字来源于光学是_独立_的函数和值，即它们"浮动"，而不是绑定到任何具体的类型上。当然，它们需要数据具有特定的形状，但你不需要在代码中明确地声明类型。

不预先将光学绑定到任何特定类型的含义是，你需要在某些地方添加类型注解，比如下面例子中`O.when`的参数`(value: number) => ...`。

```typescript
O.compose(
    'foo',
    O.optional,
    O.when((value: number) => value > 42)
)
```

## 柯里化 {#currying}

**方法链**

像`O.get`、`O.modify`和`O.set`这样的操作函数只有完全柯里化的形式：

```typescript
O.get(myOptic)(myData)
O.modify(myOptic)((value) => value + 1)(myData)
```

**独立**

提供了柯里化和非柯里化的版本：

```typescript
O.get(myOptic, myData)
O.get(myOptic)(myData)

O.modify(myOptic, (value) => value + 1, myData)
O.modify(myOptic)((value) => value + 1, myData)
O.modify(myOptic)((value) => value + 1)(myData)
```

## 树摇 {#tree-shaking}

**方法链**

不可能进行树摇。整个库总是包含在包中。

**独立**

完全可以进行树摇。只有你使用的功能才会被包含在包中。

## 编译速度 {#compilation-speed}

看起来使用独立语法编译大型程序比使用方法链稍慢。然而，一个好的、可重复的基准测试仍在待办事项列表中。此外，TypeScript编译器在未来的改进可能会显著影响编译速度。

## 运行时性能 {#runtime-performance}

两者之间应该没有性能差异，尽管还没有基准测试来证明这一点。
