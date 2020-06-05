<template>
  <div id="file-panel">
    <h1 class="file-header" @click="activateFileList">
      <span>
        프로젝트
      </span>
      <img class="layout-icon" src="@/assets/images/down.svg" />
    </h1>
    <FileList />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from '@vue/composition-api'
import { getMatchedCssRules } from '@/modules/get-matched-css-rules'
import FileList from './FileList.vue'
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  components: { FileList },
  setup(props, ctx) {
    const vuex = useVuex(ctx)
    const isFileListOn = ref(false)

    onMounted(() => {
      activateFileList()
    })

    /**
     * fileList 열고 닫을 때마다 file-panel과 layout 길이 변경
     */
    function activateFileList() {
      const stylesCompo = document.querySelector(
        '.layout-scroll-area'
      ) as HTMLElement
      const listCompo = document.querySelector('#file-panel') as HTMLElement

      if (isFileListOn.value) {
        // fileList 닫기
        isFileListOn.value = false
        stylesCompo.style.height = 'calc(100% - 115px)'
        listCompo.style.height = '45px'
      } else {
        // fileList 열기
        isFileListOn.value = true
        setTimeout(() => {
          const totalHeight =
            listCompo.children[1].getBoundingClientRect().height + 45
          listCompo.style.height = totalHeight + 'px'
          stylesCompo.style.height = `calc(100% - 70px - ${totalHeight}px)`
        }, 0)
      }
    }

    return {
      activateFileList,
      isFileListOn,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#file-panel {
  @include auto-distinct-bg-color;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: height 0.3s ease;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .file-header {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    position: absolute;
    top: 0;
    height: 45px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    .collapse-btn {
      font-size: 20px;
      display: flex;
      @include auto-text-color;
      transition: background-color $default-transition-time ease;
      padding: 5px;
      border-radius: 5px;
      margin-right: -5px;

      &:hover {
        @include auto-distinct-bg-color;
      }
    }
    .layout-icon {
      width: 1rem;
      margin-right: 5px;
      transform: rotate(180deg);
    }

    .selector-value {
    }
  }
}
</style>
