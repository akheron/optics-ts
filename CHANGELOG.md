# Changelog

## 1.1.0 (unreleased)

- **New features**
  - Change `.index()` to also work on strings
  - Add `.head()` as an alias to `.index(0)`
  - Add string optics: `.chars()`, `.words()`
  - Add `Setter` optic class
  - Add setters `.prependTo()` and `.appendTo()`
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
