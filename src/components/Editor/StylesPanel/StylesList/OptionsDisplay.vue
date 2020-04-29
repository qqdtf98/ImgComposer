<template>
  <div id="options-display">
    <button
      v-for="(property, i) in properties"
      :key="i"
      class="display-property"
      @click="submitDisplayValue(property)"
    >
      {{ property }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '@/modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)
    const properties: string[] = ['block', 'inline-block', 'inline', 'flex']
    function submitDisplayValue(prop: string) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        vuex.editorInfo.selectedCssRule.style.display = prop
      }
    }

    return {
      properties,
      submitDisplayValue,
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 7px;
  margin-top: 13px;
  margin-bottom: 6px;

  .display-property {
    font-size: 13px;
    @include auto-distinct-bg-color;
    @include auto-text-color;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    width: 7rem;
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    border-radius: 0.3rem;

    &:hover {
      background-color: #1471ff;
    }
  }
}
</style>
