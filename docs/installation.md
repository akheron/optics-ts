# 安装 {#installation}

使用 npm:

```
npm install --save optics-ts
```

使用 yarn:

```
yarn add optics-ts
```

## 要求 {#requirements}

需要 TypeScript >= 4.1 和
[`strictNullChecks` 编译器选项](https://www.typescriptlang.org/tsconfig#strictNullChecks)。

我强烈建议在您的项目的
`tsconfig.json` 中启用所有严格选项：

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

如果您的项目无法做到这一点，只启用 `strictNullChecks` 选项：

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```
