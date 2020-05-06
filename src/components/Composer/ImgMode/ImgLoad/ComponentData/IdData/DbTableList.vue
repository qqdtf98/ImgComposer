<template>
  <div id="db-tables">
    <div class="option-wrapper">
      <div class="db-option">{{ operation }}</div>
      <div class="db-text">{{ opData[operation] }}</div>
    </div>
    <div
      v-for="(table, i) in tableList"
      :key="i"
      class="table-list"
      @click="addDbSql(table)"
    >
      <div class="option">{{ table }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  props: {
    operation: String,
  },
  setup(props, ctx) {
    const opData: Record<string, string> = {
      select: 'from',
      insert: 'into',
      delete: 'from',
      update: '',
    }

    const tableList = reactive<string[]>(['table1', 'table2', 'table3'])

    function addDbSql(table: string) {
      const sqlData = {
        type: props.operation,
        text: opData[props.operation as string],
        table,
      }
      ctx.emit('table-select', sqlData)
    }

    return {
      tableList,
      opData,
      addDbSql,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/component-composer/common-styles.scss' as *;

#db-tables {
  @include tip-style;
  position: absolute;
  margin-top: 0.5rem;
  padding: 5px 0;

  .option-wrapper {
    display: flex;
    flex-direction: row;
    padding: 0.3rem 0.6rem 0.3rem 0.6rem;

    .db-option {
      color: blue;
    }
    .db-text {
      margin-left: 6px;
    }
  }
  .table-list {
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
