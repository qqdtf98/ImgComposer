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
      <div
        v-for="(id, i) in identifierData"
        :key="i"
        class="identifier-wrapper"
        :style="{
          left: id.left + 'px',
          top: id.top + 'px',
        }"
      >
        <Identifier
          class="component-identifier"
          :style="{
            left: id.left + 'px',
            top: id.top + 'px',
            width: id.width + 'px',
            height: id.height + 'px',
            border: `2px solid ${id.color}`,
          }"
        />
        <IdData
          v-show="id.state"
          class="component-data"
          :style="{ left: id.left + 'px', top: id.top + id.height + 'px' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from '@vue/composition-api'
import Identifier from '@/components/Composer/ImgMode/Identifier.vue'
import IdData from '@/components/Composer/ImgMode/IdData/index.vue'

export default defineComponent({
  components: { Identifier, IdData },
  setup() {
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

    type IdentifierType = {
      left: number
      top: number
      width: number
      height: number
      color: string
      calWidth: number
      calHeight: number
      calLeft: number
      calTop: number
      state: boolean
    }
    type Identifiers = IdentifierType[]

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

    return {
      inputChange,
      sampleRef,
      imgLoadRef,
      drawSelector,
      identifierData,
    }
  },
})
</script>

<style lang="scss">
#img-load {
  width: 100%;
  height: calc(100vh - 56px);
  .img-load-box {
    width: 100%;
    height: 100%;
    .preview-wrapper {
      width: 100%;
      height: 100%;
      border: 1px solid black;
      user-select: none;
      pointer-events: none;
    }
    #getfile {
      position: fixed;
      top: 50%;
      left: 50%;
    }
    .identifier-wrapper {
      position: fixed;

      .component-identifier {
        border: 2px solid black;
        position: fixed;
        background-color: #00000066;
        border-radius: 0.4rem;
      }
      .component-data {
        position: fixed;
      }
    }
  }
}
</style>
