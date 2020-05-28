<template>
  <div id="code-editor">
    <button ref="codeBtnRef" class="code-on-btn" @click="activateCodeEditor">
      <div>Code Editor</div>
      <img class="code-arrow" src="@/assets/images/rightarrow.svg" />
    </button>
    <div
      v-show="isCodeMirrorOn"
      ref="resizeRef"
      class="code-mirror-resize"
      @mousedown="resizeCodeMirror"
    ></div>
    <div v-show="isCodeMirrorOn" ref="codeRef" class="code-mirror-section">
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
          if (vuex.codeMirror.htmlSectionIndex !== -1) {
            const valueType = {
              value: cm.getValue(),
              type: 'html',
              index: vuex.codeMirror.htmlSectionIndex,
            }
            vuex.fileData.updateFileValue(valueType)
          }
        })
      }

      if (cssSection.value) {
        cssCodeMirror = CodeMirror(cssSection.value, {
          ...codeMirrorCssOptions,
          value: '',
        })
        cssCodeMirror.setSize('100%', '100%')

        cssCodeMirror.on('change', function (cm, change) {
          if (vuex.codeMirror.cssSectionIndex !== -1) {
            const valueType = {
              value: cm.getValue(),
              type: 'css',
              index: vuex.codeMirror.cssSectionIndex,
            }
            vuex.fileData.updateFileValue(valueType)
          }
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
          if (!resizeRef.value) return
          codeRef.value.style.display = 'flex'
          const codeRefRect = codeRef.value.getBoundingClientRect()
          resizeRef.value.style.bottom = codeRefRect.height + 'px'
          target.style.bottom = codeRefRect.height + 10 + 'px'
          const arrowImg = target.children[1] as HTMLElement
          arrowImg.style.transform = 'rotate(90deg)'
          htmlCodeMirror.setCursor(0, 0)
          cssCodeMirror.setCursor(0, 0)
        }, 0)
      }
    }

    const resizeRef = ref<HTMLElement>(null)
    const codeBtnRef = ref<HTMLButtonElement>(null)

    function resizeCodeMirror(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!codeRef.value) return
      if (!codeBtnRef.value) return

      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      const targetRect = target.getBoundingClientRect()
      const initTopGap = e.clientY - targetRect.top
      const initBottomGap = targetRect.bottom - e.clientY
      const initX = e.clientX
      const initY = e.clientY
      const initHeight = codeRef.value.getBoundingClientRect().height
      const btnHeight = codeBtnRef.value.getBoundingClientRect().height

      const canvasIframe = document.querySelector(
        '.canvas-iframe'
      ) as HTMLIFrameElement

      canvasIframe.style.pointerEvents = 'none'
      document.body.style.userSelect = 'none'

      window.addEventListener(
        'mousemove',
        (moveEvent = (evt: MouseEvent) => {
          if (!codeRef.value) return
          if (!codeBtnRef.value) return

          htmlCodeMirror.scrollTo(
            htmlCodeMirror.getScrollInfo().left,
            htmlCodeMirror.getScrollInfo().top
          )
          cssCodeMirror.scrollTo(
            cssCodeMirror.getScrollInfo().left,
            cssCodeMirror.getScrollInfo().top
          )

          codeRef.value.style.height = initHeight - (evt.clientY - initY) + 'px'
          target.style.top = evt.clientY - initTopGap + 'px'
          codeBtnRef.value.style.top =
            evt.clientY - initTopGap - btnHeight + 'px'
          codeBtnRef.value.style.height = btnHeight + 'px'
          // console.log(codeBtnRef.value.getBoundingClientRect().height)

          // TODO resize해결하기

          window.addEventListener(
            'mouseup',
            (upEvent = () => {
              window.removeEventListener('mousemove', moveEvent)
              window.removeEventListener('mouseup', upEvent)

              canvasIframe.style.pointerEvents = ''
              document.body.style.userSelect = ''
            })
          )
        })
      )
    }

    return {
      activateCodeEditor,
      htmlSection,
      isCodeMirrorOn,
      codeRef,
      cssSection,
      resizeCodeMirror,
      codeBtnRef,
      resizeRef,
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

  .code-mirror-resize {
    position: fixed;
    width: calc(100% - 280px);
    height: 10px;
    background-color: #dede7b;
    cursor: ns-resize;
  }

  .code-mirror-section {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: calc(100% - 280px);
    height: 400px;

    .html-section,
    .css-section {
      border: 1px solid black;
      width: 50%;
      height: 100%;
    }
  }
}
</style>
