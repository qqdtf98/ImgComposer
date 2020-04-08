<template>
  <div id="studio-template">
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

    function insertTemplate(e: MouseEvent) {
      let target = e.target as HTMLElement
      if (target) {
        while (1) {
          if (target.className === 'template-wrapper') break
          else if (target.parentElement) {
            target = target.parentElement
          }
        }
        let moveEvent: (e: MouseEvent) => void
        let upEvent: (e: MouseEvent) => void
        const copyTarget = target.cloneNode(true) as HTMLElement
        const initLeftInter = e.clientX - target.getBoundingClientRect().left
        const initTopInter = e.clientY - target.getBoundingClientRect().top
        copyTarget.style.opacity = '0.8'
        copyTarget.style.position = 'fixed'
        copyTarget.style.left = target.style.left
        copyTarget.style.top = target.style.top
        copyTarget.style.zIndex = '555'
        target.appendChild(copyTarget)

        window.addEventListener(
          'mousemove',
          (moveEvent = (e: MouseEvent) => {
            copyTarget.style.left = e.clientX - initLeftInter + 'px'
            copyTarget.style.top = e.clientY - initTopInter + 'px'
          })
        )
        window.addEventListener(
          'mouseup',
          (upEvent = () => {
            target.removeChild(copyTarget)
            window.removeEventListener('mousemove', moveEvent)
            window.removeEventListener('mouseup', upEvent)
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

#studio-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  .template-wrapper {
    margin-top: 7px;
    margin-bottom: 7px;
    width: 230px;
    @include auto-distinct-bg-color;
    border-radius: 0.84rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
      background-color: #575757;
    }
    .default-template {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 160px;
      justify-content: center;
      position: relative;
      height: 85px;
      .template-icon {
        width: 60px;
        position: absolute;
        left: 0;
      }
      .template-text {
        font-weight: 500;
        font-size: 23px;
        letter-spacing: 1px;
        position: absolute;
        right: 0;
        text-align: center;
        width: 80px;
        color: #bebebe;
      }
    }
    .optional-template {
      border-top: 0.7px solid #6b6b6be1;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 200px;
      justify-content: center;
      position: relative;
      margin-bottom: 12px;
      .template-option {
        margin-top: 12px;
        border-radius: 0.5rem;
        margin-right: 0.4rem;
        margin-left: 0.4rem;
        width: 90px;
        text-align: center;
        padding-top: 0.3rem;
        @include auto-bg-color;
        padding-bottom: 0.3rem;
        &:hover {
          background-color: #4f89d6;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
