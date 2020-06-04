<template>
  <img
    v-show="vuex.identifier.fileState"
    ref="pageFoldRef"
    class="fold-img"
    src="@/assets/images/rightarrow.svg"
    @click="expandSidePanel"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const pageFoldRef = ref<HTMLElement>(null)
    const pageFoldState = ref(false)

    function expandSidePanel() {
      if (!pageFoldRef.value) return
      const sidePanel = document.querySelector('.side-panel') as HTMLElement
      const viewHide = document.querySelector('.view-hide') as HTMLElement
      const imgLoad = document.querySelector('.img-load-box') as HTMLElement

      if (pageFoldState.value) {
        // sidepanel 접기
        pageFoldState.value = false
        imgLoad.style.display = 'block'
        sidePanel.style.width = '300px'
        sidePanel.style.display = 'block'
        viewHide.style.display = 'block'
        pageFoldRef.value.classList.remove('fold-expand')
        for (let i = 0; i < sidePanel.children.length; i++) {
          sidePanel.children[i].classList.remove('panel-expand')
        }
        sidePanel.children[0].classList.remove('transfer-expand')
      } else {
        // sidepanel 열기
        pageFoldState.value = true
        imgLoad.style.display = 'none'
        sidePanel.style.width = '100%'
        sidePanel.style.display = 'flex'
        viewHide.style.display = 'none'
        pageFoldRef.value.classList.add('fold-expand')
        for (let i = 0; i < sidePanel.children.length; i++) {
          sidePanel.children[i].classList.add('panel-expand')
        }
        sidePanel.children[0].classList.add('transfer-expand')
      }
    }

    return {
      vuex,
      expandSidePanel,
      pageFoldRef,
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
  z-index: 10;
}
.fold-expand {
  left: 20px;
  bottom: 20px;
  transform: rotate(270deg);
}
</style>
