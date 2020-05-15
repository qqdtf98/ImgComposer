<template>
  <div id="data-list">
    <div ref="compoDataRef" class="data-option-value">{{ setData.key }}:</div>
    <textarea
      spellcheck="false"
      class="data-textarea"
      value="setData.data"
      @input="resizeTextArea"
      @keydown.enter="textareaNextLine"
    />
    <div id="hide-textarea" ref="hideText"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from '@vue/composition-api'
import {
  Identifiers,
  IdentifierType,
  NewIden,
  CompoData,
  CompoDataType,
} from '@/interfaces/any-editor-file.ts'
import { useVuex } from '../../../../../../modules/vue-hooks'

export default defineComponent({
  props: {
    setData: Object,
    index: Number,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    type ComponentDataType = {
      type: string
      data: string
    }
    const { setData } = props as {
      setData: CompoDataType
    }

    const hideText = ref<HTMLElement>(null)
    const lineValue = ref('')
    const maxWidth = ref(0)

    let timeValue: number

    const index: number = inject('identifierIndex') as number

    const compoDataRef = ref<HTMLElement>(null)

    function resizeTextArea(e: InputEvent) {
      if (!hideText.value) return
      const target = e.target as HTMLTextAreaElement
      hideText.value.innerHTML = target.value
        .replace(/ /g, '&nbsp;')
        .replace(/\n/g, '<br>')
      target.style.width = hideText.value.offsetWidth + 5 + 'px'

      if (timeValue) clearTimeout(timeValue)
      timeValue = window.setTimeout(() => {
        // vuex의 identifierData를 복사하여 새로운 값으로 셋팅
        const newIdentifiers: Identifiers = [
          ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
            .identifiers,
        ]
        const newIden: IdentifierType = { ...newIdentifiers[index] }
        const newCompoDataList: CompoData = [...newIden.compoData]
        const newCompoData: CompoDataType = { ...newCompoDataList[index] }
        newCompoData.value = target.value
        newCompoDataList[index] = newCompoData
        newIden.compoData = newCompoDataList

        const newData: NewIden = {
          index,
          identifier: newIden,
        }

        vuex.identifier.updateIden(newData)
      }, 400)
    }

    function textareaNextLine(e: InputEvent) {
      const target = e.target as HTMLTextAreaElement
      if (!hideText.value) return
      if (!hideText.value.textContent) return
      hideText.value.innerHTML = target.value
        .replace(/ /g, '&nbsp;')
        .replace(/\n/g, '<br>')
      target.style.height = hideText.value.offsetHeight + 16 + 'px'
    }

    return {
      resizeTextArea,
      hideText,
      textareaNextLine,
      vuex,
    }
  },
})
</script>
<style lang="scss">
#data-list {
  background-color: #fff;
  box-shadow: 0px 0px 1px 1px #888888;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0;
  .data-option-value {
    font-weight: 500;
  }
  .data-textarea {
    border: none;
    background: none;
    resize: none;
    font-size: 13px;
    font-family: inherit;
    font-weight: 600;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    overflow-y: hidden;
    line-height: 16px;
  }
  #hide-textarea {
    width: auto;
    display: inline-block;
    visibility: hidden;
    position: fixed;
    top: 10px;
    overflow: auto;
    line-height: 16px;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
  }
}
</style>
