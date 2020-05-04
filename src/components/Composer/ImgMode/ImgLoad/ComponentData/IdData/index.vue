<template>
  <div id="component-data" @mousedown.stop>
    <div class="component-basic-data">
      <div class="color-name-select">
        <button
          class="chrome-picker compo-picker"
          @click="activateChromePicker"
        />
        <input
          ref="compNameElm"
          class="component-name"
          type="text"
          @input="resizeInputField"
          @keyup.enter="setComponentName"
        />
        <div id="hide"></div>
      </div>
      <img
        ref="addBtnRef"
        class="component-data-add"
        src="@/assets/images/add.svg"
        @click="showDataList"
      />
      <img
        class="component-data-link"
        src="@/assets/images/Link.svg"
        @click="addCompoLink"
      />
      <img
        class="component-data-fold"
        src="@/assets/images/fold.svg"
        @click="hideDataList"
      />
    </div>
    <div
      v-show="isShowDataList && store.composer.optionsViewMode === 'visible'"
      class="component-added-data-list"
    >
      <div class="component-added-data">
        <DataList
          v-for="(data, i) in componentData"
          :key="i"
          :setData="data"
          :index="i"
        />
      </div>
    </div>

    <div v-show="isDataSelect" ref="dataSelectRef" class="data-option-wrapper">
      <DataOptions @add-data="addData" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  inject,
} from '@vue/composition-api'
import { Chrome } from 'vue-color'
import {
  Identifiers,
  IdentifierType,
  NewIden,
  CompoDataType,
  CompoData,
} from '@/interfaces/any-editor-file.ts'
import { useStore, useVuex } from '@/modules/vue-hooks'
import DataOptions from '@/components/Composer/ImgMode/ImgLoad/ComponentData/IdData/DataOptions.vue'
import DataList from '@/components/Composer/ImgMode/ImgLoad/ComponentData/IdData/DataList.vue'
import { Cem } from '@/modules/custom-events-manager'

export default defineComponent({
  components: { ChromeColor: Chrome, DataOptions, DataList },
  setup(...args) {
    const ctx = args[1]
    const vuex = useVuex(ctx)
    const store = useStore(ctx)

    const picker = reactive({
      isChromePicker: false,
    })

    function activateChromePicker() {
      if (picker.isChromePicker) {
        picker.isChromePicker = false
      } else {
        picker.isChromePicker = true
      }

      ctx.emit('activate-color', picker.isChromePicker)
    }

    function setComponentName(e: InputEvent) {
      e.preventDefault()
      const target = e.target as HTMLInputElement
    }

    // Get injected index value and removing function
    // provided by parent components
    const compNameElm = ref<HTMLInputElement>(null)
    const index: number = inject('identifierIndex') as number
    const removeIdentifier: any = inject('removeIdentifier')

    onMounted(() => {
      // Automatically focus component name input after mounted
      compNameElm.value?.focus()
      // Add blur event
      compNameElm.value?.addEventListener('blur', () => {
        // When the input value is empty
        // remove the identifier itself
        if (compNameElm.value?.value.trim().length === 0) {
          removeIdentifier(index)
        }
      })
    })

    const isDataSelect = ref(false)

    const dataSelectRef = ref<HTMLElement>(null)
    const addBtnRef = ref<HTMLElement>(null)

    function showDataList() {
      if (!addBtnRef.value) return

      isDataSelect.value = !isDataSelect.value
      const btnRect = addBtnRef.value.getBoundingClientRect()
      setTimeout(() => {
        if (!isShowDataList.value) {
          isShowDataList.value = !isShowDataList.value
        }
        if (!dataSelectRef.value) return
        dataSelectRef.value.style.left = btnRect.left + 'px'
        dataSelectRef.value.style.top = btnRect.top + btnRect.height + 'px'
      }, 0)
    }

    const componentData: CompoData = []

    function addData(data: string) {
      console.log(data)
      isDataSelect.value = !isDataSelect.value
      componentData.push({
        key: data,
        value: '',
      })

      // vuex의 identifierData를 복사하여 새로운 값으로 셋팅
      const newIdentifiers: Identifiers = [...vuex.identifier.identifierData]

      const newIden: IdentifierType = { ...newIdentifiers[index] }

      newIden.compoData = componentData

      const newData: NewIden = {
        index,
        identifier: newIden,
      }

      vuex.identifier.updateIden(newData)
    }

    const isShowDataList = ref(false)

    function hideDataList() {
      isShowDataList.value = !isShowDataList.value
    }

    let timeValue: number

    function resizeInputField(e: InputEvent) {
      const target = e.target as HTMLInputElement
      const hide = document.querySelector('#hide') as HTMLElement
      hide.innerHTML = target.value
      target.style.width = hide.offsetWidth + 'px'

      if (timeValue) clearTimeout(timeValue)
      timeValue = window.setTimeout(() => {
        // vuex의 identifierData를 복사하여 새로운 값으로 셋팅
        const newIdentifiers: Identifiers = [...vuex.identifier.identifierData]
        const newIden: IdentifierType = { ...newIdentifiers[index] }

        newIden.compoName = target.value

        const newData: NewIden = {
          index,
          identifier: newIden,
        }

        vuex.identifier.updateIden(newData)
      }, 400)
    }

    function addCompoLink() {
      Cem.dispatchEvent('activateLink', index)
    }

    return {
      store,
      picker,
      activateChromePicker,
      setComponentName,
      compNameElm,
      addBtnRef,
      showDataList,
      isDataSelect,
      dataSelectRef,
      addData,
      componentData,
      hideDataList,
      isShowDataList,
      resizeInputField,
      addCompoLink,
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;
@use '@/assets/styles/component-composer/common-styles.scss' as *;

#component-data {
  user-select: none;
  margin-top: 0.5rem;

  .component-basic-data {
    display: flex;
    flex-direction: row;
    align-items: center;

    .color-name-select {
      display: flex;
      flex-direction: row;
      @include tip-style;
      align-items: center;
      height: 32px;

      .chrome-picker {
        $size: 13px;
        width: $size;
        height: $size;
        border-radius: 2px;
        margin-left: 0.5rem;
      }

      #hide {
        width: auto;
        display: inline-block;
        visibility: hidden;
        position: fixed;
        top: 10px;
        overflow: auto;
        font-size: 13px;
        font-weight: 600;
        font-family: inherit;
      }

      .component-name {
        font-family: inherit;
        height: 1.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-weight: 600;
        font-size: 13px;
      }
    }

    .component-data-add,
    .component-data-link,
    .component-data-fold {
      @include tip-style;
      height: 2rem;
      width: 2rem;
      padding: 0.65rem;
      margin-left: 0.5rem;

      &:hover {
        cursor: pointer;
        background-color: #dfdfdf;
      }
    }
  }

  .component-added-data-list {
    color: black;
  }

  .data-option-wrapper {
    position: fixed;
  }
}
</style>
