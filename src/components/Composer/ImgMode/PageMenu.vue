<template>
  <img
    v-show="isPageMenu"
    class="page-menu"
    src="@/assets/images/menu.svg"
    @click="activatePageList"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    isPageMenu: Boolean,
  },
  setup(props, ctx) {
    function activatePageList() {
      ctx.emit('page-state')
    }

    return {
      activatePageList,
    }
  },
})
</script>

<style lang="scss">
.page-menu {
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  z-index: 10;
}
</style>
