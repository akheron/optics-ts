# Interoperability {#interoperability}

!!! danger "Experimental"

    This module is experimental and may receive backwards incompatible changes
    without a corresponding semver bump.

Since optics-ts v2.2.0, there are two syntaxes for optics: **method chaining**
and **standalone optics**. The _interoperability API_, documented here, defines
a bridge between the two syntaxes, giving e.g. library authors the freedom to
allow their users to use either syntax.

Everything below assumes the following import:

```typescript
import * as I from 'optics-ts/interop
```

This module defines the following functions:

- `I.get :: (optic, value) => value`
- `I.preview :: (optic, value) => value | undefined`
- `I.collect :: (optic, value) => value[]`
- `I.modify :: (optic, fn, value) => value`
- `I.set :: (optic, fn, value) => value`

The `optic` parameter for these function can be any of:

- A [method chaining](reference-mc.md) optic
- A [standalone](reference-standalone.md) optic

Otherwise the functions work exactly like the corresponding operations in either
API.
