<template>
  <div id="db-options">
    <div
      v-for="(data, i) in dataList"
      :key="i"
      class="data-option"
      @click="showTable(data)"
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
      'select',
      'insert',
      'update',
      'delete',
    ])

    function showTable(data: string) {
      ctx.emit('show-table', data)
    }

    return {
      dataList,
      showTable,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/component-composer/common-styles.scss' as *;

#db-options {
  @include tip-style;
  position: absolute;
  margin-top: 0.5rem;
  padding: 5px 0;

  .data-option {
    cursor: pointer;

    &:hover {
      background-color: #e7e7e7;
    }

    .option {
      color: black;
      font-size: 0.9rem;
      padding: 0.3rem 0.6rem 0.3rem 0.6rem;
    }
  }
}
</style>
