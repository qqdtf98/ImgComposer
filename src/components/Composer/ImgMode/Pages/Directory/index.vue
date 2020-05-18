<template>
  <div id="directory">
    <div class="path-wrapper">
      <div>{{ vuex.folderDirectory.rootTitle }}</div>
      <div v-for="(path, i) in pathList" :key="i" class="folder-path">
        <img class="arrow-icon" src="@/assets/images/rightarrow.svg" />
        <div>{{ path }}</div>
      </div>
    </div>
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
import DirectoryItem from './DirectoryItem.vue'

export default defineComponent({
  components: { DirectoryItem },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const directory: dirType = vuex.folderDirectory.directory

    function setPath(dirName: string) {
      pathList.push(dirName)
    }

    const pathList: string[] = []

    // TODO 폴더 뒤로가기 구현

    return {
      vuex,
      setPath,
      pathList,
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

  .path-wrapper {
    padding: 5px 10px;
    background: #f0f0f3;
    border-radius: 6px;
    display: flex;
    flex-direction: row;

    .folder-path {
      display: flex;
      flex-direction: row;

      .arrow-icon {
        margin: 0 5px;
      }
    }
  }
}
</style>
