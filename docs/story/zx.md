
# [zx](https://google.github.io/zx/getting-started)

A tool for writing better scripts


## js使用zx
```ts
// script.ts
import { $ } from 'zx'

const list = await $`ls -la`

console.log(list)
```

## 直接写脚本
```bash
brew install zx
```

脚本文件
```js
#!/usr/bin/env zx
```
运行
```bash
chmod +x ./script.mjs
./script.mjs
```
或者
```bash
zx ./script.mjs
```