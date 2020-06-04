<template>
  <div class="data-transfer-wrapper" @click="viewSelectedPair">
    <div class="left-data">
      <div class="left-data-name">
        <div
          v-for="(data, i) in transferData.startCompo"
          :key="i"
          class="component-name"
        >
          {{ data.compoName }}
        </div>
      </div>
    </div>
    <img class="center-arrow" src="@/assets/images/arrow.svg" />
    <div class="right-data">
      <div class="right-data-name">
        <div
          v-for="(data, i) in transferData.endCompo"
          :key="'e' + i"
          class="component-name"
        >
          {{ data.compoName }}
        </div>
      </div>
      <img
        v-if="transferData.type === 'global'"
        src="@/assets/images/plusblue.svg"
        class="plus-blue"
        @click="selectEndCompo"
      />
      <select
        v-if="transferData.type === 'global'"
        v-show="selectCompo"
        class="right-select"
        @change="addEndCompo"
      >
        <option value="none">선택</option>
        <option
          v-for="iden in vuex.identifier.pages[
            vuex.identifier.selectedPageIndex
          ].identifiers"
          :key="'r' + iden.index"
          :value="JSON.stringify(iden)"
          >{{ iden.compoName }}</option
        >
      </select>
    </div>
    <input
      ref="inputRef"
      class="data-transfer-input"
      placeholder="write data"
      :value="transferData.data"
      @input="storeInputValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { DataTransfer, NewData } from '@/interfaces/any-editor-file.ts'
import { useVuex } from '../../../../../../modules/vue-hooks'
import { NewIden } from '@/interfaces/any-editor-file.ts'

export default defineComponent({
  props: {
    transferData: Object,
  },
  setup(props, ctx) {
    console.log(props.transferData)
    const vuex = useVuex(ctx)

    const { transferData } = props as {
      transferData: DataTransfer
    }

    function viewSelectedPair() {
      // TODO startcompo와 endcompo에 있는 identifier의 index 전부 비교하기
      // for (
      //   let i = 0;
      //   i <
      //   vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
      //     .identifiers.length;
      //   i++
      // ) {
      //   const copyIden = {
      //     ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
      //       .identifiers[i],
      //   }
      //   if (!transferData.startCompo) return
      //   if (!transferData.endCompo) return
      //   if (
      //     transferData.startCompo.index ===
      //       vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
      //         .identifiers[i].index ||
      //     transferData.endCompo.index ===
      //       vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
      //         .identifiers[i].index
      //   ) {
      //     copyIden.compoView = true
      //   } else {
      //     copyIden.compoView = false
      //   }
      //   const newIden: NewIden = {
      //     index: i,
      //     identifier: copyIden,
      //   }
      //   vuex.identifier.updateIden(newIden)
      // }
    }

    let timeValue: number

    /**
     *  전달할 data를 input 상자를 통해 입력받음
     *
     * vuex의 dataTransfer에 type에 따라 저장
     *
     * endCompo는 배열의 형태로 저장되어있음
     */
    function storeInputValue(e: InputEvent) {
      const target = e.target as HTMLInputElement

      if (timeValue) clearTimeout(timeValue)
      timeValue = window.setTimeout(() => {
        if (transferData.type === 'event') {
          const newTransfer = {
            ...vuex.dataTransfer.eventTransfer[transferData.index],
          }
          newTransfer.data = target.value

          const newData: NewData = {
            index: transferData.index,
            transfer: newTransfer,
          }

          vuex.dataTransfer.updateEventData(newData)
        } else if (transferData.type === 'props') {
          const newTransfer = {
            ...vuex.dataTransfer.propsTransfer[transferData.index],
          }
          newTransfer.data = target.value

          const newData: NewData = {
            index: transferData.index,
            transfer: newTransfer,
          }

          vuex.dataTransfer.updatePropsData(newData)
        }
        console.log(vuex.dataTransfer.eventTransfer)
        console.log(vuex.dataTransfer.propsTransfer)
      }, 400)
    }

    const inputRef = ref<HTMLElement>(null)

    /**
     * global Event에서 endCompo를 추가
     *
     * endCompo는 배열의 형태로 저장되어있음
     */
    function addEndCompo(e: MouseEvent) {
      const target = e.target as HTMLSelectElement
      if (target.value === 'none') return
      const addIndex = vuex.dataTransfer.globalTransfer.findIndex(
        (elem) => elem.index === props.transferData?.index
      )
      const addData = { ...vuex.dataTransfer.globalTransfer[addIndex] }
      const addEndData = [...addData.endCompo]
      addEndData.push(JSON.parse(target.value))
      addData.endCompo = addEndData
      const newData = {
        index: addIndex,
        transfer: addData,
      }
      vuex.dataTransfer.updateGlobalData(newData)
      selectCompo.value = false
    }

    const selectCompo = ref(false)

    function selectEndCompo() {
      selectCompo.value = true
    }

    return {
      viewSelectedPair,
      inputRef,
      storeInputValue,
      addEndCompo,
      vuex,
      selectEndCompo,
      selectCompo,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;
@use '@/assets/styles/component-composer/common-styles.scss' as *;

.data-transfer-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-top: 10px;
  // width: 100%;
  cursor: pointer;
  position: relative;

  .data-transfer-input {
    width: 200px;
    text-align: center;
    background-color: #2d2d2d;
    color: #dadada;
    height: 70px;
    border-radius: 5px;
    margin-left: 10px;
  }

  .data-transfer-input::placeholder {
    color: #dadada;
  }

  .left-data,
  .right-data {
    display: flex;
    flex-direction: row;
    align-items: center;

    .right-data-name,
    .left-data-name {
      display: flex;
      flex-direction: column;

      .component-name {
        @include tip-style;
        font-family: inherit;
        margin: 0.2rem 0.5rem;
        font-weight: 600;
        font-size: 13px;
        user-select: none;
        padding: 2px 5px;
      }
    }

    .plus-blue {
      margin: 0 0.5rem;
      cursor: pointer;
    }
  }

  .center-arrow {
    margin-right: 12px;
    margin-left: 12px;
    min-width: 40px;
  }
}
</style>
