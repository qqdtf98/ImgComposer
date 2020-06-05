<template>
  <div id="options-border">
    <div class="radius-box">
      <div class="radius-input">radius</div>
      <input
        v-model="borderRadius"
        class="radius-input-value"
        name="borderRadius"
        @keydown.enter="submitBorderRadiusValue"
      />
      <select v-model="radiusSelected" class="radius-option">
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
      </select>
    </div>
    <div class="width-box">
      <div class="width-input">Width</div>
      <input
        v-model="state.width"
        class="border-width-input-value"
        name="borderWidth"
        @keydown.enter="submitWidthValue"
      />
      <select v-model="widthSelected" class="width-option">
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
      </select>
    </div>
    <div class="style-box">
      <div class="style-input">Style</div>
      <div class="style-btn">
        <button
          v-for="(style, i) in styleList"
          :key="i"
          :state="styles[style].state"
          class="position-style"
          @click="submitStyleValue($event, style)"
        >
          {{ style }}
        </button>
      </div>
    </div>
    <div class="border-color-box">
      <div class="color-input">Color</div>
      <button class="chrome-picker" @click="activateChromePicker" />
    </div>
    <chrome-color
      v-show="picker.isChromePicker"
      v-model="background.backgroundColor"
      class="chrome"
      :value="background.backgroundColor"
      @input="submitPickerValue"
    ></chrome-color>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from '@vue/composition-api'
import { Chrome } from 'vue-color'
import { useVuex, useNextTick } from '@/modules/vue-hooks'
import { VueColor } from '@/types/vue-color'
import replaceCssRules from '@/modules/replace-css-rules'

export default defineComponent({
  components: { ChromeColor: Chrome },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)
    const vuex = useVuex(ctx)

    const styles: Record<
      string,
      {
        state: boolean
        name: string
      }
    > = reactive({
      solid: { state: false, name: 'solid' },
      dotted: { state: false, name: 'dotted' },
      dashed: { state: false, name: 'dashed' },
    })

    const styleList = Object.keys(styles)

    const widthSelected = ref('px')
    const radiusSelected = ref('px')
    const borderRadius = ''

    const state: Record<string, string> = reactive({
      width: '0',
      style: 'solid',
      color: 'black',
    })

    const borderState = Object.keys(state)

    const picker = reactive({
      isChromePicker: false,
    })

    const background = reactive({
      backgroundColor: '#fff',
    })

    function activateChromePicker(e: MouseEvent) {
      if (picker.isChromePicker) {
        picker.isChromePicker = false
      } else {
        picker.isChromePicker = true
      }
      nextTick(() => {
        let target = e.target as HTMLElement
        target = (e.target as HTMLElement).closest(
          '.layout-list-box'
        ) as HTMLElement
        let i
        let newHeight = 20
        if (target) {
          for (i = 0; i < target.children.length; i++) {
            newHeight += target.children[i].getBoundingClientRect().height
          }
          target.style.height = newHeight + 'px'
        }
      })
    }

    /**
     * input 태그와 select의 value를 사용하여 borderRadius 값을 css rule에 적용
     */
    function submitBorderRadiusValue(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!vuex.editorInfo.selectedCssRule) return
      const beforeStatement = `border-radius`
      vuex.editorInfo.selectedCssRule.style.borderRadius =
        (target as HTMLInputElement)?.value + radiusSelected.value
      const afterStatement = `${vuex.editorInfo.selectedCssRule.style.borderRadius}`
      replaceCssRules(beforeStatement, afterStatement)
    }

    const currentStyle = ref('')

    /**
     * border style을 선택했을 때 width와 color를 조합하여 css selector에 반영
     */
    function submitStyleValue(e: MouseEvent, style: string) {
      if (vuex.styleData.target) {
        const btnList = document.querySelectorAll(
          '.position-style'
        ) as NodeListOf<HTMLElement>
        const target = e.target as HTMLElement
        const width = document.querySelector(
          '.border-width-input-value'
        ) as HTMLInputElement
        if (styles[style].state) {
          styles[style].state = false
          target.style.backgroundColor = '#000'
        } else {
          if (!vuex.editorInfo.selectedCssRule) return
          for (const i in styleList) {
            styles[styleList[i]].state = false
            btnList[i].style.backgroundColor = '#000'
          }
          styles[style].state = true
          target.style.backgroundColor = 'blue'
          currentStyle.value = style
          const beforeStatement = 'border'
          vuex.editorInfo.selectedCssRule.style.border =
            width.value +
            widthSelected.value +
            ' ' +
            style +
            ' ' +
            currentColor.value
          const afterStatement = vuex.editorInfo.selectedCssRule.style.border
          replaceCssRules(beforeStatement, afterStatement)
        }
      }
    }

    const currentColor = ref('')

    /**
     * border color를 선택했을 때 width와 style을 조합하여 css selector에 반영
     * @param color colorPicker를 사용하여 선택한 색깔
     */
    function submitPickerValue(color: VueColor) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const width = document.querySelector(
          '.border-width-input-value'
        ) as HTMLInputElement
        const rgba = color.rgba

        const beforeStatement = 'border'
        vuex.editorInfo.selectedCssRule.style.border =
          width.value +
          widthSelected.value +
          ' ' +
          currentStyle.value +
          ' ' +
          `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`

        currentColor.value = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
        const afterStatement = vuex.editorInfo.selectedCssRule.style.border
        replaceCssRules(beforeStatement, afterStatement)
      }
    }

    /**
     * border width를 선택했을 때 style과 color를 조합하여 css selector에 반영
     */
    function submitWidthValue() {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const width = document.querySelector(
          '.border-width-input-value'
        ) as HTMLInputElement
        const beforeStatement = 'border'
        vuex.editorInfo.selectedCssRule.style.border =
          width.value +
          widthSelected.value +
          ' ' +
          currentStyle.value +
          ' ' +
          currentColor.value
        const afterStatement = vuex.editorInfo.selectedCssRule.style.border
        replaceCssRules(beforeStatement, afterStatement)
      }
    }

    return {
      widthSelected,
      radiusSelected,
      state,
      picker,
      background,
      activateChromePicker,
      styles,
      borderRadius,
      submitBorderRadiusValue,
      styleList,
      submitStyleValue,
      submitPickerValue,
      submitWidthValue,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-border {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 100%;
  .width-box,
  .radius-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    flex-direction: row;
    height: 2rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .width-input,
    .radius-input {
      color: #868686;
      text-align: left;
      width: 30%;
      margin-right: 5%;
    }
    .border-width-input-value,
    .radius-input-value {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      width: 40%;
      border-radius: 0.4rem;
      padding: 0.4rem;
      margin-right: 2%;
      text-align: right;
    }
    .width-option,
    .radius-option {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      border-radius: 0.4rem;
      padding: 0.4rem;
      width: 23%;
      border: none;
    }
  }
  .style-box {
    display: flex;
    align-items: left;
    justify-content: center;
    width: 90%;
    flex-direction: column;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .style-input {
      color: #868686;
      text-align: left;
      width: 30%;
      margin-right: 5%;
    }
    .style-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      margin-top: 0.6rem;
      .position-style {
        @include auto-distinct-bg-color;
        @include auto-text-color;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
        width: 5rem;
        padding-right: 0.1rem;
        padding-left: 0.1rem;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
        border-radius: 0.3rem;
        &:hover {
          background-color: #1471ff;
          cursor: pointer;
        }
      }
    }
  }
  .border-color-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    flex-direction: row;
    position: relative;
    height: 2rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .color-input {
      position: absolute;
      left: 0;
      color: #868686;
      text-align: left;
      width: 30%;
      margin-right: 5%;
    }
    .chrome-picker {
      position: absolute;
      right: 0;
      width: 40%;
      border-radius: 0.4rem;
      padding: 0.4rem;
      margin-right: 2%;
      text-align: right;
    }
  }
}
</style>
