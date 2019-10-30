<template>
    <div>
        <div>{{count}}</div>
        <button @click="add">add</button>
    </div>
</template>
<script>
export default {
    name: 'dataFn',
    data: {
        count: 0,
    },
    methods: {
        add(){
            console.log(this.count)
            this.count += 1;
        },
    }
}
</script>