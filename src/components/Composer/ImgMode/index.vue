<template>
  <div id="image-mode">
    <ImgLoad />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MenuBar from '@/components/Editor/MenuBar/index.vue'
import Tabs from '@/components/Editor/Tabs/index.vue'
import ImgLoad from './ImgLoad/index.vue'

export default defineComponent({
  components: { MenuBar, Tabs, ImgLoad },
})
</script>

<style lang="scss">
#image-mode {
  color: black;
}
@at-root {
  body {
    background-color: white !important;
  }
}
</style>
