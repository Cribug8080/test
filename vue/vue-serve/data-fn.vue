<template>
    <div>
        <div>{{count}}</div>
        <button @click="add">add</button>
    </div>
</template>
<script>
export default {
    name: 'dataFn',
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        add(){
            this.count += 1;
        },
    }
}
</script>