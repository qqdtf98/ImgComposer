<template>
  <div class="vuex-store">
    <div class="header-container">
      <h1 class="header">Vuex Store</h1>
      <img
        class="fold-panel-data"
        src="@/assets/images/rightarrow.svg"
        @click="foldVuexStore"
      />
    </div>
    <div v-show="isElementUnfolded" ref="stateSection" class="section">
      <h2 class="header">state</h2>
    </div>
    <div v-show="isElementUnfolded" ref="mutationsSection" class="section">
      <h2 class="header">mutations</h2>
    </div>
    <div v-show="isElementUnfolded" ref="actionsSection" class="section">
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
      // state, mutation, actions 입력을 받을 code mirror 생성
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

    const isElementUnfolded = ref(true)

    function foldVuexStore(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (isElementUnfolded.value) {
        isElementUnfolded.value = false
        target.style.transform = 'rotate(270deg)'
      } else {
        isElementUnfolded.value = true
        target.style.transform = 'rotate(90deg)'
      }
    }

    return {
      stateSection,
      mutationsSection,
      actionsSection,
      isElementUnfolded,
      foldVuexStore,
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
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header {
      font-size: 17px;
      font-weight: 500;
    }

    .fold-panel-data {
      transform: rotate(90deg);
      border-radius: 5px;
      padding: 4px 6px;
      cursor: pointer;

      &:hover {
        background-color: #e2e2e2;
      }
    }
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
