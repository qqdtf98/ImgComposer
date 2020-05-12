<template>
  <div id="components-panel">
    <h1>Components</h1>
    <h3 @click="viewEveryCompo">view all</h3>
    <div class="component-list">
      <div
        v-for="(iden, i) in vuex.identifier.identifierData"
        :id="iden.index"
        :key="i"
        class="color-name-select compo-list"
        :style="{
          width: iden.nameWidth + 40 + 'px',
          marginLeft: iden.level * 20 + 'px',
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
import { version } from 'vue-color'
import { NumericDictionary } from 'lodash'

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
      let downTarget = evt.target as HTMLElement
      downTarget = downTarget.closest('.compo-list') as HTMLElement
      const childId = parseInt(downTarget.getAttribute('id') as string)
      const child = { ...vuex.identifier.identifierData[index] }
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
            const parent = compoArray.find(
              (elem) => elem === target
            ) as HTMLElement
            const parentIndex = compoArray.findIndex((elem) => elem === target)
            const parentId = parseInt(parent.getAttribute('id') as string)
            const newIdentifier = [...vuex.identifier.identifierData]
            let count = 0
            for (
              let i = parentIndex + 1;
              i < vuex.identifier.identifierData.length;
              i++
            ) {
              count++
              if (
                vuex.identifier.identifierData[i].level === child.level ||
                i === vuex.identifier.identifierData.length - 1
              ) {
                break
              }
            }
            const splicedIden = [...newIdentifier.splice(index, count + 1)]
            const pushIden = []
            for (let i = 0; i < splicedIden.length; i++) {
              const spliced = { ...splicedIden[i] }
              if (i === 0) {
                spliced.parentIndex = parentId
                spliced.level =
                  vuex.identifier.identifierData[parentIndex].level + 1
              } else {
                spliced.level +=
                  vuex.identifier.identifierData[parentIndex].level + 1
              }

              pushIden.push(spliced)
            }
            let newParentIndex = newIdentifier.findIndex(
              (elem) => elem.index === parentId
            )
            for (let i = 0; i < pushIden.length; i++) {
              newIdentifier.splice(newParentIndex + 1, 0, pushIden[i])
              newParentIndex++
            }
            vuex.identifier.SET_IDEN_DATA(newIdentifier)
          } else if (target && target === downTarget) {
            e.preventDefault()
          } else if (!target) {
            // TODO 밖으로 뺄 때 구현하기
            const copyIden = { ...vuex.identifier.identifierData[index] }
            copyIden.parentIndex = null
            copyIden.level = 0
            const newIden = {
              index,
              identifier: copyIden,
            }
            vuex.identifier.updateIden(newIden)
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
