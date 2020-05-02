<template>
  <div id="image-mode">
    <SidePanel />
    <ImgLoad />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MenuBar from '@/components/Editor/MenuBar/index.vue'
import Tabs from '@/components/Editor/Tabs/index.vue'
import ImgLoad from './ImgLoad/index.vue'
import SidePanel from './SidePanel/index.vue'

export default defineComponent({
  components: { MenuBar, Tabs, ImgLoad, SidePanel },
})
</script>

<style lang="scss">
@at-root {
  body {
    background-color: white;
    color: black;
  }
}
</style>
