<template>
  <div>
    <div ref="sampleRef" @mousedown="drawSelector">
      <div
        ref="imgLoadRef"
        style="
          border: 1px solid black;
          width: 1000px;
          height: 700px;
          user-select: none;
          pointer-events: none;
        "
      >
        <img
          id="preview"
          src
          width="700"
          alt="로컬에 있는 이미지가 보여지는 영역"
        />
      </div>
    </div>
    <input id="getfile" type="file" accept="image/*" @change="inputChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api'

export default defineComponent({
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

    function drawSelector(e: MouseEvent) {
      const imgElm = document.querySelector('img')
      const imgSrc = imgElm?.src as string

      if (imgSrc.startsWith('http')) {
        return
      }

      const selector = document.createElement('div')
      const initX = e.clientX
      const initY = e.clientY

      selector.style.border = '2px solid black'
      selector.style.position = 'fixed'
      selector.style.left = initX + 'px'
      selector.style.top = initY + 'px'
      selector.style.width = '1px'
      selector.style.height = '1px'
      selector.style.backgroundColor = '#00000066'
      selector.style.borderRadius = '0.4rem'
      selector.classList.add('component-selector')

      sampleRef.value.appendChild(selector)
      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void
      window.addEventListener(
        'mousemove',
        (moveEvent = (evt: MouseEvent) => {
          const deltaX = evt.clientX - initX
          const deltaY = evt.clientY - initY

          selector.style.left = initX + (deltaX < 0 ? deltaX : 0) + 'px'
          selector.style.width = Math.abs(deltaX) + 'px'
          selector.style.top = initY + (deltaY < 0 ? deltaY : 0) + 'px'
          selector.style.height = Math.abs(deltaY) + 'px'
        })
      )
      window.addEventListener(
        'mouseup',
        (upEvent = () => {
          window.removeEventListener('mousemove', moveEvent)
          window.removeEventListener('mouseup', upEvent)

          if (!imgLoadRef.value) return
          const selectorRect = selector.getBoundingClientRect()
          const imgRect = imgLoadRef.value.getBoundingClientRect()
          const calWidth = selectorRect.width / imgRect.width
          const calHeight = selectorRect.height / imgRect.height
          const calLeft = selectorRect.left / imgRect.width
          const calTop = selectorRect.top / imgRect.height

          console.log(calWidth)
          console.log(calHeight)
          console.log(calLeft)
          console.log(calTop)
        })
      )
    }

    return {
      inputChange,
      sampleRef,
      imgLoadRef,
      drawSelector,
    }
  },
})
</script>
