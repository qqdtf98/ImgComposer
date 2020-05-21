<template>
  <div id="file-tree"></div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from '@vue/composition-api'
import { useVuex } from '../../../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    type DirType = {
      name: string
      children: DirType[]
    }

    watchEffect(() => {
      if (vuex.folderDirectory.directory.name !== '') {
        console.log(vuex.folderDirectory.directory)
        createFileTree(
          vuex.folderDirectory.directory,
          document.querySelector('#file-tree') as HTMLElement
        )
      }
    })

    function createFileTree(directory: DirType, parent: HTMLElement) {
      if (!parent) return
      if (directory.children.length === 0) {
        // File
        const childElement = document.createElement('div')
        childElement.textContent = 'file ' + directory.name
        parent.appendChild(childElement)
      } else {
        // Folder
        const folderElement = document.createElement('div')
        folderElement.classList.add('folder')
        const imgElement = document.createElement('img')
        imgElement.src = '@/assets/images/rightarrow.svg'
        const textElement = document.createElement('div')
        textElement.textContent = directory.name
        // folderElement.appendChild(iumg)
        parent.appendChild(folderElement)
        for (let i = 0; i < directory.children.length; i++) {
          createFileTree(directory.children[i], folderElement)
        }
      }
    }

    // console.log(vuex.folderDirectory.directory)
  },
})
</script>

<style lang="scss">
#file-tree {
  margin-bottom: calc(50px + 20px);
  margin-top: 50px;
  padding: 0 13px;
  height: 300px;

  .folder {
    margin-left: 10px;
  }
}
</style>
