<template>
  <div id="image-mode">
    <SidePanel />
    <ImgLoad @img-load="activatePageMenu" />
    <img
      v-show="isPageMenu"
      class="page-menu"
      src="@/assets/images/menu.svg"
      @click="activatePageList"
    />
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

export default defineComponent({
  components: { MenuBar, Tabs, ImgLoad, SidePanel, Pages },
  setup() {
    const isPageList = ref(false)

    function activatePageList() {
      if (isPageList.value) {
        isPageList.value = false
      } else {
        isPageList.value = true
      }
    }

    const isPageMenu = ref(false)

    function activatePageMenu() {
      isPageMenu.value = true
    }

    return {
      isPageList,
      activatePageList,
      isPageMenu,
      activatePageMenu,
    }
  },
})
</script>

<style lang="scss">
#image-mode {
  color: black;

  .page-menu {
    position: fixed;
    right: 30px;
    bottom: 30px;
    cursor: pointer;
  }

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
