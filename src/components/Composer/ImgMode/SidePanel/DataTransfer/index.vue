<template>
  <div class="side-panel-data">
    <div class="header-container">
      <h1 class="header">Data Transfer</h1>
      <p class="add" @click="showDataTransfer">+</p>
    </div>
    <DataTransferAdd v-show="dataState" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import DataTransferAdd from './DataTransferAdd/index.vue'
import { useVuex } from '../../../../../modules/vue-hooks'

export default defineComponent({
  components: { DataTransferAdd },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const dataState = ref(false)

    function showDataTransfer() {
      if (vuex.identifier.identifierData.length > 1) {
        dataState.value = true
      }
    }

    return {
      dataState,
      showDataTransfer,
    }
  },
})
</script>

<style lang="scss">
.side-panel-data {
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header {
      font-size: 17px;
      font-weight: 500;
    }

    .add {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      font-size: 20px;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }

      &:active {
        background-color: #e0e0e0;
      }
    }
  }
}
</style>
