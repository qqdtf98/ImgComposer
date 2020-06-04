<template>
  <div
    v-show="vuex.templates.selectCssFile"
    id="css-selector"
    :style="{
      left: vuex.templates.selectorPosX + 'px',
      top: vuex.templates.selectorPosY + 'px',
    }"
  >
    <div class="css-file-list">
      <div class="css-file-title">CSS Files</div>
      <div
        v-for="(css, i) in vuex.fileData.cssFileList"
        :key="i"
        class="css-file-text"
        @click="insertTemplate"
      >
        {{ css.fileName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '@/modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    /**
     * @param e select css fileName
     */
    function insertTemplate(e: MouseEvent) {
      const target = vuex.templates.insertTarget
      const template = vuex.templates.insertTemplate

      // html에 해당 element 삽입
      const newTemplate = document.createElement('div')
      newTemplate.innerHTML = template.html_code
      target.parentElement?.insertBefore(
        newTemplate.children[0],
        target.nextSibling
      )

      // iframe의 html 코드 data에 저장
      const evtTarget = e.target as HTMLElement
      vuex.fileData.insertTemplateValue(evtTarget.textContent?.trim())

      vuex.templates.SET_SELECT_CSS_FILE(false)
    }

    return {
      vuex,
      insertTemplate,
    }
  },
})
</script>

<style lang="scss">
#css-selector {
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 137px;

  .css-file-list {
    display: flex;
    flex-direction: column;
    background-color: rgba(58, 58, 60, 0.8);
    border-radius: 0.5rem;
    width: 8rem;
    position: absolute;
    right: 0;
    width: 130px;
    top: -10px;

    .css-file-text {
      padding: 0.25rem 0.5rem;
      font-size: 0.85rem;
      border-top: 1px solid black;

      &:hover {
        background-color: #000;
        cursor: pointer;
      }
    }

    .css-file-title {
      font-size: 0.8rem;
      font-weight: 700;
      line-height: 0.9;
      padding: 0.8rem 0.5rem;
    }
  }
}
</style>
