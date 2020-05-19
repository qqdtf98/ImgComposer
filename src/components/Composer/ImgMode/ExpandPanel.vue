<template>
  <img
    v-show="vuex.identifier.fileState"
    class="fold-img"
    src="@/assets/images/rightarrow.svg"
    @click="expandSidePanel"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    function expandSidePanel() {}

    return {
      vuex,
      expandSidePanel,
    }
  },
})
</script>

<style lang="scss">
.fold-img {
  position: fixed;
  width: 32px;
  height: 40px;
  top: 16.5px;
  left: 372px;
  background: #ffffff;
  border: 1px solid #ababab;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 8px;
  transform: rotate(90deg);
  cursor: pointer;
}
</style>
