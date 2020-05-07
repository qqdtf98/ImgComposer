<template>
  <div id="components-panel">
    <h1>Components</h1>
    <h3 @click="viewEveryCompo">view all</h3>
    <div class="component-list">
      <div
        v-for="(iden, i) in vuex.identifier.identifierData"
        :key="i"
        class="color-name-select compo-list"
        :style="{
          width: iden.nameWidth + 40 + 'px',
        }"
        @click="viewSelectedCompo(iden)"
        @mousedown="createParentCompo($event, i)"
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
import {
  IdentifierType,
  Identifiers,
  NewIden,
} from '@/interfaces/any-editor-file.ts'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const nameRef = ref<HTMLElement>(null)
    const hideRef = ref<HTMLElement>(null)

    function viewSelectedCompo(iden: IdentifierType) {
      for (let i = 0; i < vuex.identifier.identifierData.length; i++) {
        const copyIden = { ...vuex.identifier.identifierData[i] }
        if (iden === vuex.identifier.identifierData[i]) {
          copyIden.compoView = true
        } else {
          copyIden.compoView = false
        }
        const newIden: NewIden = {
          index: i,
          identifier: copyIden,
        }
        vuex.identifier.updateIden(newIden)
      }
    }

    function viewEveryCompo() {
      for (let i = 0; i < vuex.identifier.identifierData.length; i++) {
        const copyIden = { ...vuex.identifier.identifierData[i] }
        copyIden.compoView = true
        const newIden: NewIden = {
          index: i,
          identifier: copyIden,
        }
        vuex.identifier.updateIden(newIden)
      }
    }

    function createParentCompo(evt: MouseEvent, index: number) {
      const downTarget = evt.target as HTMLElement
      const compoList = document.querySelectorAll('.compo-list') as NodeListOf<
        HTMLElement
      >
      const compoArray: HTMLElement[] = Array.prototype.slice.call(compoList)
      let upEvent: (e: MouseEvent) => void
      window.addEventListener(
        'mouseup',
        (upEvent = (e: MouseEvent) => {
          let target: HTMLElement | null = e.target as HTMLElement
          target = target.closest('.compo-list')
          if (target && target !== downTarget) {
            console.log('parent')
            const parentIndex = compoArray.findIndex((elem) => elem === target)
            const copyIden = { ...vuex.identifier.identifierData[index] }
            copyIden.parentIndex = parentIndex
            const newIden = {
              index,
              identifier: copyIden,
            }
            vuex.identifier.updateIden(newIden)
            setTimeout(() => {
              console.log(vuex.identifier.identifierData)
            }, 0)
          } else if (!target) {
            console.log('wrong')
          }
          window.removeEventListener('mouseup', upEvent)
        })
      )
    }

    return {
      vuex,
      nameRef,
      hideRef,
      viewSelectedCompo,
      viewEveryCompo,
      createParentCompo,
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
      cursor: pointer;

      .chrome-picker {
        $size: 13px;
        width: $size;
        height: $size;
        border-radius: 2px;
        margin-left: 0.5rem;
      }

      .component-name {
        font-family: inherit;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-weight: 600;
        font-size: 13px;
        user-select: none;
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
