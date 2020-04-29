<template>
  <div class="side-panel">
    <VuexStore />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import VuexStore from './VuexStore.vue'

export default defineComponent({
  components: { VuexStore },
})
</script>

<style lang="scss">
.side-panel {
  position: fixed;
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
