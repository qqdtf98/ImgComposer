<template>
  <div :id="canvasId">
    <iframe
      ref="iframeRef"
      frameborder="0"
      :class="mergeClassNames(iframeClassName)"
    ></iframe>
  </div>
</template>

<script lang="ts">
// TODO: Change the component name to Canvas

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
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const canvasId = 'canvas'
    const iframeClassName = 'canvas-iframe'
    const iframeState = reactive({
      isActive: false,
    })
    const iframeRef = ref() as Ref<HTMLIFrameElement>

    onMounted(() => {
      const iframe = iframeRef.value
      Marker.setIframe(iframe)
      bubbleIframeEvents(iframe, window)

      const iframeDoc = iframe.contentDocument
      const iframeWindow = iframe.contentWindow

      if (!iframeDoc || !iframeWindow) return
      // Load html
      iframeDoc.documentElement.innerHTML = iframeSampleHtml

      const selector = new Selector(iframe)
    })

    watch(
      () => vuex.styleData.changedData,
      () => {
        console.log(vuex.styleData.changedData)
      }
    )

    return {
      canvasId,
      iframeClassName,
      iframeState,
      iframeRef,
      mergeClassNames,
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#canvas {
  position: fixed;
  top: $menu-bar-height;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .canvas-iframe {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background-color: $ae-white;

    &.active {
      pointer-events: all;
    }
  }
}
</style>
