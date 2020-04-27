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
import { defineComponent, ref, Ref, reactive, set } from '@vue/composition-api'
import ComponentData from '@/components/Composer/ImgMode/ImgLoad/ComponentData/index.vue'
import { IdentifierType, Identifiers } from '@/interfaces/any-editor-file.ts'
import { VueColor } from '@/types/vue-color'
import { Chrome } from 'vue-color'
import { useNextTick } from '@/modules/vue-hooks'

export default defineComponent({
  components: { ComponentData, ChromeColor: Chrome },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)

    const imgLoadRef = ref<HTMLElement>(null)

    function inputChange(event: Event) {
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

    function drawSelector(e: MouseEvent) {
      const imgElm = document.querySelector('img')
      const imgSrc = imgElm?.src as string

      if (imgSrc.startsWith('http')) {
        return
      }

      const initX = e.clientX
      const initY = e.clientY

      identifierData.push({
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
      })

      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      const index = identifierData.length - 1

      window.addEventListener(
        'mousemove',
        (moveEvent = (evt: MouseEvent) => {
          const deltaX = evt.clientX - initX
          const deltaY = evt.clientY - initY

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
