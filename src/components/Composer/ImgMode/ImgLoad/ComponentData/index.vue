<template>
  <div class="component-data-box">
    <div
      v-show="identifier.compoView"
      class="identifier-wrapper"
      :style="{
        left: identifier.left + 'px',
        top: identifier.top + 'px',
      }"
    >
      <img
        v-if="identifier.state"
        class="delete-identifier"
        src="@/assets/images/delete.svg"
        @click="deleteIdentifier"
        @mousedown.stop
      />
      <img
        v-if="identifier.state"
        class="move-identifier"
        src="@/assets/images/moveicon.svg"
        @mousedown="moveIdentifier"
        @mousedown.stop
      />
      <div
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + 'px',
          height: identifier.height + 'px',
        }"
        class="border-left"
        @mousedown="resizeIdentifier"
        @mousedown.stop
      ></div>
      <div
        class="border-right"
        :style="{
          left: identifier.left + identifier.width - 8 + 'px',
          top: identifier.top + 'px',
          height: identifier.height + 'px',
        }"
        @mousedown="resizeIdentifier"
        @mousedown.stop
      ></div>
      <div
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + 'px',
          width: identifier.width + 'px',
        }"
        class="border-top"
        @mousedown="resizeIdentifier"
        @mousedown.stop
      ></div>
      <div
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + identifier.height - 8 + 'px',
          width: identifier.width + 'px',
        }"
        class="border-bottom"
        @mousedown="resizeIdentifier"
        @mousedown.stop
      ></div>
      <Identifier
        class="component-identifier"
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + 'px',
          width: identifier.width + 'px',
          height: identifier.height + 'px',
          border: `2px solid ${identifier.color}`,
          backgroundColor: identifier.color + '38',
        }"
        :identifier="identifier"
      />
      <IdData
        v-if="identifier.state"
        class="component-data"
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + identifier.height + 'px',
        }"
        @set-color="setColor"
        @activate-color="activateColor"
        :identifier="identifier"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { IdentifierType, NewIden } from '@/interfaces/any-editor-file.ts'
import IdData from '@/components/Composer/ImgMode/ImgLoad/ComponentData/IdData/index.vue'
import Identifier from '@/components/Composer/ImgMode/ImgLoad/ComponentData/Identifier.vue'
import { useVuex } from '../../../../../modules/vue-hooks'

export default defineComponent({
  components: { Identifier, IdData },
  props: {
    identifier: Object,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const { identifier } = props as {
      identifier: IdentifierType
    }
    provide('identifierIndex', identifier.index)

    function setColor(color: string) {
      ctx.emit('set-color', color)
    }

    function activateColor(state: boolean) {
      ctx.emit('activate-color', state)
    }

    function deleteIdentifier() {
      const identifiers =
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers
      const deleteIndex = identifiers.findIndex(
        (elem) => elem.index === identifier.index
      )
      // TODO identifier 삭제하면 data transfer의 해당 pair 찾아서 삭제하기

      vuex.identifier.spliceIden(deleteIndex)
    }

    function moveIdentifier(e: MouseEvent) {
      e.preventDefault()
      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      const identifiers =
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers
      const moveIndex = identifiers.findIndex(
        (elem) => elem.index === identifier.index
      )
      const iden = { ...identifiers[moveIndex] }

      const initX = e.clientX - iden.left
      const initY = e.clientY - iden.top

      window.addEventListener(
        'mousemove',
        (moveEvent = (e) => {
          const moveIden = { ...identifiers[moveIndex] }
          moveIden.left = e.clientX - initX
          moveIden.top = e.clientY - initY
          const newIden: NewIden = {
            index: moveIndex,
            identifier: moveIden,
          }

          vuex.identifier.updateIden(newIden)

          window.addEventListener(
            'mouseup',
            (upEvent = (e) => {
              window.removeEventListener('mousemove', moveEvent)
              window.removeEventListener('mouseup', upEvent)
            })
          )
        })
      )
    }

    function resizeIdentifier(e: MouseEvent) {
      const target = e.target as HTMLElement
      const direction = target.className.split('-')[1]
      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      window.addEventListener(
        'mousemove',
        (moveEvent = (e) => {
          const identifiers =
            vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
              .identifiers
          const resizeIndex = identifiers.findIndex(
            (elem) => elem.index === identifier.index
          )
          const resizeIden = { ...identifiers[resizeIndex] }

          if (direction === 'right') {
            resizeIden.width = e.clientX - resizeIden.left
          } else if (direction === 'bottom') {
            resizeIden.height = e.clientY - resizeIden.top
          } else if (direction === 'left') {
            resizeIden.width = resizeIden.left - e.clientX + resizeIden.width
            resizeIden.left = e.clientX
          } else if (direction === 'top') {
            resizeIden.height = resizeIden.top - e.clientY + resizeIden.height
            resizeIden.top = e.clientY
          }

          const newIden = {
            index: resizeIndex,
            identifier: resizeIden,
          }
          vuex.identifier.updateIden(newIden)

          window.addEventListener(
            'mouseup',
            (upEvent = (e) => {
              window.removeEventListener('mousemove', moveEvent)
              window.removeEventListener('mouseup', upEvent)
            })
          )
        })
      )
    }

    return {
      setColor,
      activateColor,
      deleteIdentifier,
      vuex,
      moveIdentifier,
      resizeIdentifier,
    }
  },
})
</script>

<style lang="scss">
.component-data-box {
  .identifier-wrapper {
    position: fixed;

    .delete-identifier,
    .move-identifier {
      position: absolute;
      z-index: 5;
      top: -2px;
      width: 19px;
      cursor: pointer;
    }

    .move-identifier {
      width: 17px;
      left: 20px;
      user-select: none;
    }

    .border-top,
    .border-bottom,
    .border-left,
    .border-right {
      position: fixed;
      height: 8px;
      z-index: 1;
      background-color: yellowgreen;
      cursor: ns-resize;
      opacity: 0;
    }
    .border-left,
    .border-right {
      position: fixed;
      width: 8px;
      background-color: yellowgreen;
      cursor: ew-resize;
    }

    .component-identifier {
      border: 2px solid black;
      position: fixed;
      background-color: #00000066;
      border-radius: 0.4rem;
    }

    .component-data {
      position: fixed;
    }

    .left-top,
    .right-top,
    .left-bottom,
    .right-bottom {
      position: absolute;
      width: 0.7rem;
      height: 0.7rem;
      background-color: black;
      border-radius: 2px;
      transform: translateX(-50%) translateY(-50%);
    }
    .left-top {
      left: 0;
      top: 0;
      transform: translateX(-50%) translateY(-50%);
    }
    .right-top {
      right: 0;
      top: 0;
      transform: translateX(50%) translateY(-50%);
    }
    .left-bottom {
      left: 0;
      bottom: 0;
      transform: translateX(-50%) translateY(50%);
    }
    .right-bottom {
      right: 0;
      bottom: 0;
      transform: translateX(50%) translateY(50%);
    }
  }
}
</style>
