<template>
  <div id="components-panel">
    <h1>Components</h1>
    <div class="component-list">
      <div
        v-for="(iden, i) in vuex.identifier.identifierData"
        :key="i"
        class="color-name-select"
        :style="{
          width: iden.nameWidth + 40 + 'px',
        }"
      >
        <button
          class="chrome-picker"
          :style="{
            backgroundImage: 'none',
            backgroundColor: iden.color,
          }"
        />
        <div
          ref="nameRef"
          class="component-name"
          type="text"
          :style="{
            width: iden.nameWidth + 'px',
            color: iden.color,
          }"
        >
          {{ iden.compoName }}
        </div>
        <div id="hide-compo" ref="hideRef"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const nameRef = ref<HTMLElement>(null)
    const hideRef = ref<HTMLElement>(null)

    // watch(
    //   () => vuex.identifier.identifierData,
    //   () => {
    //     if (!hideRef.value) return
    //     if (!nameRef.value) return
    //     console.log(nameRef.value.textContent)
    //     if (vuex.identifier.identifierData.) {
    //       console.log(nameRef.value.textContent)
    //       hideRef.value.innerHTML = nameRef.value.textContent as string
    //       console.log(hideRef.value)
    //       nameRef.value.style.width = hideRef.value.offsetWidth + 'px'
    //     }
    //   }
    // )

    return {
      vuex,
      nameRef,
      hideRef,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;
@use '@/assets/styles/component-composer/common-styles.scss' as *;

#components-panel {
  margin-top: 20px;

  h1 {
    font-size: 17px;
    font-weight: 500;
  }
  .component-list {
    .color-name-select {
      display: flex;
      flex-direction: row;
      @include tip-style;
      align-items: center;
      height: 32px;
      margin-top: 10px;

      .chrome-picker {
        $size: 13px;
        width: $size;
        height: $size;
        border-radius: 2px;
        margin-left: 0.5rem;
      }

      .component-name {
        font-family: inherit;
        height: 1.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-weight: 600;
        font-size: 13px;
      }

      #hide-compo {
        width: auto;
        display: inline-block;
        visibility: hidden;
        position: fixed;
        top: 10px;
        overflow: auto;
        font-size: 13px;
        font-weight: 600;
        font-family: inherit;
      }
    }
  }
}
</style>
