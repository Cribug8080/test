<template>
    <div>
      <h1>hello vue serve</h1>
      <DataFn></DataFn>
      <div>
        number: <input v-model.number="input">
        <button @click="valFn">valFn</button>
      </div>
      <div>
        lazy: <input v-model.lazy="input">
        <button @click="valFn">valFn</button>
      </div>
      <div>
        trim: <input v-model.trim="input">
        <button @click="valFn">valFn</button>
      </div>
    </div>
</template>

<script>
import DataFn from './data-fn'
export default {
  name: 'test',
  data() {
    return {
      input: '',
    }
  },
  components: {
    DataFn
  },
  methods: {
    valFn() {
      window.console.log(this.input)
    }
  }
}
</script>