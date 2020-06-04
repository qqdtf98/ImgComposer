<template>
  <div id="img-load">
    <ViewHide v-show="vuex.identifier.fileState" />
    <ExpandPanel />
    <div ref="sampleRef" class="img-load-box" @mousedown="drawSelector">
      <div ref="imgLoadRef" class="preview-wrapper">
        <img id="preview" src width="700" />
      </div>
      <label v-show="isImgUnLoad" class="img-wrapper" for="getfile">
        <img class="img-load-icon" src="@/assets/images/img.svg" />
        <div class="img-load-text">Select an image</div>
      </label>
      <input
        id="getfile"
        ref="folderInput"
        type="file"
        mozdirectory
        msdirectory
        webkitdirectory
        odirectory
        directory
        multiple
        @change="onFolderSelected"
      />
      <div v-if="vuex.identifier.fileState">
        <ComponentData
          v-for="(id, i) in vuex.identifier.pages[
            vuex.identifier.selectedPageIndex
          ].identifiers"
          :key="i"
          :identifier="id"
          @set-color="setColor($event, i)"
          @activate-color="activateChromePicker($event, i)"
        />
        <CompoLink v-show="isCompoLink" />
        <div
          ref="pickerRef"
          class="chrome-wrapper"
          @mouseup="setPickerValue"
          @mousedown.stop
        >
          <chrome-color
            v-show="picker.isChromePicker"
            v-model="background.backgroundColor"
            class="picker compo-colorpicker"
            :value="background.backgroundColor"
            @input="getPickerValue"
          ></chrome-color>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  reactive,
  onMounted,
  provide,
} from '@vue/composition-api'
import ComponentData from '@/components/Composer/ImgMode/ImgLoad/ComponentData/index.vue'
import {
  Identifiers,
  IdentifierType,
  NewIden,
} from '@/interfaces/any-editor-file.ts'
import { VueColor } from '@/types/vue-color'
import { useNextTick, useVuex } from '@/modules/vue-hooks'
import { Chrome } from 'vue-color'
import CompoLink from '@/components/Composer/ImgMode/ImgLoad/CompoLink/index.vue'
import { Cem } from '@/modules/custom-events-manager'
import ViewHide from '../ViewHide.vue'
import ExpandPanel from '../ExpandPanel.vue'
import { settings } from 'cluster'
import pathListToTree from 'path-list-to-tree'
import { fileURLToPath } from 'url'

export default defineComponent({
  components: {
    ComponentData,
    ChromeColor: Chrome,
    CompoLink,
    ExpandPanel,
    ViewHide,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)
    const nextTick = useNextTick(ctx)
    const imgLoadRef = ref<HTMLElement>(null)

    const isImgUnLoad = ref(true)

    const sampleRef = ref() as Ref<HTMLElement>

    // Create a remove function and provide it to every child component
    // to make them available to remove identifier
    function removeIdentifier(index: number) {
      vuex.identifier.spliceIden(index)
    }

    provide('removeIdentifier', removeIdentifier)

    function drawSelector(e: MouseEvent) {
      if (!vuex.identifier.fileState) return
      const imgElm = document.querySelector('img')
      const imgSrc = imgElm?.src as string

      if (imgSrc.startsWith('http')) {
        return
      }

      const initX = e.clientX
      const initY = e.clientY

      type Pos = {
        initX: number
        initY: number
      }

      const pos: Pos = {
        initX,
        initY,
      }

      vuex.identifier.storeIden(pos)

      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      let index =
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers.length - 1

      window.addEventListener(
        'mousemove',
        (moveEvent = (evt: MouseEvent) => {
          const deltaX = evt.clientX - initX
          const deltaY = evt.clientY - initY

          // When the empty component name identifier has been removed
          // shift index to correctly target the current identifier
          const page =
            vuex.identifier.pages[
              (vuex.identifier.selectedPageIndex as number) as number
            ].identifiers
          if (!page[index]) {
            index -= 1
          }

          // vuex의 pages[vuex.identifier.selectedPageIndex as number].identifiers를 복사하여 새로운 값으로 셋팅
          const newIdentifiers: Identifiers = [
            ...vuex.identifier.pages[
              (vuex.identifier.selectedPageIndex as number) as number
            ].identifiers,
          ]

          const newIden: IdentifierType = { ...newIdentifiers[index] }

          newIden.left = initX + (deltaX < 0 ? deltaX : 0)
          newIden.top = initY + (deltaY < 0 ? deltaY : 0)
          newIden.width = Math.abs(deltaX)
          newIden.height = Math.abs(deltaY)

          const newData: NewIden = {
            index,
            identifier: newIden,
          }

          vuex.identifier.updateIden(newData)
        })
      )
      window.addEventListener(
        'mouseup',
        (upEvent = () => {
          window.removeEventListener('mousemove', moveEvent)
          window.removeEventListener('mouseup', upEvent)

          if (
            !vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
              .identifiers[index]
          ) {
            index -= 1
          }

          const idnf =
            vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
              .identifiers[index]

          if (!idnf) return

          // If the drawn area is smaller than threshold, remove it
          const creationSizeThreshold = 15

          if (
            idnf.width < creationSizeThreshold ||
            idnf.height < creationSizeThreshold
          ) {
            vuex.identifier.spliceIden(index)
            return
          }

          if (!imgLoadRef.value) return

          const imgRect = imgLoadRef.value.getBoundingClientRect()

          // vuex의 pages[vuex.identifier.selectedPageIndex as number].identifiers를 복사하여 새로운 값으로 셋팅
          const newIdentifiers: Identifiers = [
            ...vuex.identifier.pages[
              vuex.identifier.selectedPageIndex as number
            ].identifiers,
          ]

          const newIden: IdentifierType = { ...newIdentifiers[index] }

          newIden.calLeft = newIden.left / imgRect.left
          newIden.calTop = newIden.top / imgRect.top
          newIden.calWidth = newIden.width / imgRect.width
          newIden.calHeight = newIden.height / imgRect.height
          newIden.state = true

          const newData: NewIden = {
            index,
            identifier: newIden,
          }

          vuex.identifier.updateIden(newData)
        })
      )
    }

    const picker = reactive({
      isChromePicker: false,
    })

    const background = reactive({
      backgroundColor: '#000',
    })

    function getPickerValue(color: VueColor) {
      setPickerValue(color.hex)
    }

    const pickerRef = ref<HTMLElement>(null)

    const compoIndex = ref(-1)

    function setPickerValue(color: string) {
      const chromePicker = document.querySelectorAll(
        '.compo-picker'
      ) as NodeListOf<HTMLElement>
      const compoName = document.querySelectorAll('.compo-name') as NodeListOf<
        HTMLInputElement
      >

      if (!chromePicker) return

      if (!compoName) return
      chromePicker[compoIndex.value].style.backgroundImage = 'none'
      console.log(color)
      chromePicker[compoIndex.value].style.backgroundColor = color
      compoName[compoIndex.value].style.color = color
      if (
        !vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers[compoIndex.value]
      )
        return

      // vuex의 pages[vuex.identifier.selectedPageIndex as number].identifiers를 복사하여 새로운 값으로 셋팅
      const newIdentifiers: Identifiers = [
        ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers,
      ]

      const newIden: IdentifierType = { ...newIdentifiers[compoIndex.value] }

      newIden.color = color

      const newData: NewIden = {
        index: compoIndex.value,
        identifier: newIden,
      }

      vuex.identifier.updateIden(newData)
    }

    function activateChromePicker(state: boolean, index: number) {
      if (!pickerRef.value) return
      picker.isChromePicker = state
      compoIndex.value = index
      const inputList = document.querySelectorAll(
        '.component-basic-data'
      ) as NodeListOf<HTMLElement>
      pickerRef.value.style.left =
        inputList[index].getBoundingClientRect().left + 'px'
      pickerRef.value.style.top =
        inputList[index].getBoundingClientRect().top +
        inputList[index].getBoundingClientRect().height +
        'px'
    }

    const isCompoLink = ref(false)

    type dataType = {
      key: string
      value: string
    }

    type linkType = {
      url: string
      queries: dataType[]
      params: dataType[]
    }

    onMounted(() => {
      Cem.addEventListener(
        'activateLink',
        sampleRef.value as HTMLElement,
        (e) => {
          isCompoLink.value = true
          compoIndex.value = e.detail
        }
      )
      Cem.addEventListener(
        'deactivateLink',
        sampleRef.value as HTMLElement,
        (e) => {
          isCompoLink.value = false

          // vuex의 pages[vuex.identifier.selectedPageIndex as number].identifiers를 복사하여 새로운 값으로 셋팅
          const newIdentifiers: Identifiers = [
            ...vuex.identifier.pages[
              vuex.identifier.selectedPageIndex as number
            ].identifiers,
          ]

          const newIden: IdentifierType = {
            ...newIdentifiers[compoIndex.value],
          }

          newIden.url = e.detail.url
          newIden.queries = e.detail.queries
          newIden.params = e.detail.params

          const newData: NewIden = {
            index: compoIndex.value,
            identifier: newIden,
          }

          vuex.identifier.updateIden(newData)
        }
      )
    })

    const firstImage = ref(true)

    const fileArray: string[] = []

    /**
     * FileReader를 사용하여 첫번째 이미지를 띄우며 vuex의 identifier에 imageData와 imagePath를 저장합니다.
     */
    function processFile(file: File) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (firstImage.value) {
            const preview = document.querySelector(
              '#preview'
            ) as HTMLImageElement
            preview.style.height = '100%'
            preview.style.width = '100%'
            preview.src = reader.result as string
            isImgUnLoad.value = false
            firstImage.value = false
            vuex.identifier.SET_SELECTED_PAGE_INDEX(0)
            vuex.identifier.SET_FILE_STATE(true)
            ctx.emit('img-load')
          }

          vuex.identifier.addPage({
            imageData: reader.result as string,
            imagePath: file.webkitRelativePath,
            identifiers: [],
          })
          vuex.identifier.SET_SELECTED_PAGE_INDEX(0)
          fileArray.push(file.webkitRelativePath)
          resolve()
        }
        reader.readAsDataURL(file)
      })
    }

    async function onFolderSelected(e: InputEvent) {
      const target = e.target as HTMLInputElement
      if (!target.files) return

      let i
      for (i = 0; i < target.files.length; i++) {
        await processFile(target.files[i])
      }

      const rootDirectory = pathListToTree(fileArray)[0]
      vuex.folderDirectory.SET_ROOT_TITLE(rootDirectory.name)
      vuex.folderDirectory.SET_DIRECTORY(rootDirectory)
      vuex.folderDirectory.SET_CURRENT_LIST(rootDirectory.children)
    }

    return {
      sampleRef,
      imgLoadRef,
      drawSelector,
      picker,
      background,
      getPickerValue,
      setPickerValue,
      activateChromePicker,
      pickerRef,
      isCompoLink,
      isImgUnLoad,
      vuex,
      onFolderSelected,
    }
  },
})
</script>

<style lang="scss">
#img-load {
  position: relative;
  left: 300px;
  width: calc(100% - 300px);

  .img-load-box {
    .preview-wrapper {
      user-select: none;
      pointer-events: none;
      display: flex;
    }

    .img-wrapper {
      position: fixed;
      z-index: 500;
      top: 50%;
      left: calc(150px + 50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 13rem;
      height: 9rem;
      transform: translateX(-50%) translateY(-50%);
      cursor: pointer;

      .img-load-icon {
        height: 4rem;
        width: 6rem;
      }

      .img-load-text {
        font-size: 18px;
        margin: 0.4rem;
      }
    }

    #getfile {
      position: fixed;
      left: -9999px;
      transform: translateX(-50%) translateY(-50%);
      visibility: hidden;
    }
    .chrome-wrapper {
      position: fixed;
      .compo-colorpicker {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
