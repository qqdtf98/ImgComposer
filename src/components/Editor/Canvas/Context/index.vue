<template>
  <div id="css-rules">
    <div class="rules-title">CSS Rules</div>
    <div class="selector-list-wrapper">
      <div
        v-for="(rule, i) in cssRules"
        :key="i"
        class="selector-list"
        @click="selectCssSelector($event, rule)"
      >
        {{ rule.selectorText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'
import { Cem } from '@/modules/custom-events-manager'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)
    const cssRules = ref<CSSStyleRule[]>(null)
    watch(
      () => vuex.editorInfo.matchedCssRules,
      () => {
        cssRules.value = vuex.editorInfo.matchedCssRules
        // Dispatch an event about markers change
        Cem.dispatchEvent('onmarkerschange')
      }
    )

    function selectCssSelector(e: MouseEvent, rule: CSSStyleRule) {
      vuex.editorInfo.SET_SELECTED_CSS_RULE(rule)

      setTimeout(() => {
        Cem.dispatchEvent('openstyles')
      }, 0)
    }

    return {
      cssRules,
      selectCssSelector,
    }
  },
})
</script>

<style lang="scss">
#css-rules {
  background-color: rgba(#3a3a3c, 0.8);
  backdrop-filter: blur(20px) saturate(1.7);
  width: 10rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: fixed;
  padding-bottom: 0.2rem;

  .rules-title {
    font-size: 1.1rem;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }

  .selector-list-wrapper {
    width: 100%;

    .selector-list {
      width: 100%;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      padding-right: 0.7rem;
      padding-left: 0.7rem;
      font-size: 0.9rem;
      border-top: 1px solid black;

      &:hover {
        background-color: #5a5a5e;
        cursor: pointer;
      }
    }
  }
}
</style>
