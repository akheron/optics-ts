# Prior art

There are many existing optics libraries of varying degree for JavaScript, but
only few for TypeScript. It's generally hard to create good typings for optics
in TypeScript, and the task becomes impossible if one tried to retrofit types on
an existing JavaScript implementation.

- [monocle-ts](https://github.com/gcanti/monocle-ts) is probably the most
  popular TypeScript optics library.

- [@grammarly/focal](https://github.com/grammarly/focal) is not an optics
  library per se, rather an UI framework for TypeScript.

The naming of optic classes was inspired by
[Glassery](http://oleg.fi/gists/posts/2017-04-18-glassery.html) by Oleg Grenrus.
