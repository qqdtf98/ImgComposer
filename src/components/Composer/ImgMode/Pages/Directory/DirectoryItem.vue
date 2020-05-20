<template>
  <div class="directory-item" @click="selectDirContent">
    <img
      v-if="item.children.length !== 0"
      class="directory-icon directory-folder"
      src="@/assets/images/foldergray.svg"
    />
    <img
      v-if="item.children.length === 0"
      class="directory-icon"
      src="@/assets/images/filegray.svg"
    />
    <div>{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { dirType } from '@/store/folderDirectory.ts'
import { useVuex } from '../../../../../modules/vue-hooks'

export default defineComponent({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const { item } = props as {
      item: dirType
    }
    function selectDirContent(e: MouseEvent) {
      if (!props.item) return
      const target = e.target as HTMLElement
      if (props.item.children.length !== 0) {
        console.log(props.item)
        vuex.folderDirectory.SET_CURRENT_LIST(props.item.children)
        ctx.emit('dir-name', props.item.name)
      } else {
        const folderPath = document.querySelectorAll(
          '.folder-path'
        ) as NodeListOf<HTMLElement>
        let filePath = vuex.folderDirectory.rootTitle
        for (let i = 0; i < folderPath.length; i++) {
          if (!folderPath[i].textContent) return
          const path = folderPath[i].textContent as string
          filePath += '/' + path.replace(' ', '')
        }
        filePath += '/' + props.item.name

        const changePage = vuex.identifier.pages.find(
          (elem) => elem.imagePath === filePath
        )
        if (!changePage) return

        const preview = document.querySelector('#preview') as HTMLImageElement
        preview.src = changePage.imageData
        const image: NodeListOf<HTMLElement> = document.querySelectorAll(
          '#page-img'
        )
        const imageArr = Array.prototype.slice.call(image)
        const selectedPageIndex = imageArr.findIndex(
          (elem) => elem.src === changePage.imageData
        )
        console.log(selectedPageIndex)
        vuex.identifier.SET_SELECTED_PAGE_INDEX(selectedPageIndex)
      }
    }

    return {
      selectDirContent,
    }
  },
})
</script>

<style lang="scss">
.directory-item {
  display: flex;
  flex-direction: row;
  padding: 4px 0;
  cursor: pointer;
  &:hover {
    background-color: #cacaca;
    border-radius: 3px;
  }

  .directory-icon {
    width: 16px;
    margin: 0 5px;
  }

  .directory-folder {
    width: 18px;
    margin: 0 4px;
  }
}
</style>
