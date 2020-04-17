<template>
  <div id="tabs">
    <div class="scroll-container">
      <Tab
        v-for="file in vuex.editorInfo.openedFiles"
        :key="file.fileId"
        :file-name="file.fileName"
        :fileId="file.fileId"
        :is-active="vuex.editorInfo.activeFileIndex === file.fileId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from '@vue/composition-api'
import Tab from './Tab/index.vue'
import { Vuex } from '@/modules/vuex'
import { iframeSampleHtml } from '@/miscellaneous/iframe-sample-html'
import { File } from '../../../interfaces/any-editor-file'
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  components: { Tab },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    watch(
      () => vuex.fileData.selectedFile,
      () => {
        if (!vuex.fileData.selectedFile) return
        vuex.editorInfo.storeOpenedFiles(vuex.fileData.selectedFile)
        vuex.editorInfo.SET_ACTIVE_FILE_INDEX(vuex.fileData.selectedFile.fileId)
      }
    )

    return {
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#tabs {
  width: 100%;
  overflow-y: hidden;
  height: $tab-height;
  @include auto-bg-color;
  border-bottom: 1px solid;
  @include auto-border-color;

  .scroll-container {
    overflow-x: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: $tab-height + 17px;
  }
}
</style>
