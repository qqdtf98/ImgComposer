<template>
  <div id="image-mode">
    <SidePanel />
    <ImgLoad @img-load="activatePageMenu" />
    <PageMenu :isPageMenu="isPageMenu" @page-state="activatePageList" />
    <Pages v-show="isPageList" id="page" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import MenuBar from '@/components/Editor/MenuBar/index.vue'
import Tabs from '@/components/Editor/Tabs/index.vue'
import ImgLoad from './ImgLoad/index.vue'
import SidePanel from './SidePanel/index.vue'
import Pages from '@/components/Composer/ImgMode/Pages/index.vue'
import PageMenu from './PageMenu.vue'

export default defineComponent({
  components: { MenuBar, Tabs, ImgLoad, SidePanel, Pages, PageMenu },
  setup() {
    const isPageMenu = ref(false)

    const isPageList = ref(false)

    function activatePageList() {
      if (isPageList.value) {
        isPageList.value = false
      } else {
        isPageList.value = true
      }
    }

    function activatePageMenu() {
      isPageMenu.value = true
    }

    return {
      isPageMenu,
      activatePageMenu,
      isPageList,
      activatePageList,
    }
  },
})
</script>

<style lang="scss">
#image-mode {
  color: black;

  #page {
    position: fixed;
    right: 30px;
    bottom: 100px;
  }
}
@at-root {
  body {
    background-color: white !important;
  }
}
</style>
