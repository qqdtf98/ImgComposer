<template>
  <div
    v-show="vuex.handlerData.handlerTarget"
    id="context-handler"
    :style="{
      left: vuex.handlerData.handlerPosX + 5 + 'px',
      top: vuex.handlerData.handlerPosY + 55 + 'px',
    }"
  >
    <div class="context-handle">
      <div class="handle-list-revise">수정</div>
      <div class="handle-list-delete" @click="deleteElement">삭제</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    function deleteElement() {
      const deleteTarget = vuex.handlerData.handlerTarget as HTMLElement
      deleteTarget.parentElement.removeChild(deleteTarget)
      // TODO 코드에서 삭제
      vuex.handlerData.SET_HANDLER_TARGET(null)
    }

    return {
      vuex,
      deleteElement,
    }
  },
})
</script>

<style lang="scss">
#context-handler {
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 65px;

  .context-handle {
    display: flex;
    flex-direction: column;
    background-color: #a0a0a0;
    border-radius: 0.5rem;
    position: absolute;
    right: 0;
    width: 60px;
    text-align: center;
    top: -10px;

    .handle-list-revise,
    .handle-list-delete {
      padding: 0.25rem 0.5rem;
      font-size: 0.85rem;
      color: #2450d0;

      &:hover {
        background-color: #838383;
        cursor: pointer;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }
    }

    .handle-list-delete {
      color: #ca3535;
      border-top: 1px solid black;

      &:hover {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
}
</style>
