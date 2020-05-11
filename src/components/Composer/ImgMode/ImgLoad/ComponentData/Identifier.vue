<template>
  <div
    @mousedown.stop
    @mousedown="createArrow($event, identifier)"
    @mouseup="createEvent($event, identifier)"
  >
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
import { IdentifierType } from '@/interfaces/any-editor-file.ts'
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

    function createArrow(e: MouseEvent, startCompo: IdentifierType) {
      const edges: NodeListOf<HTMLElement> = document.querySelectorAll('.edge')
      e.preventDefault()
      vuex.dataArrow.createArrow(startCompo)
    }

    type UpdateArrow = {
      index: number
      compo: IdentifierType
    }

    function createEvent(e: MouseEvent, endCompo: IdentifierType) {
      if (vuex.dataArrow.arrowData[arrowIndex.value].startCompo !== endCompo) {
        const newData: UpdateArrow = {
          index: arrowIndex.value,
          compo: endCompo,
        }
        vuex.dataArrow.updateArrow(newData)
        arrowIndex.value++
        console.log(vuex.dataArrow.arrowData)
      }
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
