<template>
  <vue-custom-scrollbar class="transfer-area">
    <div id="compo-data">
      <div class="data-text-box">
        <div>Event</div>
        <img
          src="@/assets/images/plusblue.svg"
          class="plus-blue"
          @click="showComponentSelector"
        />
      </div>
      <div v-show="showSelector" class="select-component">
        <select>
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="iden.compoName"
            >{{ iden.compoName }}
          </option>
        </select>
        <select @change="addEventTransfer">
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="iden.compoName"
            >{{ iden.compoName }}
          </option>
        </select>
      </div>
      <div class="data-value-list">
        <!-- <DataValue /> -->
      </div>
      <div class="data-text-box">
        <div>Props</div>
        <img src="@/assets/images/plusblue.svg" class="plus-blue" />
      </div>
      <div v-show="showSelector" class="select-component">
        <select>
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="iden.compoName"
            >{{ iden.compoName }}
          </option>
        </select>
        <select @change="addPropsTransfer">
          <option
            v-for="iden in vuex.identifier.identifierData"
            :key="iden.index"
            :value="iden.compoName"
            >{{ iden.compoName }}
          </option>
        </select>
      </div>
      <div class="data-value-list">
        <!-- <div>add eventlist</div> -->
      </div>
      <div class="data-store">
        <button class="data-store-btn">Done</button>
      </div>
    </div>
  </vue-custom-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import DataValue from './DataValue.vue'
import { useVuex } from '../../../../../../modules/vue-hooks'

export default defineComponent({
  components: { vueCustomScrollbar, DataValue },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const showSelector = ref(false)

    function showComponentSelector() {
      showSelector.value = true
    }

    function addEventTransfer() {
      // TODO store DataTransferData
    }

    function addPropsTransfer() {
      // TODO store DataTransferData
    }

    return {
      showComponentSelector,
      vuex,
      showSelector,
      addEventTransfer,
      addPropsTransfer,
    }
  },
})
</script>

<style lang="scss">
.transfer-area {
  position: fixed;
  width: 45rem;
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
      display: flex;
      flex-direction: row;
    }
    .data-value-list {
      width: 100%;
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
      margin: 0px 15px;
      width: 100%;
      .data-store-btn {
        background-color: #1f1f1f;
        border-radius: 5px;
        color: #fff;
        padding: 8px 15px;
      }
    }
  }
}
</style>
