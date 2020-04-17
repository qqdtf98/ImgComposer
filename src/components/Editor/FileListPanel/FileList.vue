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
          @contextmenu="openFileContext($event, file.fileId, file)"
        >
          <img class="project-icon" src="@/assets/images/fileIcon.svg" />
          <input
            :value="file.fileName"
            spellcheck="false"
            disabled
            @keyup.enter="setNewFileName"
          />
        </div>
      </div>
    </vue-custom-scrollbar>
    <FolderContext v-show="activateContext === 'folder'" ref="folderRef" />
    <FileContext
      v-show="activateContext === 'file'"
      ref="fileRef"
      :fileId="selectedFileId"
      :closeFileContext="closeFileContext"
      :fileElem="selectedFile"
      @enable-write="enableWrite"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  onMounted,
  ref,
  reactive,
} from '@vue/composition-api'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { useVuex } from '@/modules/vue-hooks'
import { Cem } from '@/modules/custom-events-manager'
import { File } from '@/interfaces/any-editor-file'
import { actionTree } from 'nuxt-typed-vuex'
import FolderContext from './FolderContext.vue'
import FileContext from './FileContext.vue'
import { VueComponent } from '@/types/vue-component'
import FileService from '../../../services/file-service'
import { Slider } from 'vue-color'

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

    type TitleValue = {
      name: string
      disabled: boolean
    }

    const titleValues: string[] = []

    const disabledValues = ref<boolean[]>([])

    const index = ref(0)

    watch(
      () => vuex.fileData.fileList,
      () => {
        let i
        const fileList = vuex.fileData.fileList

        for (i = 0; i < fileList.length; i++) {
          titleValues.push(`${fileList[i].fileName}.${fileList[i].fileType}`)
          disabledValues.value.push(true)
        }
      }
    )

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

    const selectedFileId = ref(0)
    const selectedFile = ref<HTMLInputElement>(null)
    const selectedFileElem = ref<File>(null)

    let clickedTarget: HTMLInputElement

    // open fileContext and set props by fileId
    function openFileContext(e: MouseEvent, fileId: number, file: File) {
      clickedTarget = e.target as HTMLInputElement
      activateContext.value = 'file'
      const File = fileRef.value?.$el as HTMLElement
      placeContext(File, e)
      selectedFileId.value = fileId
      selectedFile.value = e.target as HTMLInputElement
      index.value = fileId
      selectedFileElem.value = file
    }

    let blurEvent: () => void

    function enableWrite() {
      disabledValues.value[index.value] = false
      clickedTarget.disabled = false
      closeFileContext()
      clickedTarget.focus()
      clickedTarget.addEventListener(
        'blur',
        (blurEvent = () => {
          clickedTarget.disabled = true
          const title = selectedFile.value?.value as string
          if (!selectedFileElem.value) return

          // TODO folder_seq 저장해서 fileName 중복체크하기
          FileService.updateFileName(
            selectedFileElem.value,
            title,
            title?.split('.')[0]
          ).then((res) => {
            console.log(res)
          })
        })
      )
    }

    function setNewFileName() {
      clickedTarget.blur()
      clickedTarget.removeEventListener('blur', blurEvent)
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
      selectedFileId,
      titleValues,
      disabledValues,
      enableWrite,
      setNewFileName,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

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
        padding: 0.3rem 0.5rem;
        width: 100%;
        border-radius: 0.4rem;
        cursor: default;
        user-select: none;

        &:hover {
          background-color: #5858589d;
        }

        .project-icon {
          margin-right: 0.5rem;
        }

        .project-data {
          @include auto-text-color;
          width: 100%;
          cursor: default;
        }

        input {
          color: inherit;
          outline: none;
          flex: 1;
          user-select: none;
        }
      }
    }
  }
}
</style>
