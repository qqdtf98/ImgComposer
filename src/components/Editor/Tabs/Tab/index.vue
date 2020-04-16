<template>
  <section class="tab" :class="{ active: isActive }">
    <button class="surface" @click="setActiveFileIndex" />
    <div class="label">{{ fileName }}</div>
    <button class="close" @click="closeTab">
      <i class="icon-close" />
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Vuex } from '@/modules/vuex'
import _ from 'lodash'

export default defineComponent({
  props: {
    fileName: {
      type: String,
      default: '',
    },
    fileId: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup({ fileId }) {
    const { store } = Vuex

    function setActiveFileIndex() {
      store.editorInfo.SET_ACTIVE_FILE_INDEX(fileId)
      const fileList = store.fileData.fileList
      let i
      for (i = 0; i < fileList.length; i++) {
        if (fileList[i].fileId === fileId) {
          store.fileData.SET_SELECTED_FILE(fileList[i])
          break
        }
      }
    }

    function closeTab() {
      const opened = [...store.editorInfo.openedFiles]
      const fileList = store.editorInfo.openedFiles
      let i
      for (i = 0; i < fileList.length; i++) {
        if (fileList[i].fileId === fileId) {
          if (store.fileData.selectedFile?.fileId === fileId) {
            if (i === fileList.length - 1) {
              store.fileData.SET_SELECTED_FILE(fileList[i - 1])
              break
            } else {
              store.fileData.SET_SELECTED_FILE(fileList[i + 1])
              break
            }
          }
        }
      }
      _.remove(opened, (file) => file.fileId === fileId)
      store.editorInfo.SET_OPENED_FILES(opened)
    }

    return {
      setActiveFileIndex,
      closeTab,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

.tab {
  position: relative;
  font-size: 14px;
  min-width: 160px;
  height: $tab-height - 1px;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 10px;
  border-right: 1px solid;
  user-select: none;
  transition: background-color 200ms ease, color 200ms ease;
  @include auto-border-color;

  .label {
    pointer-events: none;
  }

  .surface {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    @include auto-text-color;
    padding: 2px;
    border-radius: 3px;
    font-size: 15px;
    opacity: 0;
    z-index: 5;
    pointer-events: none;
    transition: background-color 200ms ease;

    &:hover {
      @include auto-bg-color;
    }
  }

  &:hover {
    @include auto-distinct-bg-color;

    .close {
      opacity: 1;
      pointer-events: all;
    }
  }

  &.active {
    // @include auto-distinct-bg-color;
    @include auto-blue-color;

    @include light-mode {
    }
  }
}
</style>
