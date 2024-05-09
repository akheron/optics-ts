# 互操作性 {#interoperability}

!!! danger "实验性"

    此模块处于实验阶段，可能会在不对应的semver bump的情况下接收到向后不兼容的更改。

自optics-ts v2.2.0起，光学有两种语法：**方法链**和**独立光学**。这里记录的_互操作性API_定义了两种语法之间的桥梁，例如，给予库作者自由，允许他们的用户使用任一种语法。

以下所有内容都假设有如下导入：

```typescript
import * as I from 'optics-ts/interop'
```

此模块定义了以下函数：

- `I.get :: (optic, value) => value`
- `I.preview :: (optic, value) => value | undefined`
- `I.collect :: (optic, value) => value[]`
- `I.modify :: (optic, fn, value) => value`
- `I.set :: (optic, fn, value) => value`

这些函数的`optic`参数可以是：

- [方法链](reference-mc.md)光学
- [独立](reference-standalone.md)光学

否则，这些函数的工作方式与任一API中的对应操作完全相同。
