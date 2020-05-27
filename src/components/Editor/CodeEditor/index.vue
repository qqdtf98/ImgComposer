<template>
  <div id="code-editor">
    <button class="code-on-btn" @click="activateCodeEditor">
      <div>Code Editor</div>
      <img class="code-arrow" src="@/assets/images/rightarrow.svg" />
    </button>
    <div ref="codeRef" v-show="isCodeMirrorOn" class="code-mirror-section">
      <div ref="htmlSection" class="html-section"></div>
      <div ref="cssSection" class="css-section"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from '@vue/composition-api'
import CodeMirror from 'codemirror'
import AutoCloseBrackets from 'codemirror/addon/edit/closebrackets'
import MatchBrackets from 'codemirror/addon/edit/matchbrackets'
import AutoCloseTags from 'codemirror/addon/edit/closetag'
import HighlightSelectionMatches from 'codemirror/addon/search/match-highlighter'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const htmlSection = ref<HTMLDivElement>()
    const cssSection = ref<HTMLDivElement>()

    const codeMirrorCssOptions: CodeMirror.EditorConfiguration = {
      mode: 'css',
      tabSize: 2,
      lineWrapping: true,
      viewportMargin: 20,
      autoCloseBrackets: AutoCloseBrackets,
      matchBrackets: MatchBrackets,
      lineNumbers: true,
    }
    const codeMirrorHtmlOptions: CodeMirror.EditorConfiguration = {
      mode: 'htmlmixed',
      tabSize: 2,
      lineWrapping: true,
      viewportMargin: 20,
      autoCloseBrackets: AutoCloseBrackets,
      matchBrackets: MatchBrackets,
      lineNumbers: true,
    }

    const isCodeMirrorOn = ref(true)

    let htmlCodeMirror: CodeMirror.Editor
    let cssCodeMirror: CodeMirror.Editor

    watch(
      () => vuex.codeMirror.htmlSectionValue,
      () => {
        if (vuex.codeMirror.htmlSectionValue) {
          htmlCodeMirror.setValue(vuex.codeMirror.htmlSectionValue)
        }
      }
    )

    watch(
      () => vuex.codeMirror.cssSectionValue,
      () => {
        if (vuex.codeMirror.cssSectionValue) {
          cssCodeMirror.setValue(vuex.codeMirror.cssSectionValue)
        }
      }
    )

    onMounted(() => {
      if (htmlSection.value) {
        htmlCodeMirror = CodeMirror(htmlSection.value, {
          ...codeMirrorHtmlOptions,
          value: '',
        })

        htmlCodeMirror.setSize('100%', '100%')
        htmlCodeMirror.on('change', function (cm, change) {
          vuex.fileData.updateFileValue(cm.getValue())
        })
      }

      if (cssSection.value) {
        cssCodeMirror = CodeMirror(cssSection.value, {
          ...codeMirrorCssOptions,
          value: '',
        })
        cssCodeMirror.setSize('100%', '100%')
        cssCodeMirror.on('change', function (cm, change) {
          vuex.fileData.updateFileValue(cm.getValue())
        })
      }

      isCodeMirrorOn.value = false
    })

    const codeRef = ref<HTMLElement>(null)

    function activateCodeEditor(e: MouseEvent) {
      let target = e.target as HTMLElement
      target = target.closest('.code-on-btn') as HTMLElement
      if (isCodeMirrorOn.value) {
        isCodeMirrorOn.value = false
        target.style.bottom = '0'
        const arrowImg = target.children[1] as HTMLElement
        arrowImg.style.transform = 'rotate(270deg)'
      } else {
        isCodeMirrorOn.value = true
        setTimeout(() => {
          if (!codeRef.value) return
          codeRef.value.style.display = 'flex'
          target.style.bottom =
            codeRef.value.getBoundingClientRect().height + 'px'
          const arrowImg = target.children[1] as HTMLElement
          arrowImg.style.transform = 'rotate(90deg)'
          htmlCodeMirror.setCursor(0, 0)
          cssCodeMirror.setCursor(0, 0)
        }, 0)
      }
    }

    return {
      activateCodeEditor,
      htmlSection,
      isCodeMirrorOn,
      codeRef,
      cssSection,
    }
  },
})
</script>

<style lang="scss">
#code-editor {
  .code-on-btn {
    padding: 10px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: calc((100% - 280px) / 2);
    background: #ffffff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 6.69879px 6.69879px 0px 0px;
    transform: translateX(-50%);
    cursor: pointer;

    .code-arrow {
      transform: rotate(270deg);
      margin-left: 10px;
    }
  }

  .code-mirror-section {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: calc((100% - 280px));
    height: 300px;

    .html-section,
    .css-section {
      border: 1px solid black;
      width: 50%;
      height: 100%;
    }
  }
}
</style>
