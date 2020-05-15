<template>
  <div ref="pagesRef" class="side-panel-pages">
    <img
      class="expand-icon"
      src="@/assets/images/expand.svg"
      @click="expandPages"
    />
    <div ref="gridRef" class="previews">
      <div
        v-for="(page, i) in store.identifier.pages"
        ref="imgRef"
        :key="i"
        class="image-wrapper"
      >
        <img id="page-img" :src="page.imageData" @mousedown="openPage" />
      </div>
    </div>
    <input
      id="side-panel-input-file"
      type="file"
      accept="image/*"
      @change="handleInputFileChange"
    />
    <label v-show="!expandState" class="add" for="side-panel-input-file"
      ><p>＋</p></label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useStore } from '@/modules/vue-hooks'

export default defineComponent({
  setup(...args) {
    const ctx = args[1]
    const store = useStore(ctx)

    const handleInputFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files && target.files.length > 0 && target.files[0]

      if (!file) {
        return
      }

      // Accept only image file
      if (!file.type.startsWith('image/')) {
        return
      }

      const reader = new FileReader()

      reader.onload = (e) => {
        const imageData = e.target?.result as string

        if (!imageData) {
          // Failed to read image
          return
        }

        store.identifier.addPage({
          imageData,
          identifiers: [],
        })
      }

      reader.readAsDataURL(file)
    }

    const pagesRef = ref<HTMLElement>(null)
    const expandState = ref(false)
    const pagesHeight = ref('')
    const gridRef = ref<HTMLElement>(null)
    const imgRef = ref<HTMLElement[]>([])

    function expandPages() {
      if (!pagesRef.value) return
      if (!gridRef.value) return
      if (!imgRef.value) return
      if (expandState.value) {
        pagesRef.value.style.right = '30px'
        pagesRef.value.style.bottom = '100px'
        pagesRef.value.style.width = '256px'
        pagesRef.value.style.height = pagesHeight.value
        gridRef.value.style.display = 'block'
        gridRef.value.style.maxHeight = '400px'
        for (const img of imgRef.value) {
          img.style.height = '130px'
        }
        expandState.value = false
      } else {
        pagesHeight.value = getComputedStyle(pagesRef.value).height
        pagesRef.value.style.width = '100%'
        pagesRef.value.style.height = '100vh'
        pagesRef.value.style.right = '0'
        pagesRef.value.style.bottom = '0'
        gridRef.value.style.display = 'grid'
        gridRef.value.style.height = '100%'
        gridRef.value.style.maxHeight = 'none'
        const gridRepeat = window.innerWidth / 400
        gridRef.value.style.gridTemplateColumns = `repeat(${parseInt(
          gridRepeat + ''
        )},400px)`
        gridRef.value.style.gridTemplateRows = '250px'
        for (const img of imgRef.value) {
          img.style.height = '250px'
        }
        expandState.value = true
      }
    }

    function openPage(e: MouseEvent, index: number) {
      e.preventDefault()
      const target = e.target as HTMLElement
      const previews = document.querySelector('.previews') as HTMLElement
      const image: NodeListOf<HTMLElement> = document.querySelectorAll(
        '#page-img'
      )
      const imageArr = Array.prototype.slice.call(image)
      let upEvent: (e: MouseEvent) => void
      previews.addEventListener(
        'mouseup',
        (upEvent = (evt) => {
          const evtTarget = evt.target as HTMLElement
          if (evtTarget.id === 'page-img' && evtTarget !== target) {
            const spliceIndex = imageArr.findIndex((elem) => elem === target)
            const targetIndex = imageArr.findIndex((elem) => elem === evtTarget)
            type spliceData = {
              spliceIndex: number
              targetIndex: number
            }
            const newData: spliceData = {
              spliceIndex,
              targetIndex,
            }
            store.identifier.movePage(newData)
          }
          previews.removeEventListener('mouseup', upEvent)
        })
      )
    }

    // TODO 페이지 삭제 구현하기

    return {
      store,
      handleInputFileChange,
      expandPages,
      openPage,
      pagesRef,
      gridRef,
      imgRef,
      expandState,
    }
  },
})
</script>

<style lang="scss">
.side-panel-pages {
  width: 256px;
  background-color: #fff;
  border: 1px solid #ababab;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 5000;

  .expand-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    padding: 5px;

    &:hover {
      background-color: #ebebeb;
      border-radius: 7px;
    }
  }

  #side-panel-input-file {
    position: fixed;
    left: -9999px;
    visibility: hidden;
  }

  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 20px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #f0f0f3;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }

  .previews {
    max-height: 400px;
    overflow: auto;
    margin: 30px 0 60px 0;
    padding: 0 20px;
    justify-content: center;
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    .image-wrapper {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 98%;
      height: 130px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      overflow: hidden;
      margin: 20px 0;

      img {
        width: 100%;
        height: 100%;
        user-select: none;
        object-fit: cover;
      }
    }
  }
}
</style>
