<template>
  <div id="options-font">
    <div class="font-weight-wrapper">
      <div class="font-weight-text">Weight</div>
      <div class="font-weight-list">
        <button
          v-for="(property, i) in properties"
          :key="i"
          class="font-weight-property"
          @click="submitWeightValue($event, property)"
        >
          {{ property }}
        </button>
      </div>
    </div>
    <div class="font-align-wrapper">
      <div class="font-align-text">Align</div>
      <div class="font-align-list">
        <img
          name="left"
          class="font-align-left"
          src="@/assets/images/left-align.svg"
          @click="submitTextAlign"
        />
        <img
          name="center"
          class="font-align-center"
          src="@/assets/images/center-align.svg"
          @click="submitTextAlign"
        />
        <img
          name="right"
          class="font-align-right"
          src="@/assets/images/right-align.svg"
          @click="submitTextAlign"
        />
      </div>
    </div>
    <div class="font-size-wrapper">
      <div class="font-size-input">Size</div>
      <input
        v-model="state.fontSize.split('px')[0]"
        class="font-size-input-value"
        name="fontSize"
        @keyup.enter="submitFontSize"
      />
      <select v-model="sizeSelected" class="size-option">
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
      </select>
    </div>
    <div class="font-property-wrapper">
      <div class="filter-wrapper">
        <div class="filter-text">Line Height</div>
        <input
          v-model="state.lineHeight"
          name="lineHeight"
          class="font-filter-input"
          @keyup.enter="submitTextValue"
        />
      </div>
      <div class="filter-wrapper">
        <div class="filter-text">Letter Spacing</div>
        <input
          v-model="state.letterSpacing"
          name="letterSpacing"
          class="font-filter-input"
          @keyup.enter="submitTextValue"
        />
      </div>
    </div>
    <div class="font-color-wrapper">
      <div class="font-color-text">Color</div>
      <div class="font-color-list">
        <button name="color" class="color-none" @click="submitDefaultValue" />
        <button
          v-for="i in 14"
          id="color-button"
          :key="`color-picker-${i}`"
          class="color-choose"
          name="color"
          :class="'color' + i"
          @click="submitDefaultValue"
        />
        <button class="chrome-picker" @click="activateChromePicker" />
      </div>
    </div>
    <chrome-color
      v-show="picker.isChromePicker"
      v-model="font.fontColor"
      class="chrome"
      :value="font.fontColor"
      @input="submitPickerValue"
    ></chrome-color>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import { Chrome } from 'vue-color'
import { useVuex, useNextTick } from '@/modules/vue-hooks'
import { VueColor } from '@/types/vue-color'

export default defineComponent({
  components: { ChromeColor: Chrome },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)
    const vuex = useVuex(ctx)
    const properties: string[] = ['Light', 'Regular', 'Medium', 'Bold']

    const picker = reactive({
      isChromePicker: false,
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

    const state: Record<string, string> = reactive({
      fontSize: '',
      lineHeight: '',
      letterSpacing: '',
    })

    const stateValues = Object.keys(state)

    // vuex.styleData.target이 변화하면 fontSize, lineHeight, letterSpacing 셋팅
    watch(
      () => vuex.styleData.target,
      () => {
        if (vuex.styleData.target) {
          if (vuex.styleData.styleData) {
            for (const value in stateValues) {
              const styleProperty = stateValues[value]
              const styleData = vuex.styleData.styleData as Record<string, any>
              state[stateValues[value]] = styleData[styleProperty]
            }
          }
        }
      }
    )

    const font = reactive({
      fontColor: '#fff',
    })

    // default color box를 선택했을 때 css selector 변경
    function submitDefaultValue(e: MouseEvent) {
      const target = e.target
      if (vuex.styleData.target) {
        if (target instanceof HTMLElement) {
          if (!vuex.editorInfo.selectedCssRule) return
          if (target.className === 'color-none') {
            vuex.editorInfo.selectedCssRule.style.color = 'transparent'
          } else {
            vuex.editorInfo.selectedCssRule.style.color = getComputedStyle(
              target
            ).backgroundColor
          }
        }
      }
    }

    // chrome-picker를 선택했을 때 값을 css rule에 반영
    function submitPickerValue(color: VueColor) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const rgba = color.rgba
        vuex.editorInfo.selectedCssRule.style.color = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
      }
    }

    // fontweight값을 css rule에 반영
    function submitWeightValue(e: MouseEvent, property: string) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        vuex.editorInfo.selectedCssRule.style.fontWeight = property.toLowerCase()
      }
    }

    const sizeSelected = ref('px')

    // input 태그를 사용해 입력한 fontSize 값을 css rule에 반영
    function submitFontSize(e: InputEvent) {
      if (vuex.styleData.target) {
        const target = e.target as HTMLElement
        if (!vuex.editorInfo.selectedCssRule) return
        vuex.editorInfo.selectedCssRule.style.fontSize =
          (target as HTMLInputElement).value + sizeSelected.value
      }
    }

    // text-align 속성을 css rule에 반영
    function submitTextAlign(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const name = target.getAttribute('name')
        if (name) {
          vuex.editorInfo.selectedCssRule.style.textAlign = name
        }
      }
    }

    // lineHeight와 letterSpacing 값을 css rule에 반영
    function submitTextValue(e: InputEvent) {
      if (vuex.styleData.target) {
        const target = e.target as HTMLElement
        if (!vuex.editorInfo.selectedCssRule) return
        const type = target.getAttribute('name')
        if (type) {
          const styleRule = vuex.editorInfo.selectedCssRule.style as Record<
            string | number,
            any
          >
          styleRule[type] = (target as HTMLInputElement)?.value
        }
      }
    }

    // font-style의 특정 속성을 css rule에 반영
    function submitFontStyle(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const type = target.getAttribute('property')
        if (type) {
          const styleRule = vuex.editorInfo.selectedCssRule.style as Record<
            string | number,
            any
          >
          styleRule[type] = target?.getAttribute('value')
        }
      }
    }

    return {
      picker,
      activateChromePicker,
      submitDefaultValue,
      submitPickerValue,
      font,
      vuex,
      submitTextAlign,
      properties,
      submitWeightValue,
      submitFontStyle,
      submitFontSize,
      state,
      sizeSelected,
      submitTextValue,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-font {
  display: flex;
  margin-top: 0.3rem;
  width: 100%;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .font-weight-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    width: 80%;
    .font-weight-text {
      color: #868686;
      text-align: left;
      width: 30%;
    }
    .font-weight-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 7px;
      margin-top: 13px;
      margin-bottom: 6px;
      .font-weight-property {
        @include auto-distinct-bg-color;
        @include auto-text-color;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
        width: 6rem;
        padding-right: 0.1rem;
        padding-left: 0.1rem;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
        border-radius: 0.3rem;
        &:hover {
          background-color: #1471ff;
        }
      }
    }
  }
  .font-align-wrapper {
    width: 80%;
    display: flex;
    height: 2rem;
    flex-direction: row;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    position: relative;
    .font-align-text {
      position: absolute;
      left: 0;
      color: #868686;
      text-align: left;
      width: 30%;
    }
    .font-align-list {
      position: absolute;
      right: 0;
      height: 100%;
      display: flex;
      flex-direction: row;
      .font-align-left,
      .font-align-center,
      .font-align-right {
        @include auto-distinct-bg-color;
        width: 1.9rem;
        height: 1.9rem;
        padding: 0.3rem;
        border-radius: 0.4rem;
        margin-right: 0.6rem;
        cursor: pointer;
        &:hover {
          background-color: #646464;
        }
      }
    }
  }
  .font-size-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    flex-direction: row;
    height: 2rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .font-size-input {
      color: #868686;
      text-align: left;
      width: 30%;
      margin-right: 5%;
    }
    .font-size-input-value {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      width: 40%;
      border-radius: 0.4rem;
      padding: 0.4rem;
      margin-right: 2%;
      text-align: right;
    }
    .size-option {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      border-radius: 0.4rem;
      padding: 0.4rem;
      width: 23%;
      border: none;
    }
  }
  .font-property-wrapper {
    width: 80%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .filter-wrapper {
      display: flex;
      margin-bottom: 0.3rem;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      margin-top: 0.3rem;
      position: relative;
      height: 2rem;
      width: 100%;
      .filter-text {
        position: absolute;
        left: 0;
        font-size: 0.9rem;
        text-align: left;
        width: 7rem;
        color: #868686;
      }
      .font-filter-input {
        @include auto-text-color;
        @include auto-distinct-bg-color;
        position: absolute;
        right: 0;
        background: none;
        border: none;
        text-align: right;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        padding-right: 0.3rem;
        border-radius: 0.2rem;
        width: 4rem;
        height: 1.8rem;
      }
    }
  }
  .font-color-wrapper {
    width: 80%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .font-color-text {
      color: #868686;
    }
    .font-color-list {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      align-items: center;
      justify-content: center;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      .color-choose,
      .chrome-picker,
      .color-none {
        width: 100%;
        height: 2rem;
        display: inline-block;
        border-radius: 0.3rem;
        border: none;
        transition: box-shadow 200ms ease;

        &:hover {
          box-shadow: 0 0 0 0.2rem #40b3ff;
        }
        &::before {
          content: '';
          display: block;
          padding-top: 100%;
        }
      }
    }
  }
}
</style>
