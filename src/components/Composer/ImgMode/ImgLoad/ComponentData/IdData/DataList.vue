<template>
  <div id="data-list">
    <div class="data-option-value">{{ setData.type }}:</div>
    <textarea spellcheck="false" class="data-textarea" value="setData.data" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

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
    margin-left: 0.3rem;
  }
}
</style>
