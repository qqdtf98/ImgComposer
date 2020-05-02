<template>
  <div class="vuex-store">
    <h1>Vuex Store</h1>

    <div ref="stateSection" class="section">
      <h2 class="header">state</h2>
    </div>
    <div class="section">
      <h2 class="header">mutations</h2>
    </div>
    <div class="section">
      <h2 class="header">actions</h2>
    </div>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror'
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import 'codemirror/mode/javascript/javascript'

export default defineComponent({
  setup() {
    const stateSection = ref<HTMLDivElement>()

    onMounted(() => {
      if (stateSection.value) {
        const stateCodeMirror = CodeMirror(stateSection.value, {
          mode: 'javascript',
          tabSize: 2,
          lineWrapping: true,
          viewportMargin: 20,
          value: 'const state = {}',
        })
        stateCodeMirror.setSize('100%', 150)
      }
    })

    return {
      stateSection,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/component-composer/common-styles' as *;

.CodeMirror {
  font-size: 13px;
  border: 1px solid #ababab;
  border-radius: 5px;
  padding: 0 5px;
}

.vuex-store {
  h1 {
    font-size: 17px;
    font-weight: 500;
  }

  .section {
    margin-top: 15px;

    .header {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .input {
      border: 1px solid #ababab;
      border-radius: 5px;
      padding: 10px;
      font-size: 13px;
      resize: none;
      width: 100%;
    }
  }
}
</style>
