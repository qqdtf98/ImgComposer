<template>
  <div class="side-panel-data">
    <div class="header-container">
      <h1 class="header">Data Transfer</h1>
      <p class="add" @click="showDataTransfer">+</p>
      <img
        class="fold-panel-data"
        src="@/assets/images/rightarrow.svg"
        @click="foldDataTransfer"
      />
    </div>

    <div v-show="isElementUnfolded" class="data-value-list">
      <h4 @click="viewEveryCompo">view all</h4>
      <vue-custom-scrollbar class="panel-transfer-area">
        <DataValue
          v-for="(event, i) in vuex.dataTransfer.eventTransfer"
          :key="i"
          :transferData="event"
        />
        <DataValue
          v-for="(props, i) in vuex.dataTransfer.propsTransfer"
          :key="`p+${i}`"
          :transferData="props"
        />
        <DataValue
          v-for="(global, i) in vuex.dataTransfer.globalTransfer"
          :key="`g+${i}`"
          :transferData="global"
        />
      </vue-custom-scrollbar>
    </div>

    <DataTransferAdd v-show="dataState" @close-data="showDataTransfer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import DataTransferAdd from './DataTransferAdd/index.vue'
import { useVuex } from '../../../../../modules/vue-hooks'
import DataValue from './DataTransferAdd/DataValue.vue'
import { NewIden, DataTransfer } from '@/interfaces/any-editor-file.ts'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default defineComponent({
  components: { DataTransferAdd, DataValue, vueCustomScrollbar },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const dataState = ref(false)

    function showDataTransfer() {
      if (
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers.length > 1 &&
        !dataState.value
      ) {
        dataState.value = true
      } else if (dataState.value) {
        dataState.value = false
      }
    }

    function viewEveryCompo() {
      for (
        let i = 0;
        i <
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers.length;
        i++
      ) {
        const copyIden = {
          ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
            .identifiers[i],
        }
        copyIden.compoView = true
        const newIden: NewIden = {
          index: i,
          identifier: copyIden,
        }
        vuex.identifier.updateIden(newIden)
      }
    }

    const isElementUnfolded = ref(true)

    function foldDataTransfer(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (isElementUnfolded.value) {
        isElementUnfolded.value = false
        target.style.transform = 'rotate(270deg)'
      } else {
        isElementUnfolded.value = true
        target.style.transform = 'rotate(90deg)'
      }
    }

    return {
      dataState,
      showDataTransfer,
      vuex,
      viewEveryCompo,
      isElementUnfolded,
      foldDataTransfer,
    }
  },
})
</script>

<style lang="scss">
.side-panel-data {
  margin-bottom: 15px;
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

    .fold-panel-data {
      transform: rotate(90deg);
      border-radius: 5px;
      padding: 4px 6px;
      cursor: pointer;

      &:hover {
        background-color: #e2e2e2;
      }
    }
  }

  .data-value-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    .link-list-box {
      border: 1px solid #ababab;
      border-radius: 5px;
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 0px 10px;
      height: 2.5rem;
      margin: 5px 0px;

      .link-key,
      .link-value {
        width: 50%;
        font-size: 17px;
      }

      .link-key {
        border-right: 1px solid #ababab;
      }

      .link-value {
        padding-left: 10px;
      }
    }

    .panel-transfer-area {
      width: 100%;
    }
  }
}
</style>
