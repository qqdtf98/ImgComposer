<template>
  <div id="basic-template">
    <div
      v-for="(template, i) in vuex.templates.basicTemplates"
      :key="i"
      class="template-wrapper"
      @mousedown="dragTemplate"
    >
      <span class="template-text">{{ template.template_name }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    // Fire when mouse down
    function dragTemplate(e: MouseEvent) {
      const target: HTMLElement = (e.target as HTMLElement).closest(
        '.template-wrapper'
      ) as HTMLElement

      if (target) {
        const copyTarget = target.cloneNode(true) as HTMLElement
        const initLeftInter = e.screenX - target.getBoundingClientRect().left
        const initTopInter = e.screenY - target.getBoundingClientRect().top

        copyTarget.style.opacity = '0.8'
        copyTarget.style.position = 'fixed'
        copyTarget.style.left = target.style.left
        copyTarget.style.top = target.style.top
        copyTarget.style.zIndex = '555'
        target.appendChild(copyTarget)

        // Turn off pointer events of the copied target element
        copyTarget.style.pointerEvents = 'none'

        // Set the copied target's position based on the screen position
        const moveEvent = (e: MouseEvent) => {
          copyTarget.style.left = e.screenX - initLeftInter + 'px'
          copyTarget.style.top = e.screenY - initTopInter + 'px'
        }

        // Get iframe and its window object
        const iframe = document.querySelector(
          '#main-iframe'
        ) as HTMLIFrameElement
        const iframeWindow = iframe.contentWindow

        // Attach the same mousemove event
        // to both master window and iframe window
        // to prevent event blocking and make mouse movement continuous
        window.addEventListener('mousemove', moveEvent)
        iframeWindow?.addEventListener('mousemove', moveEvent)

        let iframeUpEvent: (e: MouseEvent) => void
        let upEvent: (e: MouseEvent) => void

        const removeEventListener = () => {
          // Remove the copied target
          target.removeChild(copyTarget)

          // Remove all the event listeners to retrieve memories
          iframeWindow?.removeEventListener('mousemove', moveEvent)
          window.removeEventListener('mousemove', moveEvent)
          iframeWindow?.removeEventListener('mouseup', iframeUpEvent)
          window.removeEventListener('mouseup', upEvent)
        }

        // Get the mouse event target when mouse up inside the iframe window
        iframeWindow?.addEventListener(
          'mouseup',
          (iframeUpEvent = (e: MouseEvent) => {
            console.log(e.target)
            removeEventListener()
          })
        )

        window.addEventListener(
          'mouseup',
          (upEvent = (e: MouseEvent) => {
            if (e.srcElement !== window) {
              removeEventListener()
            }
          })
        )
      }
    }

    function insertTemplate() {}

    return {
      dragTemplate,
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#basic-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;

  .template-wrapper {
    @include auto-distinct-bg-color;
    margin-bottom: 12px;
    padding: 15px 15px;
    width: 240px;
    height: 50px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 300ms ease;

    &:hover {
      opacity: 0.7;
    }
    .template-text {
      font-weight: 500;
      font-size: 23px;
      right: 0;
      text-align: center;
      color: #c7c7c7;
      user-select: none;
    }
  }
}
</style>
