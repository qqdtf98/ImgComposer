<template>
  <div id="db-query">
    <div class="option-wrapper">
      <div class="db-option">{{ tableData.type }}</div>
      <div class="db-text">{{ tableData.text }}</div>
      <div class="db-table">{{ tableData.table }}</div>
    </div>
    <textarea
      ref="textRef"
      class="data-textarea"
      @input="resizeTextArea"
      @keydown.enter="textareaNextLine"
    />
    <div id="hide-query" ref="hideText"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

export default defineComponent({
  props: {
    tableData: Object,
  },
  setup(props, ctx) {
    const { tableData } = props as {
      tableData: { type: string; text: string; table: string }
    }

    onMounted(() => {
      if (!textRef.value) return
      textRef.value.focus()
    })

    const textRef = ref<HTMLElement>(null)
    const hideText = ref<HTMLElement>(null)

    function resizeTextArea(e: InputEvent) {
      if (!hideText.value) return
      const target = e.target as HTMLTextAreaElement
      hideText.value.innerHTML = target.value
        .replace(/ /g, '&nbsp;')
        .replace(/\n/g, '<br>')
      target.style.width = hideText.value.offsetWidth + 5 + 'px'

      let timeValue: number
      // if (timeValue) clearTimeout(timeValue)
      // timeValue = window.setTimeout(() => {
      //   // vuex의 identifierData를 복사하여 새로운 값으로 셋팅
      //   const newIdentifiers: Identifiers = [...vuex.identifier.identifierData]
      //   const newIden: IdentifierType = { ...newIdentifiers[index] }
      //   const newCompoDataList: CompoData = [...newIden.compoData]
      //   const newCompoData: CompoDataType = { ...newCompoDataList[index] }
      //   newCompoData.value = target.value
      //   newCompoDataList[index] = newCompoData
      //   newIden.compoData = newCompoDataList
      //   const newData: NewIden = {
      //     index,
      //     identifier: newIden,
      //   }
      //   vuex.identifier.updateIden(newData)
      // }, 400)
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
      textRef,
      hideText,
      resizeTextArea,
      textareaNextLine,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/component-composer/common-styles.scss' as *;

#db-query {
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
    .db-text,
    .db-table {
      margin-left: 6px;
    }
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

  #hide-query {
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
