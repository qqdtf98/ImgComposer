<template>
  <vue-custom-scrollbar class="link-area">
    <div id="compo-link">
      <div class="link-wrapper">
        <img class="link-icon" src="@/assets/images/Link.svg" />
        <input ref="linkRef" class="link-input" placeholder="link here" />
      </div>
      <div class="link-text-box">
        <div>queries</div>
        <img
          src="@/assets/images/plusblue.svg"
          class="plus-blue"
          @click="addQueryData"
        />
      </div>
      <div class="link-value-list">
        <CompoValue
          v-for="(query, i) in queryList"
          :key="i"
          :linkData="query"
          @set-key="setQueryKey($event, i)"
          @set-value="setQueryValue($event, i)"
        />
      </div>
      <div class="link-text-box">
        <div>params</div>
        <img
          src="@/assets/images/plusblue.svg"
          class="plus-blue"
          @click="addParamsData"
        />
      </div>
      <div class="link-value-list">
        <CompoValue
          v-for="(param, i) in paramsList"
          :key="i"
          :linkData="param"
          @set-key="setParamsKey($event, i)"
          @set-value="setParamsValue($event, i)"
        />
      </div>
      <div class="link-submit">
        <button class="link-submit-btn" @click="submitCompoLink">Done</button>
      </div>
    </div>
  </vue-custom-scrollbar>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import CompoValue from './CompoValue.vue'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { Cem } from '@/modules/custom-events-manager'

export default defineComponent({
  components: { CompoValue, vueCustomScrollbar },
  setup() {
    type dataType = {
      key: string
      value: string
    }
    const queryList: dataType[] = [
      {
        key: '',
        value: '',
      },
    ]

    const paramsList: dataType[] = [
      {
        key: '',
        value: '',
      },
    ]

    function addParamsData() {
      const newParams: dataType = {
        key: '',
        value: '',
      }
      paramsList.push(newParams)
    }

    function addQueryData() {
      const newQuery: dataType = {
        key: '',
        value: '',
      }
      queryList.push(newQuery)
    }

    const linkRef = ref<HTMLInputElement>(null)

    function submitCompoLink() {
      if (!linkRef.value) return
      if (!linkRef.value.value) return
      const newLink: {
        url: string
        queries: dataType[]
        params: dataType[]
      } = {
        url: linkRef.value?.value as string,
        queries: queryList,
        params: paramsList,
      }
      Cem.dispatchEvent('deactivateLink', newLink)
    }

    function setParamsKey(key: string, index: number) {
      paramsList[index].key = key
    }

    function setParamsValue(value: string, index: number) {
      paramsList[index].value = value
    }

    function setQueryKey(key: string, index: number) {
      queryList[index].key = key
    }

    function setQueryValue(value: string, index: number) {
      queryList[index].value = value
    }

    return {
      queryList,
      paramsList,
      addQueryData,
      addParamsData,
      submitCompoLink,
      linkRef,
      setQueryKey,
      setQueryValue,
      setParamsValue,
      setParamsKey,
    }
  },
})
</script>

<style lang="scss">
.link-area {
  position: fixed;
  width: 45rem;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: 30rem;

  #compo-link {
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
    .link-text-box {
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
    .link-value-list {
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
    .link-submit {
      display: flex;
      align-items: center;
      justify-content: right;
      margin: 0px 15px;
      width: 100%;
      .link-submit-btn {
        background-color: #1f1f1f;
        border-radius: 5px;
        color: #fff;
        padding: 8px 15px;
      }
    }
  }
}
</style>
