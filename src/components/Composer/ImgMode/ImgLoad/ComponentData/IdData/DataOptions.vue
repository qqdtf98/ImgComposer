<template>
  <div id="data-options">
    <div
      v-for="(data, i) in dataList"
      :key="i"
      class="data-option"
      @click="addData(data)"
    >
      <div class="option">
        {{ data }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup(props, ctx) {
    const dataList = reactive<string[]>([
      'data',
      'props',
      'computed',
      'methods',
      'emit',
    ])

    function addData(data: string) {
      ctx.emit('add-data', data)
    }

    return {
      dataList,
      addData,
    }
  },
})
</script>

<style lang="scss">
#data-options {
  background-color: #fff;
  box-shadow: 0px 0px 1px 1px #888888;
  border-radius: 0.3rem;
  position: absolute;
  margin-top: 0.5rem;

  .data-option {
    cursor: pointer;
    &:hover {
      background-color: #e7e7e7;
    }

    .option {
      font-size: 0.9rem;
      padding: 0.3rem 0.6rem 0.3rem 0.6rem;
    }
  }
}
</style>
