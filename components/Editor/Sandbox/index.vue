<template>
  <div :id="sandboxId">
    <iframe
      ref="iframeRef"
      frameborder="0"
      :class="mergeClassNames(iframeClassName)"
    ></iframe>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  Ref,
  reactive,
} from '@vue/composition-api'
import mergeClassNames from '@/modules/merge-class-names'
import { isOutside } from '@/modules/is-outside'
import { useVuex } from '@/modules/vue-hooks'
import { classify } from '@/modules/classify'

export default defineComponent({
  setup(props, ctx) {
    const sandboxId = 'sandbox'
    const iframeClassName = 'sandbox-iframe'
    const iframeState = reactive({
      isActive: false,
    })

    const vuex = useVuex(ctx)
    const iframeRef = ref() as Ref<HTMLIFrameElement>

    onMounted(() => {
      const iframe = iframeRef.value
      const iframeDoc = iframe.contentDocument

      if (iframeDoc) {
        iframeDoc.documentElement.innerHTML = 'hello world'
      }

      // window.addEventListener('mousedown', (e) => {
      //   if (isOutside(e.target as HTMLElement, [`#${sandboxId}`])) {
      //     iframeState.isActive = false
      //   } else {
      //     iframeState.isActive = true
      //   }
      // })

      if (iframe.contentWindow) {
        const iframeWindow = iframe.contentWindow
        iframeWindow.addEventListener('click', (e) => {
          window.dispatchEvent(e)
        })
      }
    })

    return {
      sandboxId,
      iframeClassName,
      iframeState,
      iframeRef,
      mergeClassNames,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#sandbox {
  position: fixed;
  top: $menu-bar-height;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $ae-white;

  .sandbox-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $ae-white;
    // pointer-events: none;

    &.active {
      pointer-events: all;
    }
  }
}
</style>
