# Changelog

## 2.0.0 (unreleased)

- **New features**
  - Add `.nth()`

## 1.2.0

- **New features**
  - Add `.at()`
  - Make `.find()` removable
- **Deprecations**
  - Deprecate `.index()` in favor of `.at()`
- **Documentation**
  - `strictNullChecks` compiler option is required (#5)

## 1.1.0

- **New features**
  - Change `.index()` to also work on strings
  - Add `.head()` as an alias to `.index(0)`
  - Add string optics: `.chars()`, `.words()`
  - Add `Setter` optic class
  - Add setters `.prependTo()` and `.appendTo()`
  - Add top-level `remove()`
  - Change `.index()` to be removable
  - Add `.valueOr()`
- **Fixes**
  - Top level `compose()` signatures were totally screwed up

## 1.0.0

- **New features**
  - Add `Getter`, `AffineFold` and `Fold` optic classes
  - Add `.to()` method for creating Getters
- **Fixes**
  - Disallow array optics on `T[] | undefined` and `T[] | null`

## 0.1.0

- Initial release
