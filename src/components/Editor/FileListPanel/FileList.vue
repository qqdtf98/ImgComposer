<template>
  <div id="file-list">
    <div class="file-path">
      Root >
    </div>

    <vue-custom-scrollbar class="file-scroll-area">
      <div
        class="project-data-list"
        @contextmenu="openFolderContext"
        @click="closeFileContext"
      >
        <div
          v-for="(file, i) in vuex.fileData.fileList"
          :key="i"
          class="project-data-wrapper"
          @dblclick="loadFile($event, file)"
          @contextmenu="openFileContext($event, file.fileId)"
        >
          <img class="project-icon" src="@/assets/images/fileIcon.svg" />
          <div class="project-data">
            {{ `${file.fileName}.${file.fileType}` }}
          </div>
        </div>
      </div>
    </vue-custom-scrollbar>
    <FolderContext v-show="activateContext === 'folder'" ref="folderRef" />
    <FileContext
      v-show="activateContext === 'file'"
      ref="fileRef"
      :fileId="selectedFile"
      :closeFileContext="closeFileContext"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, ref } from '@vue/composition-api'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { useVuex } from '@/modules/vue-hooks'
import { Cem } from '@/modules/custom-events-manager'
import { File } from '@/interfaces/any-editor-file'
import { actionTree } from 'nuxt-typed-vuex'
import FolderContext from './FolderContext.vue'
import FileContext from './FileContext.vue'
import { VueComponent } from '@/types/vue-component'

export default defineComponent({
  components: { vueCustomScrollbar, FolderContext, FileContext },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    function loadFile(e: MouseEvent, selectedFile: File) {
      vuex.fileData.SET_SELECTED_FILE(selectedFile)
    }

    onMounted(() => {
      window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
      })
    })

    const activateContext = ref('')

    const folderRef = ref<VueComponent>(null)

    const fileRef = ref<VueComponent>(null)

    // calculate Context position
    function placeContext(elem: HTMLElement, e: MouseEvent) {
      if (
        e.clientX + elem.getBoundingClientRect().width > window.innerWidth &&
        e.clientY + elem.getBoundingClientRect().height < window.innerHeight
      ) {
        elem.style.left =
          window.innerWidth - elem.getBoundingClientRect().width + 'px'
        elem.style.top = e.clientY + 'px'
      } else if (
        e.clientX + elem.getBoundingClientRect().width < window.innerWidth &&
        e.clientY + elem.getBoundingClientRect().height > window.innerHeight
      ) {
        elem.style.left = e.clientX + 'px'
        elem.style.top =
          window.innerHeight - elem.getBoundingClientRect().height + 'px'
      } else if (
        e.clientX + elem.getBoundingClientRect().width > window.innerWidth &&
        e.clientY + elem.getBoundingClientRect().height > window.innerHeight
      ) {
        elem.style.left =
          window.innerWidth - elem.getBoundingClientRect().width + 'px'
        elem.style.top =
          window.innerHeight - elem.getBoundingClientRect().height + 'px'
      } else {
        elem.style.left = e.clientX + 'px'
        elem.style.top = e.clientY + 'px'
      }
    }

    const selectedFile = ref(0)

    // open fileContext and set props by fileId
    function openFileContext(e: MouseEvent, fileId: number) {
      activateContext.value = 'file'
      const File = fileRef.value?.$el as HTMLElement
      placeContext(File, e)
      selectedFile.value = fileId
    }

    // open FolderContext
    function openFolderContext(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.className === 'project-data-list') {
        activateContext.value = 'folder'
        const Folder = folderRef.value?.$el as HTMLElement
        placeContext(Folder, e)
      }
    }

    // close Context
    function closeFileContext() {
      if (
        activateContext.value === 'folder' ||
        activateContext.value === 'file'
      ) {
        activateContext.value = 'false'
      }
    }

    return {
      vuex,
      loadFile,
      openFileContext,
      activateContext,
      folderRef,
      fileRef,
      closeFileContext,
      selectedFile,
      openFolderContext,
    }
  },
})
</script>

<style lang="scss">
#file-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 45px;
  padding-bottom: 1rem;

  .file-path {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    background-color: #4d4d4d;
    padding: 0.3rem;
    padding-right: 0.45rem;
    padding-left: 0.45rem;
    width: 85%;
    border-radius: 0.3rem;
    font-size: 0.95rem;
  }

  .file-scroll-area {
    padding: 0 15px;
    width: 100%;
    height: 200px;
    .project-data-list {
      width: 95%;
      padding-bottom: 2rem;

      .project-data-wrapper {
        display: flex;
        flex-direction: row;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        padding-left: 0.4rem;
        width: 100%;
        border-radius: 0.4rem;
        cursor: pointer;
        user-select: none;
        &:hover {
          background-color: #5858589d;
        }

        .project-icon {
          margin-right: 0.5rem;
        }

        .project-data {
          width: 100%;
        }
      }
    }
  }
}
</style>
