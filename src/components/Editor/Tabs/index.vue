<template>
  <div id="tabs">
    <div class="scroll-container">
      <Tab
        v-for="file in store.editorInfo.openedFiles"
        :key="file.fileId"
        :file-name="file.fileName"
        :fileId="file.fileId"
        :is-active="store.editorInfo.activeFileIndex === file.fileId"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Tab from './Tab/index.vue'
import { Vuex } from '@/modules/vuex'
import { iframeSampleHtml } from '@/miscellaneous/iframe-sample-html'
import { AnyEditorFile } from '../../../interfaces/any-editor-file'

export default defineComponent({
  components: { Tab },
  setup() {
    const { store } = Vuex

    const opened = [...store.editorInfo.openedFiles]

    const dummies = [...Array(10).keys()].map(
      (i) =>
        ({
          path: '/',
          fileId: i,
          fileName: `markup-${i}.html`,
          fileType: 'html',
          data: '',
        } as AnyEditorFile)
    )

    store.editorInfo.SET_ACTIVE_FILE_INDEX(1)

    store.editorInfo.SET_OPENED_FILES(dummies)

    // console.log(store.editorInfo.openedFiles)

    return {
      store,
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
