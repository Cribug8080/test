<template>
    <div ref="scroll" class="page">
        <div class="content">
            <ul>
                <li v-for="(item, i) in list" :key='i'>{{i}}</li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
BScroll.use(PullDown)
export default {
    data() {
        return {
            list: new Array(20).fill(1),
            scroll: undefined
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.scroll, {
            scrollY: true,
            pullDownRefresh: true
        })
        window.console.log(this.scroll.hasVerticalScroll, this.scroll.scrollerHeight, this.scroll.wrapperHeight)

    }
}
</script>

<style>
* {
    margin: 0;
    border: none;
    padding: 0;
}
html {
    font-size: 12px;
}
.page {
    height: 50rem;
    background-color: #eee;
    font-size: 2rem;
    overflow: hidden;
}
</style>
