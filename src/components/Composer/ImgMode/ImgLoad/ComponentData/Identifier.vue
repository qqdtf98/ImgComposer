<template>
  <div @mousedown.stop @mousedown="createArrow($event, identifier)">
    <div
      v-if="identifier.state"
      :identifier="JSON.stringify(identifier)"
      class="left-top edge"
    ></div>
    <div
      v-if="identifier.state"
      :identifier="identifier"
      class="right-top edge"
    ></div>
    <div
      v-if="identifier.state"
      :identifier="identifier"
      class="left-bottom edge"
    ></div>
    <div
      v-if="identifier.state"
      :identifier="identifier"
      class="right-bottom edge"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import {
  IdentifierType,
  ArrowType,
  Arrows,
} from '@/interfaces/any-editor-file.ts'
import { useVuex } from '../../../../../modules/vue-hooks'

export default defineComponent({
  props: {
    identifier: Object,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const { identifier } = props as {
      identifier: IdentifierType
    }

    const arrowIndex = ref(0)

    type CreateArrow = {
      index: number
      compo: IdentifierType
      startX: number
      startY: number
    }

    function createArrow(e: MouseEvent, startCompo: IdentifierType) {
      const initX = e.clientX
      const initY = e.clientY
      const newArrow: CreateArrow = {
        index: arrowIndex.value,
        compo: startCompo,
        startX: initX,
        startY: initY,
      }
      const edges: NodeListOf<HTMLElement> = document.querySelectorAll('.edge')
      e.preventDefault()
      vuex.dataArrow.createArrow(newArrow)

      let moveEvent: (e: MouseEvent) => void
      let upEvent: (e: MouseEvent) => void

      window.addEventListener(
        'mousemove',
        (moveEvent = (evt: MouseEvent) => {
          const newArrows: Arrows = [...vuex.dataArrow.arrowData]
          const newArrow: ArrowType = { ...newArrows[arrowIndex.value] }
          newArrow.endX = evt.clientX
          newArrow.endY = evt.clientY
          newArrow.degree = parseInt(
            (Math.atan2(evt.clientY - initY, evt.clientX - initX) * 180) /
              Math.PI +
              ''
          )
          console.log(newArrow.degree)
          const updateArrow: UpdateArrow = {
            index: arrowIndex.value,
            arrow: newArrow,
          }
          vuex.dataArrow.updateArrow(updateArrow)

          window.addEventListener(
            'mouseup',
            (upEvent = (event: MouseEvent) => {
              if (
                vuex.dataArrow.arrowData[arrowIndex.value].startCompo !==
                props.identifier
              ) {
                const newArrows: Arrows = [...vuex.dataArrow.arrowData]
                const newArrow: ArrowType = { ...newArrows[arrowIndex.value] }
                newArrow.endCompo = props.identifier as IdentifierType
                newArrow.endX = event.clientX
                newArrow.endY = event.clientY
                // TODO end position도 셋팅하기
                const updateArrow: UpdateArrow = {
                  index: arrowIndex.value,
                  arrow: newArrow,
                }
                vuex.dataArrow.updateArrow(updateArrow)
                arrowIndex.value++
                console.log(vuex.dataArrow.arrowData)
              }
              window.removeEventListener('mousemove', moveEvent)
              window.removeEventListener('mouseup', upEvent)
            })
          )
        })
      )
    }

    type UpdateArrow = {
      index: number
      arrow: ArrowType
    }

    return {
      createArrow,
    }
  },
})
</script>

<style lang="scss" scoped>
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
  cursor: pointer;
}
.left-top {
  left: 0;
  top: 0;
}
.right-top {
  right: 0;
  top: 0;
}
.left-bottom {
  left: 0;
  bottom: 0;
}
.right-bottom {
  right: 0;
  bottom: 0;
}
</style>
