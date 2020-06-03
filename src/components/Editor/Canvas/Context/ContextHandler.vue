<template>
  <div id="context-handler">
    <div class="context-arrow"></div>
    <div class="context-handle">
      <div class="handle-list-revise" @click="reviseSelectorName">수정</div>
      <div class="handle-list-delete" @click="deleteSelector">삭제</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'

export default defineComponent({
  props: {
    selectorTarget: HTMLElement,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    watch(
      () => props.selectorTarget,
      () => {
        console.log(props.selectorTarget)
      }
    )

    function reviseSelectorName() {}

    function deleteSelector() {
      const selectorTarget = props.selectorTarget
      if (!selectorTarget) return
      const selectorText = selectorTarget.textContent as string

      if (selectorText.includes('.')) {
        vuex.styleData.target?.classList.remove(
          selectorText.trim().replace('.', '')
        )
      } else {
        if (!vuex.styleData.target) return
        vuex.styleData.target.id = ''
      }

      vuex.fileData.removeSelectorValue()
    }

    return {
      reviseSelectorName,
      deleteSelector,
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

  .context-arrow {
    background-color: rgba(58, 58, 60, 0.8);
    width: 0.8rem;
    height: 0.8rem;
    transform: rotate(45deg);
    position: absolute;
    top: 10px;
    // right: 0.5rem;
  }

  .context-handle {
    display: flex;
    flex-direction: column;
    background-color: rgba(58, 58, 60);
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
      color: #4b79ff;

      &:hover {
        background-color: #000;
        cursor: pointer;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }
    }

    .handle-list-delete {
      color: #e85454;
      border-top: 1px solid black;

      &:hover {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
}
</style>
