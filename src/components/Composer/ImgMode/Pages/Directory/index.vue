<template>
  <div id="directory">
    <vue-custom-scrollbar class="title-area">
      <div class="path-wrapper">
        <div class="root-title" @click="moveToRoot">
          {{ vuex.folderDirectory.rootTitle }}
        </div>
        <div v-for="(path, i) in pathList" :key="i" class="folder-path">
          <img class="arrow-icon" src="@/assets/images/rightarrow.svg" />
          <div class="folder-title">{{ path }}</div>
        </div>
      </div>
    </vue-custom-scrollbar>
    <DirectoryItem
      v-for="item in vuex.folderDirectory.currentList"
      :key="item.name + item.children.length"
      :item="item"
      @dir-name="setPath"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useVuex } from '@/modules/vue-hooks'
import { dirType } from '@/store/folderDirectory'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import DirectoryItem from './DirectoryItem.vue'

export default defineComponent({
  components: { DirectoryItem, vueCustomScrollbar },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const directory: dirType = vuex.folderDirectory.directory

    function setPath(dirName: string) {
      pathList.value.push(dirName)
    }

    const pathList = ref<string[]>([])

    function moveToRoot() {
      pathList.value = []
      console.log(pathList)
      vuex.folderDirectory.SET_CURRENT_LIST(
        vuex.folderDirectory.directory.children
      )
    }

    // TODO 폴더 뒤로가기 구현

    return {
      vuex,
      setPath,
      pathList,
      moveToRoot,
    }
  },
})
</script>

<style lang="scss">
#directory {
  margin-bottom: calc(50px + 20px);
  margin-top: 50px;
  padding: 0 13px;
  height: 300px;

  .title-area {
    padding: 3px 4px 2px 4px;
    background: #f0f0f3;
    border-radius: 6px;
    white-space: nowrap;

    .path-wrapper {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;

      .root-title {
        padding: 1px 5px;
        border-radius: 4px;
        &:hover {
          cursor: pointer;
          background-color: #e9c5c5;
        }
      }

      .folder-path {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .folder-title {
          padding: 1px 5px;
          cursor: default;
        }
      }
    }
  }
}
</style>
