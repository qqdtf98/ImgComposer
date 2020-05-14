<template>
  <div class="data-transfer-wrapper" @click="viewSelectedPair">
    <input
      ref="inputRef"
      class="data-transfer-input"
      placeholder="write data"
      @input="storeInputValue"
    />
    <div class="left-data">
      <div class="component-name">
        {{ transferData.startCompo.compoName }}
      </div>
    </div>
    <img class="center-arrow" src="@/assets/images/arrow.svg" />
    <div class="right-data">
      <div class="component-name">
        {{ transferData.endCompo.compoName }}
      </div>
    </div>
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
    const vuex = useVuex(ctx)

    const { transferData } = props as {
      transferData: DataTransfer
    }

    function viewSelectedPair() {
      for (let i = 0; i < vuex.identifier.identifierData.length; i++) {
        const copyIden = { ...vuex.identifier.identifierData[i] }
        if (!transferData.startCompo) return
        if (!transferData.endCompo) return
        if (
          transferData.startCompo.index ===
            vuex.identifier.identifierData[i].index ||
          transferData.endCompo.index ===
            vuex.identifier.identifierData[i].index
        ) {
          copyIden.compoView = true
        } else {
          copyIden.compoView = false
        }
        const newIden: NewIden = {
          index: i,
          identifier: copyIden,
        }
        vuex.identifier.updateIden(newIden)
      }
    }

    let timeValue: number

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

    // TODO input 받아서 저장하기

    return {
      viewSelectedPair,
      inputRef,
      storeInputValue,
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
  height: 65px;

  .data-transfer-input {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    text-align: center;
    background-color: #2d2d2d;
    color: #dadada;
    height: 28px;
    border-radius: 5px;
  }

  .data-transfer-input::placeholder {
    color: #dadada;
  }

  .left-data,
  .right-data {
    display: flex;
    flex-direction: row;
    @include tip-style;
    align-items: center;
    height: 32px;

    .component-name {
      font-family: inherit;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-weight: 600;
      font-size: 13px;
      user-select: none;
    }
  }

  .center-arrow {
    margin-right: 12px;
    margin-left: 12px;
    width: 140px;
  }
}
</style>
