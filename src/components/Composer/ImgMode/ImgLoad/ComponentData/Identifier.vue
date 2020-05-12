<template>
  <div>
    <div
      v-if="identifier.state"
      :identifier="JSON.stringify(identifier)"
      class="left-top edge"
      @mousedown.stop
      @mousedown="createArrow($event, identifier)"
      @mouseup="createEvent($event, identifier)"
    ></div>
    <div
      v-if="identifier.state"
      :identifier="identifier"
      class="right-top edge"
      @mousedown.stop
      @mousedown="createArrow($event, identifier)"
      @mouseup="createEvent($event, identifier)"
    ></div>
    <div
      v-if="identifier.state"
      :identifier="identifier"
      class="left-bottom edge"
      @mousedown.stop
      @mousedown="createArrow($event, identifier)"
      @mouseup="createEvent($event, identifier)"
    ></div>
    <div
      v-if="identifier.state"
      :identifier="identifier"
      class="right-bottom edge"
      @mousedown.stop
      @mousedown="createArrow($event, identifier)"
      @mouseup="createEvent($event, identifier)"
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

    const initX = ref(-1)
    const initY = ref(-1)

    const createState = ref(false)

    function createArrow(e: MouseEvent, startCompo: IdentifierType) {
      createState.value = true
      initX.value = e.clientX
      initY.value = e.clientY
      const newArrow: CreateArrow = {
        index: arrowIndex.value,
        compo: startCompo,
        startX: initX.value,
        startY: initY.value,
      }
      const edges: NodeListOf<HTMLElement> = document.querySelectorAll('.edge')
      e.preventDefault()
      vuex.dataArrow.createArrow(newArrow)
    }

    function createEvent(e: MouseEvent, endCompo: IdentifierType) {
      if (
        vuex.dataArrow.arrowData[arrowIndex.value].startCompo !== endCompo &&
        createState.value
      ) {
        const newArrows: Arrows = [...vuex.dataArrow.arrowData]
        const newArrow: ArrowType = { ...newArrows[arrowIndex.value] }
        newArrow.endCompo = props.identifier as IdentifierType
        newArrow.endX = e.clientX
        newArrow.endY = e.clientY
        newArrow.arrowState = true
        console.log(`nextX: ${e.clientX}, nextY: ${e.clientY}`)
        console.log(`initX: ${newArrow.startX}, initY: ${newArrow.startY}`)
        console.log(
          `dX: ${e.clientX - newArrow.startX}, dY: ${
            e.clientY - newArrow.startY
          }`
        )
        console.log(
          'degree' +
            (Math.atan2(
              e.clientY - newArrow.startY,
              e.clientX - newArrow.startX
            ) *
              180) /
              Math.PI
        )
        newArrow.degree =
          (Math.atan2(
            e.clientY - newArrow.startY,
            e.clientX - newArrow.startX
          ) *
            180) /
          Math.PI
        console.log(newArrow.degree)
        const updateArrow: UpdateArrow = {
          index: arrowIndex.value,
          arrow: newArrow,
        }
        vuex.dataArrow.updateArrow(updateArrow)
        console.log(
          parseInt(
            Math.abs(newArrow.endY - newArrow.startY) /
              Math.cos(newArrow.degree) +
              ''
          )
        )
        console.log(newArrow.degree)
        arrowIndex.value++
      }
      createState.value = false
    }

    type UpdateArrow = {
      index: number
      arrow: ArrowType
    }

    return {
      createArrow,
      createEvent,
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
