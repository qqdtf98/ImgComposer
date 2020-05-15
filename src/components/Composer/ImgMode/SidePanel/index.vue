<template>
  <div class="side-panel">
    <DataTransfer />
    <VuexStore />
    <Components />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import VuexStore from './VuexStore.vue'
import Components from './Components.vue'
import DataTransfer from './DataTransfer/index.vue'

export default defineComponent({
  components: { VuexStore, Components, DataTransfer },
})
</script>

<style lang="scss">
.side-panel {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  border-right: 1px solid #ababab;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 50px 20px;
}
</style>
