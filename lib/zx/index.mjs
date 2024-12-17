// script.ts
import { $ } from 'zx'

const list = await $`ls -la`

console.log(list)