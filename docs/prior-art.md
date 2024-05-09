# 现有技术 {#prior-art}

JavaScript有许多不同程度的光学库，但TypeScript的光学库却很少。在TypeScript中创建好的光学类型通常很困难，如果试图在现有的JavaScript实现上添加类型，任务就变得不可能。

- [partial.lenses](https://github.com/calmm-js/partial.lenses) 可以说是JavaScript最全面、最优雅的光学库，也是optics-ts的灵感来源。

- [monocle-ts](https://github.com/gcanti/monocle-ts) 可能是最受欢迎的TypeScript光学库。

- [@grammarly/focal](https://github.com/grammarly/focal) 并不是一个光学库，而是一个TypeScript的UI框架。

光学类的命名受到了Oleg Grenrus的[Glassery](http://oleg.fi/gists/posts/2017-04-18-glassery.html)的启发。