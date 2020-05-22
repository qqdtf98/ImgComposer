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

    function foldDirectory(e: MouseEvent) {
      let target = e.target as HTMLElement
      target = target.closest('.folder-box') as HTMLElement
      target.children[0].classList.toggle('arrow-spin')
      if (!target.parentElement) return
      for (let i = 1; i < target.parentElement.children.length; i++) {
        target.parentElement.children[i].classList.toggle('folder-display')
      }
    }

    function openDirectoryFile(e: MouseEvent) {
      let target = e.target as HTMLElement
      target = target.closest('.file') as HTMLElement

      const changePage = vuex.identifier.pages.find(
        (elem) => elem.imagePath === target.getAttribute('path')
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
      vuex.identifier.SET_SELECTED_PAGE_INDEX(selectedPageIndex)
    }

    function createFileTree(directory: DirType, parent: HTMLElement) {
      if (!parent) return
      if (directory.children.length === 0) {
        // File
        const childElement = document.createElement('div')
        childElement.classList.add('file')
        childElement.setAttribute(
          'path',
          parent.getAttribute('path') + '/' + directory.name
        )
        childElement.addEventListener('click', openDirectoryFile)
        const imgElement = document.createElement('img')
        imgElement.src = '/images/filegray.svg'
        imgElement.classList.add('down-img')
        const textElement = document.createElement('div')
        textElement.textContent = directory.name
        childElement.appendChild(imgElement)
        childElement.appendChild(textElement)
        parent.appendChild(childElement)
      } else {
        // Folder
        const folderWrapper = document.createElement('div')
        folderWrapper.classList.add('folder')
        if (parent.getAttribute('path')) {
          folderWrapper.setAttribute(
            'path',
            parent.getAttribute('path') + '/' + directory.name
          )
        } else {
          folderWrapper.setAttribute('path', directory.name)
        }
        const folderElement = document.createElement('div')
        folderElement.classList.add('folder-box')
        folderElement.addEventListener('click', foldDirectory)
        const imgElement = document.createElement('img')
        imgElement.src = '/images/rightarrow.svg'
        imgElement.classList.add('down-img')
        const textElement = document.createElement('div')
        textElement.textContent = directory.name
        folderElement.appendChild(imgElement)
        folderElement.appendChild(textElement)
        folderWrapper.appendChild(folderElement)
        parent.appendChild(folderWrapper)
        for (let i = 0; i < directory.children.length; i++) {
          createFileTree(directory.children[i], folderWrapper)
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
    margin-left: 13px;

    .folder-box {
      display: flex;
      flex-direction: row;
      margin: 2px 0;
      cursor: pointer;

      .down-img {
        margin-right: 10px;
        transform: rotate(90deg);
      }

      .arrow-spin {
        transform: rotate(0deg);
      }
    }

    .file {
      display: flex;
      flex-direction: row;
      padding-left: 13px;
      margin: 2px 0;

      .down-img {
        margin-right: 8px;
      }
    }

    .folder-display {
      display: none;
    }
  }

  .folder-display {
    display: none;
  }
}
</style>
