<template>
  <div id="components-panel">
    <div class="header-container">
      <h1 class="header">Components</h1>
      <img
        class="fold-panel-data"
        src="@/assets/images/rightarrow.svg"
        @click="foldComponents"
      />
    </div>
    <div
      v-show="isElementUnfolded"
      v-if="vuex.identifier.fileState"
      class="component-data-list"
    >
      <h3 @click="viewEveryCompo">view all</h3>
      <div class="component-list">
        <div
          v-for="(iden, i) in vuex.identifier.pages[
            vuex.identifier.selectedPageIndex
          ].identifiers"
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

    /**
     * 사용자가 선택한 identifier만 화면에 표시
     * @param iden 사용자가 선택한 identifier 정보
     */
    function viewSelectedCompo(iden: IdentifierType) {
      for (
        let i = 0;
        i <
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers.length;
        i++
      ) {
        const copyIden = {
          ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
            .identifiers[i],
        }
        if (
          iden ===
          vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
            .identifiers[i]
        ) {
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

    /**
     * 전체 identifier를 표시
     */
    function viewEveryCompo() {
      for (
        let i = 0;
        i <
        vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers.length;
        i++
      ) {
        const copyIden = {
          ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
            .identifiers[i],
        }
        copyIden.compoView = true
        const newIden: NewIden = {
          index: i,
          identifier: copyIden,
        }
        vuex.identifier.updateIden(newIden)
      }
    }

    /**
     * 사용자가 선택한 identifier만 화면에 표시
     * @param evt mousedown target. mouseup target의 자식이 됨.
     * @param index 현재 컴포넌트 리스트에서의 순서
     */
    function createParentCompo(evt: MouseEvent, index: number) {
      let downTarget = evt.target as HTMLElement
      downTarget = downTarget.closest('.compo-list') as HTMLElement
      const childId = parseInt(downTarget.getAttribute('id') as string)
      const child = {
        ...vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
          .identifiers[index],
      }
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

          // mouseup target이 mousedown target과 다를 때
          if (target && target !== downTarget) {
            const parent = compoArray.find(
              (elem) => elem === target
            ) as HTMLElement
            const parentIndex = compoArray.findIndex((elem) => elem === target)
            const parentId = parseInt(parent.getAttribute('id') as string)
            const newIdentifier = [
              ...vuex.identifier.pages[
                vuex.identifier.selectedPageIndex as number
              ].identifiers,
            ]

            let count = 0
            // 선택한 컴포넌트의 하위에 존재하는 자식의 개수 세기
            for (
              let i = parentIndex + 1;
              i <
              vuex.identifier.pages[vuex.identifier.selectedPageIndex as number]
                .identifiers.length;
              i++
            ) {
              count++
              if (
                vuex.identifier.pages[
                  vuex.identifier.selectedPageIndex as number
                ].identifiers[i].level === child.level ||
                i ===
                  vuex.identifier.pages[
                    vuex.identifier.selectedPageIndex as number
                  ].identifiers.length -
                    1
              ) {
                break
              }
            }

            const splicedIden = [...newIdentifier.splice(index, count + 1)]
            const pushIden = []
            // 하위 자식들의 level 올리기
            for (let i = 0; i < splicedIden.length; i++) {
              const spliced = { ...splicedIden[i] }
              if (i === 0) {
                spliced.parentIndex = parentId
                spliced.level =
                  vuex.identifier.pages[
                    vuex.identifier.selectedPageIndex as number
                  ].identifiers[parentIndex].level + 1
              } else {
                spliced.level +=
                  vuex.identifier.pages[
                    vuex.identifier.selectedPageIndex as number
                  ].identifiers[parentIndex].level + 1
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
            // mouseup target과 mousedown target이 같을 때
            e.preventDefault()
          } else if (!target) {
            //  mouseup target이 컴포넌트 리스트가 아닌 위치일때
            // TODO 밖으로 뺄 때 구현하기
            const copyIden = {
              ...vuex.identifier.pages[
                vuex.identifier.selectedPageIndex as number
              ].identifiers[index],
            }
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

    const isElementUnfolded = ref(true)

    function foldComponents(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (isElementUnfolded.value) {
        isElementUnfolded.value = false
        target.style.transform = 'rotate(270deg)'
      } else {
        isElementUnfolded.value = true
        target.style.transform = 'rotate(90deg)'
      }
    }

    return {
      vuex,
      nameRef,
      hideRef,
      viewSelectedCompo,
      viewEveryCompo,
      createParentCompo,
      foldComponents,
      isElementUnfolded,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;
@use '@/assets/styles/component-composer/common-styles.scss' as *;

#components-panel {
  margin: 20px 0;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header {
      font-size: 17px;
      font-weight: 500;
    }

    .fold-panel-data {
      transform: rotate(90deg);
      border-radius: 5px;
      padding: 4px 6px;
      cursor: pointer;

      &:hover {
        background-color: #e2e2e2;
      }
    }
  }

  .component-data-list {
    margin: 5px 0;
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
}
</style>
