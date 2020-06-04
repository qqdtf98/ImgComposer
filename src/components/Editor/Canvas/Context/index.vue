<template>
  <div id="css-rules">
    <div class="rules-title">CSS Rules</div>
    <div class="selector-list-wrapper">
      <div
        v-for="(rule, i) in cssRules"
        :key="i"
        class="selector-list"
        @click="selectCssSelector($event, rule)"
        @contextmenu="handleSelector"
      >
        {{ rule.selectorText }}
      </div>
      <input
        v-show="isInputField"
        ref="inputRef"
        class="selector-list selector-input"
        @keydown.enter="activateCssFileSelector"
      />
      <div
        v-show="isAddBtn"
        class="selector-list add-selector"
        @click="selectType"
      >
        +
      </div>
      <div v-show="!isAddBtn" class="new-selector" @click="visibleInputField">
        <div class="new-class">class</div>
        <div class="new-id">id</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'
import { Cem } from '@/modules/custom-events-manager'
import { getMatchedCssRules } from '@/modules/get-matched-css-rules'

export default defineComponent({
  props: {
    selectState: Boolean,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)
    const cssRules = ref<CSSStyleRule[]>(null)
    watch(
      () => vuex.editorInfo.matchedCssRules,
      () => {
        cssRules.value = vuex.editorInfo.matchedCssRules
        // Dispatch an event about markers change
        Cem.dispatchEvent('onmarkerschange')
      }
    )

    function selectCssSelector(e: MouseEvent, rule: CSSStyleRule) {
      vuex.editorInfo.SET_SELECTED_CSS_RULE(rule)

      setTimeout(() => {
        Cem.dispatchEvent('openstyles')
      }, 0)
    }

    const isAddBtn = ref(true)

    function selectType(e: MouseEvent) {
      const target = e.target as HTMLElement
      isAddBtn.value = false
    }

    const selectorState = ref('')
    const isInputField = ref(false)
    const inputRef = ref<HTMLInputElement>(null)

    function visibleInputField(e: MouseEvent) {
      const target = e.target as HTMLElement
      isInputField.value = true
      if (target.textContent === 'id') {
        selectorState.value = 'id'
      } else if (target.textContent === 'class') {
        selectorState.value = 'class'
      }
      inputRef.value?.focus()
      isAddBtn.value = true
    }

    /**
     * selector 코드를 추가할 css file 선택
     * .class{} 형태로 삽입
     */
    function activateCssFileSelector(e: InputEvent) {
      const target = e.target as HTMLInputElement
      const selectorTarget = vuex.styleData.target

      ctx.emit('open-selector', target, selectorState.value)
      if (!selectorTarget) return
      if (selectorState.value === 'class') {
        selectorTarget.classList.add(target.value)
      } else if (selectorState.value === 'id') {
        selectorTarget.id = target.value
      }
    }

    watch(
      () => props.selectState,
      () => {
        if (props.selectState) {
          if (!inputRef.value) return
          isInputField.value = false
          inputRef.value.value = ''
        }
      }
    )

    function handleSelector(e: MouseEvent) {
      // 사용자가 선택하는 selector 이름
      const target = e.target as HTMLElement

      ctx.emit('open-handler', target)
    }

    return {
      cssRules,
      selectCssSelector,
      selectType,
      isAddBtn,
      activateCssFileSelector,
      visibleInputField,
      inputRef,
      isInputField,
      handleSelector,
    }
  },
})
</script>

<style lang="scss">
#css-rules {
  background-color: rgba(#3a3a3c, 0.8);
  backdrop-filter: blur(20px) saturate(1.7);
  width: 10rem;
  border-radius: 0.5rem;
  overflow: hidden;
  position: fixed;
  padding-bottom: 0.2rem;

  .rules-title {
    font-size: 1rem;
    font-weight: 800;
    line-height: 1;
    width: 100%;
    padding: 1rem 0.7rem;
    user-select: none;
  }

  .selector-list-wrapper {
    width: 100%;

    .selector-list {
      width: 100%;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      padding-right: 0.7rem;
      padding-left: 0.7rem;
      font-size: 0.9rem;
      border-top: 1px solid black;

      &:hover {
        background-color: #000;
        cursor: pointer;
      }
    }

    .add-selector {
      text-align: center;
      color: #2fce2f;
      font-size: 21px;
      font-weight: bold;
    }

    .new-selector {
      display: flex;
      flex-direction: row;
      padding: 0;
      border-top: 1px solid black;
      height: 32px;

      .new-class,
      .new-id {
        width: 50%;
        text-align: center;
        padding: 5px 0;
        color: #4ba2f3;

        &:hover {
          background-color: black;
          cursor: pointer;
        }
      }
      .new-class {
        color: #9672d8;
        border-right: 1px solid black;
      }
    }

    .selector-input {
      color: #b7dfb7;
    }
  }
}
</style>
