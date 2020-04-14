<template>
  <div id="options-position">
    <button
      v-for="(property, i) in properties"
      :key="i"
      class="position-property"
      @click="submitPositionValue(property)"
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
    const properties: string[] = ['relative', 'absolute', 'fixed']

    // position 값을 사용하여 css selector 변경
    function submitPositionValue(prop: string) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        vuex.editorInfo.selectedCssRule.style.position = prop
      }
    }

    return {
      properties,
      submitPositionValue,
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-position {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
  .position-property {
    @include auto-distinct-bg-color;
    @include auto-text-color;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    width: 5rem;
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
