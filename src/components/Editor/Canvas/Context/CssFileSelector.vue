<template>
  <div id="css-file-selector">
    <div class="context-arrow"></div>
    <div class="css-file-list">
      <div class="css-file-title">CSS Files</div>
      <div
        v-for="(css, i) in vuex.fileData.cssFileList"
        :key="i"
        class="css-file-text"
        @click="storeCssSelector"
      >
        {{ css.fileName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'

export default defineComponent({
  props: {
    cssTarget: HTMLInputElement,
    selectorType: String,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    function storeCssSelector(e: MouseEvent) {
      if (!props.cssTarget) return
      const target = e.target as HTMLElement
      if (props.selectorType === 'class') {
        const addValue = {
          value: '.' + props.cssTarget.value + '{}',
          title: target.textContent?.trim(),
        }
        vuex.fileData.addSelectorValue(addValue)
      } else if (props.selectorType === 'id') {
        const addValue = {
          value: '#' + props.cssTarget.value + '{}',
          title: target.textContent?.trim(),
        }
        vuex.fileData.addSelectorValue(addValue)
      }
      ctx.emit('vacate-input')
    }

    return {
      vuex,
      storeCssSelector,
    }
  },
})
</script>

<style lang="scss">
#css-file-selector {
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 137px;

  .context-arrow {
    background-color: rgba(58, 58, 60, 0.8);
    width: 0.8rem;
    height: 0.8rem;
    transform: rotate(45deg);
    position: absolute;
    top: 10px;
    // right: 0.5rem;
  }

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
