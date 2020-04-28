<template>
  <div id="img-load">
    <div ref="sampleRef" class="img-load-box" @mousedown="drawSelector">
      <div ref="imgLoadRef" class="preview-wrapper">
        <img
          id="preview"
          src
          width="700"
          alt="로컬에 있는 이미지가 보여지는 영역"
        />
      </div>
      <input id="getfile" type="file" accept="image/*" @change="inputChange" />
      <ComponentData
        v-for="(id, i) in identifierData"
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
import { Identifiers } from '@/interfaces/any-editor-file.ts'
import { VueColor } from '@/types/vue-color'
import { useNextTick } from '@/modules/vue-hooks'
import { Chrome } from 'vue-color'
import CompoLink from '@/components/Composer/ImgMode/ImgLoad/CompoLink/index.vue'
import { Cem } from '@/modules/custom-events-manager'

export default defineComponent({
  components: { ComponentData, ChromeColor: Chrome, CompoLink },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)

    const imgLoadRef = ref<HTMLElement>(null)

    function inputChange() {
      const file = document.querySelector('#getfile') as HTMLInputElement
      const fileList = file?.files
      const fileReader: FileReader = new FileReader()
      if (!fileList) return
      fileReader.readAsDataURL(fileList[0])
      fileReader.onload = function () {
        const preview = document.querySelector('#preview') as HTMLImageElement
        preview.style.height = '100%'
        preview.style.width = '100%'
        preview.src = fileReader.result as string
      }
    }

    const sampleRef = ref() as Ref<HTMLElement>

    const identifierData = reactive<Identifiers>([])

    // Create a remove function and provide it to every child component
    // to make them available to remove identifier
    function removeIdentifier(index: number) {
      identifierData.splice(index, 1)
    }

    provide('removeIdentifier', removeIdentifier)

    function drawSelector(e: MouseEvent) {
      const imgElm = document.querySelector('img')
      const imgSrc = imgElm?.src as string

      if (imgSrc.startsWith('http')) {
        return
      }

      const initX = e.clientX
      const initY = e.clientY

      identifierData.push({
        index: identifierData.length,
        left: initX,
        top: initY,
        width: 0,
        height: 0,
        color: 'black',
        calWidth: 0,
        calHeight: 0,
        calLeft: 0,
        calTop: 0,
        state: false,
        url: null,
        queries: null,
        params: null,
      })

      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      let index = identifierData.length - 1

      window.addEventListener(
        'mousemove',
        (moveEvent = (evt: MouseEvent) => {
          const deltaX = evt.clientX - initX
          const deltaY = evt.clientY - initY

          // When the empty component name identifier has been removed
          // shift index to correctly target the current identifier
          if (!identifierData[index]) {
            index -= 1
          }

          identifierData[index].left = initX + (deltaX < 0 ? deltaX : 0)
          identifierData[index].top = initY + (deltaY < 0 ? deltaY : 0)
          identifierData[index].width = Math.abs(deltaX)
          identifierData[index].height = Math.abs(deltaY)
        })
      )
      window.addEventListener(
        'mouseup',
        (upEvent = () => {
          window.removeEventListener('mousemove', moveEvent)
          window.removeEventListener('mouseup', upEvent)

          if (!identifierData[index]) {
            index -= 1
          }

          const idnf = identifierData[index]

          if (!idnf) return

          // If the drawn area is smaller than threshold, remove it
          const creationSizeThreshold = 15

          if (
            idnf.width < creationSizeThreshold ||
            idnf.height < creationSizeThreshold
          ) {
            identifierData.splice(index, 1)
            return
          }

          if (!imgLoadRef.value) return

          const imgRect = imgLoadRef.value.getBoundingClientRect()

          identifierData[index].calLeft =
            identifierData[index].left / imgRect.left
          identifierData[index].calTop = identifierData[index].top / imgRect.top
          identifierData[index].calWidth =
            identifierData[index].width / imgRect.width
          identifierData[index].calHeight =
            identifierData[index].height / imgRect.height
          identifierData[index].state = true
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
      const compoName = document.querySelectorAll(
        '.component-name'
      ) as NodeListOf<HTMLInputElement>

      if (!chromePicker) return

      if (!compoName) return
      chromePicker[compoIndex.value].style.backgroundImage = 'none'
      chromePicker[compoIndex.value].style.backgroundColor = color
      compoName[compoIndex.value].style.color = color
      if (!identifierData[compoIndex.value]) return
      identifierData[compoIndex.value].color = color
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
          console.log(e.detail)
          identifierData[compoIndex.value].url = e.detail.url
          identifierData[compoIndex.value].queries = e.detail.queries
          identifierData[compoIndex.value].params = e.detail.params
          console.log(identifierData[compoIndex.value])
        }
      )
    })

    return {
      inputChange,
      sampleRef,
      imgLoadRef,
      drawSelector,
      identifierData,
      picker,
      background,
      getPickerValue,
      setPickerValue,
      activateChromePicker,
      pickerRef,
      isCompoLink,
    }
  },
})
</script>

<style lang="scss">
#img-load {
  .img-load-box {
    .preview-wrapper {
      border: 1px solid black;
      user-select: none;
      pointer-events: none;
      display: flex;
    }

    #getfile {
      position: fixed;
      top: 50%;
      left: 50%;
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
