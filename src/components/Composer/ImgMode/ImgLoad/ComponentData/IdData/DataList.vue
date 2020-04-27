<template>
  <div id="data-list">
    <div class="data-option-value">{{ setData.type }}:</div>
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
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    setData: Object,
  },
  setup(props) {
    type ComponentDataType = {
      type: string
      data: string
    }
    const { setData } = props as {
      setData: ComponentDataType
    }

    const hideText = ref<HTMLElement>(null)
    const lineValue = ref('')
    const maxWidth = ref(0)

    function resizeTextArea(e: InputEvent) {
      if (!hideText.value) return
      const target = e.target as HTMLTextAreaElement
      hideText.value.innerHTML = target.value
        .replace(/ /g, '&nbsp;')
        .replace(/\n/g, '<br>')
      target.style.width = hideText.value.offsetWidth + 5 + 'px'
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
    // visibility: hidden;
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
