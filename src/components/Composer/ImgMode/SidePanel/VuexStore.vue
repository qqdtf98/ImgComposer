<template>
  <div class="vuex-store">
    <h1>Vuex Store</h1>

    <div ref="stateSection" class="section">
      <h2 class="header">state</h2>
    </div>
    <div ref="mutationsSection" class="section">
      <h2 class="header">mutations</h2>
    </div>
    <div ref="actionsSection" class="section">
      <h2 class="header">actions</h2>
    </div>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror'
import AutoCloseBrackets from 'codemirror/addon/edit/closebrackets'
import MatchBrackets from 'codemirror/addon/edit/matchbrackets'
import 'codemirror/mode/javascript/javascript'
import { defineComponent, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const stateSection = ref<HTMLDivElement>()
    const mutationsSection = ref<HTMLDivElement>()
    const actionsSection = ref<HTMLDivElement>()

    const codeMirrorOptions: CodeMirror.EditorConfiguration = {
      mode: 'javascript',
      tabSize: 2,
      lineWrapping: true,
      viewportMargin: 20,
      autoCloseBrackets: AutoCloseBrackets,
      matchBrackets: MatchBrackets,
    }

    onMounted(() => {
      if (stateSection.value) {
        const stateCodeMirror = CodeMirror(stateSection.value, {
          ...codeMirrorOptions,
          value: 'const state = {}',
        })
        stateCodeMirror.setSize('100%', 150)
      }

      if (mutationsSection.value) {
        const mutationsCodeMirror = CodeMirror(mutationsSection.value, {
          ...codeMirrorOptions,
          value: 'const mutations = {}',
        })
        mutationsCodeMirror.setSize('100%', 150)
      }

      if (actionsSection.value) {
        const actionsCodeMirror = CodeMirror(actionsSection.value, {
          ...codeMirrorOptions,
          value: 'const actions = {}',
        })
        actionsCodeMirror.setSize('100%', 150)
      }
    })

    return {
      stateSection,
      mutationsSection,
      actionsSection,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/component-composer/common-styles' as *;

.CodeMirror {
  font-size: 13px;
  font-family: 'Cascadia Mono';
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
