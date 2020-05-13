<template>
  <vue-custom-scrollbar class="transfer-area">
    <div id="compo-data">
      <div class="data-text-box">
        <div>Event</div>
        <img
          src="@/assets/images/plusblue.svg"
          class="plus-blue"
          @click="showEventSelector"
        />
      </div>
      <div v-show="isEventSelector" class="select-component">
        <select ref="eventRef" class="left-select">
          <option value="none">선택</option>
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="JSON.stringify(iden)"
            >{{ iden.compoName }}
          </option>
        </select>
        <select class="right-select" @change="addEventTransfer">
          <option value="none">선택</option>
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="JSON.stringify(iden)"
            >{{ iden.compoName }}
          </option>
        </select>
      </div>
      <div class="data-value-list">
        <DataValue
          v-for="(event, i) in vuex.dataTransfer.eventTransfer"
          :key="i"
          :transferData="event"
        />
      </div>
      <div class="data-text-box">
        <div>Props</div>
        <img
          src="@/assets/images/plusblue.svg"
          class="plus-blue"
          @click="showPropsSelector"
        />
      </div>
      <div v-show="isPropsSelector" class="select-component">
        <select ref="propsRef" class="left-select">
          <option value="none">선택</option>
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="JSON.stringify(iden)"
            >{{ iden.compoName }}
          </option>
        </select>
        <select class="right-select" @change="addPropsTransfer">
          <option value="none">선택</option>
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="JSON.stringify(iden)"
            >{{ iden.compoName }}
          </option>
        </select>
      </div>
      <div class="data-value-list">
        <DataValue
          v-for="(props, i) in vuex.dataTransfer.propsTransfer"
          :key="i"
          :transferData="props"
        />
      </div>
      <div class="data-store">
        <button class="data-store-btn" @click="closeDataTransfer">Done</button>
      </div>
    </div>
  </vue-custom-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import DataValue from './DataValue.vue'
import { useVuex } from '../../../../../../modules/vue-hooks'
import { DataTransfer } from '@/interfaces/any-editor-file.ts'

export default defineComponent({
  components: { vueCustomScrollbar, DataValue },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const isEventSelector = ref(false)

    function showEventSelector() {
      isEventSelector.value = true
    }

    const isPropsSelector = ref(false)

    function showPropsSelector() {
      isPropsSelector.value = true
    }

    const eventRef = ref<HTMLSelectElement>(null)

    function addEventTransfer(e: MouseEvent) {
      console.log('event')
      const target = e.target as HTMLSelectElement
      if (!eventRef.value) return
      if (!e.target) return
      if (eventRef.value.value === 'none') return
      if (target.value === 'none ') return
      const newData: DataTransfer = {
        startCompo: JSON.parse(eventRef.value.value),
        endCompo: JSON.parse(target.value),
      }
      vuex.dataTransfer.addEventData(newData)
    }

    const propsRef = ref<HTMLSelectElement>(null)

    function addPropsTransfer(e: MouseEvent) {
      console.log('props')
      if (!propsRef.value) return
      if (!e.target) return
      const target = e.target as HTMLSelectElement
      const newData: DataTransfer = {
        startCompo: JSON.parse(propsRef.value.value),
        endCompo: JSON.parse(target.value),
      }
      vuex.dataTransfer.addPropsData(newData)
    }

    function closeDataTransfer() {
      isPropsSelector.value = false
      isEventSelector.value = false
      ctx.emit('close-data')
    }

    return {
      showEventSelector,
      vuex,
      isEventSelector,
      addEventTransfer,
      addPropsTransfer,
      showPropsSelector,
      isPropsSelector,
      eventRef,
      propsRef,
      closeDataTransfer,
    }
  },
})
</script>

<style lang="scss">
.transfer-area {
  position: fixed;
  width: 35rem;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 30rem;
  z-index: 60000;

  #compo-data {
    color: black;
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    border: 1px solid #ababab;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;

    .link-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      height: 3.5rem;
      border-bottom: 1px solid #ababab;
      .link-icon {
        width: 1.5rem;
        margin-right: 0.8rem;
      }
      .link-input {
        height: 3rem;
        font-size: 18px;
      }
    }
    .data-text-box {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      margin: 10px 0px;
      .plus-blue {
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
    .select-component {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;

      .left-select,
      .right-select {
        margin-right: 10px;
        margin-left: 10px;
        height: 25px;
      }
    }
    .data-value-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 10px;

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
    }
    .data-store {
      display: flex;
      align-items: center;
      justify-content: right;
      margin: 20px 15px 5px 15px;
      width: 100%;
      .data-store-btn {
        background-color: #1f1f1f;
        border-radius: 5px;
        color: #fff;
        padding: 8px 15px;
        cursor: pointer;
      }
    }
  }
}
</style>
