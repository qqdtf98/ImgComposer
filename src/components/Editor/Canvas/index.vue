<template>
  <div :id="canvasId" ref="canvas">
    <button v-show="btnState" class="export-btn" @click="exportComponent">
      Export as .vue
    </button>

    <iframe
      id="main-iframe"
      ref="iframeRef"
      frameborder="0"
      :class="mergeClassNames(iframeClassName)"
    ></iframe>
    <Context
      v-show="isContextActivate"
      class="canvas-context"
      :selectState="selectState"
      @open-selector="activateSelector"
    />
    <CssFileSelector
      v-show="isFileSelector"
      :selectorType="selectorType"
      :cssTarget="cssTarget"
      @vacate-input="vacateInputField"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  Ref,
  reactive,
  watch,
} from '@vue/composition-api'
import { Selector } from './modules/Selector'
import { Marker } from './modules/Marker'
import mergeClassNames from '@/modules/merge-class-names'
import { bubbleIframeEvents } from '@/modules/bubble-iframe-events'
import { iframeSampleHtml } from '@/miscellaneous/iframe-sample-html'
import { useVuex } from '@/modules/vue-hooks'
import { HtmlStyle } from '@/miscellaneous/sample-html-style'
import cssom from 'cssom'
import Context from './Context/index.vue'
import { Cem } from '../../../modules/custom-events-manager'
import { File } from '@/interfaces/any-editor-file'
import { getMatchedCssRules } from '@/modules/get-matched-css-rules'
import FileSaver, { saveAs } from 'file-saver'
import prettier from 'prettier/standalone'
import parserHtml from 'prettier/parser-html'
import parserPostCss from 'prettier/parser-postcss'
import CssFileSelector from '@/components/Editor/Canvas/Context/CssFileSelector.vue'

export default defineComponent({
  components: { Context, CssFileSelector },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const canvas = ref<HTMLElement>(null)
    const canvasId = 'canvas'
    const iframeClassName = 'canvas-iframe'
    const iframeState = reactive({
      isActive: false,
    })
    const iframeRef = ref() as Ref<HTMLIFrameElement>
    const isContextActivate = ref(false)

    const btnState = ref(false)
    let cssRule: string
    let htmlElem: string

    watch(
      () => vuex.styleData.target,
      () => {
        const target = vuex.styleData.target as HTMLElement
        htmlElem = target?.outerHTML

        function getCss(elm: HTMLElement | Element) {
          let css: CSSStyleDeclaration[] = []

          if (!elm) {
            btnState.value = false
            return css
          }

          css = getMatchedCssRules(elm)

          const children = Array.from(elm.children)

          if (children && children.length > 0) {
            for (const child of children) {
              css = [...css, ...getCss(child)]
            }
          }
          btnState.value = true
          return css
        }

        const cssRules = getCss(target)
        cssRule = ''
        for (const rule of cssRules) {
          cssRule += rule.cssText
        }
      }
    )

    function exportComponent() {
      const formattedHtml = prettier
        .format(htmlElem, {
          parser: 'html',
          plugins: [parserHtml],
        })
        .trim()
      const formattedCss = prettier
        .format(cssRule, {
          parser: 'css',
          plugins: [parserPostCss],
        })
        .trim()
      const blob = new Blob(
        [
          `<template>
${formattedHtml}
</template>

<style>
${formattedCss}
</style>`,
        ],
        { type: 'text/plain;charset=utf-8' }
      )
      FileSaver.saveAs(blob, 'sample.vue')
    }

    onMounted(() => {
      const iframe = iframeRef.value
      Marker.setIframe(iframe)
      bubbleIframeEvents(iframe, window)

      const iframeDoc = iframe.contentDocument
      const iframeWindow = iframe.contentWindow

      if (!iframeDoc || !iframeWindow) return
      // Load html

      // img 위에 selector 표시 샘플
      window.addEventListener('mousedown', (e: MouseEvent) => {
        const selector = document.createElement('div')
        selector.style.border = '2px solid white'
        selector.style.position = 'fixed'
        const initX = e.clientX
        const initY = e.clientY
        selector.style.left = initX + 'px'
        selector.style.top = initY + 'px'
        selector.style.width = '1px'
        selector.style.height = '1px'
        let moveEvent: (e: MouseEvent) => void
        let upEvent: (e: MouseEvent) => void
        window.addEventListener(
          'mousemove',
          (moveEvent = (evt: MouseEvent) => {
            const deltaX = evt.clientX - initX
            const deltaY = evt.clientY - initY

            selector.style.left = initX + (deltaX < 0 ? deltaX : 0) + 'px'
            selector.style.width = Math.abs(deltaX) + 'px'
            selector.style.top = initY + (deltaY < 0 ? deltaY : 0) + 'px'
            selector.style.height = Math.abs(deltaY) + 'px'
          })
        )
        window.addEventListener(
          'mouseup',
          (upEvent = () => {
            window.removeEventListener('mousemove', moveEvent)
            window.removeEventListener('mouseup', upEvent)
          })
        )
      })

      watch(
        () => vuex.fileData.fileList,
        () => {
          if (!vuex.fileData.selectedFile) return

          let iframeLoadHtml: string = ''
          let iframeUsedCss: string = ''
          const selectedFile: File = vuex.fileData.selectedFile
          const fileList: File[] = vuex.fileData.fileList

          if (selectedFile?.fileType === 'html') {
            iframeLoadHtml = selectedFile.data
            iframeDoc.documentElement.innerHTML = iframeLoadHtml

            if (!selectedFile.htmlCssPair) return

            let i
            for (i = 0; i < selectedFile.htmlCssPair.length; i++) {
              let j
              for (j = 0; j < fileList.length; j++) {
                if (
                  fileList[j].fileId === selectedFile.htmlCssPair[i].cssFileSeq
                ) {
                  iframeUsedCss += fileList[j].data
                }
              }
            }

            const style = document.createElement('style')

            style.innerHTML = iframeUsedCss
            iframeDoc.head.appendChild(style)
          }
        }
      )

      const styleParsed = cssom.parse(HtmlStyle)
      vuex.editorInfo.SET_PARSED_CSS_RULES(styleParsed.cssRules)

      const selector = new Selector(iframe)

      // marker를 생성했을 때 context actuvate
      Cem.addEventListener(
        'onmarkerschange',
        canvas.value as HTMLElement,
        (e) => {
          isContextActivate.value = true
          const context = document.querySelector(
            '.canvas-context'
          ) as HTMLElement

          if (!vuex.styleData.target) return

          context.style.left =
            vuex.styleData.target.getBoundingClientRect().left +
            vuex.styleData.target.getBoundingClientRect().width / 2 +
            'px'
          context.style.top =
            vuex.styleData.target.getBoundingClientRect().top +
            vuex.styleData.target.getBoundingClientRect().height / 2 +
            'px'
        }
      )

      // marker 해제했을 때 context deactivate
      Cem.addEventListener(
        'deactivatecontext',
        canvas.value as HTMLElement,
        (e) => {
          isContextActivate.value = false
        }
      )

      // selector 선택했을 때 context deactivate
      Cem.addEventListener('openstyles', canvas.value as HTMLElement, (e) => {
        isContextActivate.value = false
      })
    })

    const isFileSelector = ref(false)
    const cssTarget = ref<HTMLInputElement>(null)
    const selectorType = ref('')

    function activateSelector(target: HTMLInputElement, type: string) {
      cssTarget.value = target
      selectorType.value = type
      const targetRect: DOMRect = target.getBoundingClientRect()
      const cssFileSelector = document.querySelector(
        '#css-file-selector'
      ) as HTMLDivElement

      isFileSelector.value = true
      setTimeout(() => {
        if (!cssFileSelector) return
        cssFileSelector.style.left = targetRect.left + targetRect.width + 'px'
        cssFileSelector.style.top = targetRect.top + 'px'
        targetRect.height + 'px'
        targetRect.width + 'px'
        targetRect
      }, 0)
    }

    const selectState = ref(false)

    function vacateInputField() {
      isFileSelector.value = false
      selectState.value = true
      isContextActivate.value = false
    }

    return {
      canvas,
      canvasId,
      iframeClassName,
      iframeState,
      iframeRef,
      mergeClassNames,
      vuex,
      isContextActivate,
      btnState,
      exportComponent,
      activateSelector,
      isFileSelector,
      selectorType,
      cssTarget,
      vacateInputField,
      selectState,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#canvas {
  position: fixed;
  top: $menu-bar-height + $tab-height;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .canvas-iframe {
    // position: absolute;
    top: 0;
    // left: 50%;
    // transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background-color: $ae-white;

    &.active {
      pointer-events: all;
    }
  }
}

.export-btn {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
</style>
