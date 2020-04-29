<template>
  <div
    class="view-hide"
    :data-mode="store.composer.optionsViewMode"
    @click="changeViewMode"
  >
    <button class="btn"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '../../../modules/vue-hooks'

export default defineComponent({
  setup(...args) {
    const store = useStore(args[1])

    function changeViewMode() {
      store.composer.SET_IS_HIDDEN(
        store.composer.optionsViewMode === 'visible' ? 'hidden' : 'visible'
      )
    }

    return {
      store,
      changeViewMode,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;
@use '@/assets/styles/component-composer/common-styles.scss' as *;

.view-hide {
  position: absolute;
  top: 20px;
  left: 20px;

  .btn {
    @include tip-style;
    width: 40px;
    height: 32px;
    background-image: url('~assets/images/disabled-eye.svg');
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: transform 150ms ease;

    &:active {
      transform: scale(0.9);
    }
  }

  &[data-mode='hidden'] {
    .btn {
      background-image: url('~assets/images/blue-eye.svg');
    }
  }
}
</style>
