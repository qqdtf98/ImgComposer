<template>
  <div id="options-shadow">
    <div class="shadow-input">
      <div class="shadow-list">
        <div class="shadow-text"></div>
        <input class="shadow-input" />
        <select class="shadow-option">
          <option value="px">px</option>
          <option value="rem">rem</option>
          <option value="em">em</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from '@vue/composition-api'
import { useVuex, useNextTick } from '@/modules/vue-hooks'
import RangeSlider from 'vue-range-slider'

export default defineComponent({
  components: { RangeSlider },
  setup(props, ctx) {
    // TODO shadow 기능 작성하기
  },
})
</script>
<style lang="scss">
#options-shadow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 100%;
}
</style>
