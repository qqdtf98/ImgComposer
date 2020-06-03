<template>
  <div id="sample-template">
    <div
      v-for="(template, i) in templates"
      :key="i"
      class="template-wrapper"
      @mousedown="insertTemplate"
    >
      <div class="default-template">
        <block-icon v-if="template === 'block'" class="template-icon" />
        <image-icon v-else-if="template === 'image'" class="template-icon" />
        <link-icon v-else-if="template === 'link'" class="template-icon" />
        <text-icon v-else-if="template === 'text'" class="template-icon" />
        <span class="template-text">{{ templateList[template].name }}</span>
      </div>
      <div v-if="templateList[template].options" class="optional-template">
        <button
          v-for="(list, j) in templateList[template].optionList"
          :key="j"
          class="template-option"
        >
          {{ list }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BlockIcon from '@/components/icons/BlockIcon.vue'
import ImageIcon from '@/components/icons/ImageIcon.vue'
import LinkIcon from '@/components/icons/LinkIcon.vue'
import TextIcon from '@/components/icons/TextIcon.vue'

export default defineComponent({
  components: { BlockIcon, ImageIcon, LinkIcon, TextIcon },
  setup() {
    const templateList: Record<
      string,
      {
        options: boolean
        optionList: string[] | null
        name: string
      }
    > = {
      block: {
        options: false,
        optionList: null,
        name: 'Block',
      },
      text: {
        options: true,
        optionList: ['Head', 'Paragraph'],
        name: 'Text',
      },
      image: {
        options: false,
        optionList: null,
        name: 'Image',
      },
      link: {
        options: false,
        optionList: null,
        name: 'Link',
      },
    }
    const templates = Object.keys(templateList)

    // Fire when mouse down
    function insertTemplate(e: MouseEvent) {
      const target: HTMLElement = (e.target as HTMLElement).closest(
        '.template-wrapper'
      ) as HTMLElement

      if (target) {
        let upEvent: (e: MouseEvent) => void

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

        // Get the mouse event target when mouse up inside the iframe window
        iframeWindow?.addEventListener(
          'mouseup',
          (upEvent = (e: MouseEvent) => {
            // Remove the copied target
            target.removeChild(copyTarget)

            // Remove all the event listeners to retrieve memories
            iframeWindow.removeEventListener('mousemove', moveEvent)
            window.removeEventListener('mousemove', moveEvent)
            iframeWindow.removeEventListener('mouseup', upEvent)
          })
        )
      }
    }

    return {
      templateList,
      templates,
      insertTemplate,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#sample-template {
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
    min-height: 100px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 300ms ease;

    &:hover {
      opacity: 0.7;
    }

    .default-template {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: calc(100% - 50px);

      .template-icon {
        width: 50px;
        left: 0;
      }

      .template-text {
        font-weight: 500;
        font-size: 23px;
        right: 0;
        text-align: center;
        color: #a3a3a3;
        user-select: none;
      }
    }

    .optional-template {
      @include auto-separator-color;
      border-top: 1px solid;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: center;
      padding-top: 15px;
      margin-top: 15px;

      .template-option {
        @include auto-bg-color;
        @include auto-text-color;
        border-radius: 8px;
        text-align: center;
        padding: 8px;
        flex: 1;
        margin-right: 10px;
        font-size: 15px;
        font-weight: 500;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          @include auto-blue-color;
          transition: background-color 300ms ease;
        }
      }
    }
  }
}
</style>
