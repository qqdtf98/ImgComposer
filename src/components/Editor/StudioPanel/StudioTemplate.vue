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
        <!--
          To 성민.
          `div` 태그는 만능이고 모든 곳에서 사용할 수 있지만
          `button`, `span`, `section`, `main` 등의 의미 있는(semantic)
          HTML 마크업을 사용하는 게 더 좋아요.
        -->
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
      // To 성민.
      // while(1) 로 부모를 타고 올라가면서 `.template-wrapper`를 찾는것보다
      // DOM API에서 제공하는 `closest()` 메소드를 사용해서 더 간결하고 효율적이게 만들었어요.
      // 좋은 시도였습니다.
      const target: HTMLElement = (e.target as HTMLElement).closest(
        '.template-wrapper'
      ) as HTMLElement

      if (target) {
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
