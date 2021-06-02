# Installation

With npm:

```
npm install --save optics-ts
```

With yarn:

```
yarn add optics-ts
```

## Requirements

TypeScript >= 4.1 and the
[`strictNullChecks` compiler option](https://www.typescriptlang.org/tsconfig#strictNullChecks)
are required.

I strongly recommend enabling all strict options in your project's
`tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

If this is not possible for your project, enable only the `strictNullChecks`
option:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```
