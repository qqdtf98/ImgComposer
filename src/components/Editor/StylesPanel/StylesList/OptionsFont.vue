<template>
  <div id="options-font">
    <div class="font-property-wrapper">
      <div class="font-align-wrapper">
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
      <div class="font-style-wrapper">
        <img
          property="fontWeight"
          value="bold"
          class="font-weight-property"
          src="@/assets/images/thick.svg"
          @click="submitFontStyle"
        />
        <img
          property="textDecoration"
          value="underline"
          class="font-line-property"
          src="@/assets/images/line-font.svg"
          @click="submitFontStyle"
        />
        <img
          property="fontStyle"
          value="italic"
          class="font-italic-property"
          src="@/assets/images/italic.svg"
          @click="submitFontStyle"
        />
      </div>
    </div>
    <div class="font-attribute-wrapper">
      <!-- TODO font-family 어떤식으로 변경할 것인지 -->
      <div class="font-family-wrapper">
        <div class="font-family-text">Font Family</div>
        <select id="font-family-select">
          <option value="none">NONE</option>
          <option value="geogia">Geogia</option>
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </div>
      <div class="font-size-wrapper">
        <div class="font-size-text">Font Size</div>
        <input
          name="fontSize"
          class="font-size-input"
          :placeholder="
            vuex.styleData.styleData ? vuex.styleData.styleData.fontSize : ''
          "
          @keyup.enter="submitFontSize"
        />
      </div>
    </div>
    <div class="font-color-wrapper">
      <div class="font-color-text">Font color</div>
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
import { defineComponent, reactive } from '@vue/composition-api'
import { Chrome } from 'vue-color'
import { useVuex } from '@/modules/vue-hooks'
import { VueColor } from '@/types/vue-color'

export default defineComponent({
  components: { ChromeColor: Chrome },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const picker = reactive({
      isChromePicker: false,
    })

    function activateChromePicker() {
      if (picker.isChromePicker) {
        picker.isChromePicker = false
      } else {
        picker.isChromePicker = true
      }
    }

    const font = reactive({
      fontColor: '#fff',
    })

    // default color box를 선택했을 때 changedData 저장
    function submitDefaultValue(e: MouseEvent) {
      let changedData
      const target = e.target
      if (vuex.styleData.target) {
        if (target instanceof HTMLElement) {
          if (target.className === 'color-none') {
            changedData = {
              style: 'color',
              value: 'transparent',
            }
          } else {
            changedData = {
              style: 'color',
              value: getComputedStyle(target).backgroundColor,
            }
          }
          vuex.styleData.SET_CHANGED_DATA(changedData)
        }
      }
    }

    // chrome-picker를 선택했을 때 changedData 저장
    function submitPickerValue(color: VueColor) {
      if (vuex.styleData.target) {
        const changedData = {
          style: 'color',
          value: color.hex,
        }
        vuex.styleData.SET_CHANGED_DATA(changedData)
      }
    }

    // text-align 속성 changedData에 저장
    function submitTextAlign(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (vuex.styleData.target) {
        const changedData = {
          style: 'textAlign',
          value: target.getAttribute('name'),
        }
        vuex.styleData.SET_CHANGED_DATA(changedData)
      }
    }

    // font-style의 특정 속성 changedData에 저장
    function submitFontStyle(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (vuex.styleData.target) {
        const changedData = {
          style: target?.getAttribute('property'),
          value: target?.getAttribute('value'),
        }
        vuex.styleData.SET_CHANGED_DATA(changedData)
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
      submitFontStyle,
    }
  },
})
</script>

<style lang="scss">
#options-font {
  display: flex;
  margin-top: 0.3rem;
  width: 100%;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .font-property-wrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .font-align-wrapper,
    .font-style-wrapper {
      width: 80%;
      height: 3rem;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .font-align-left,
      .font-align-center,
      .font-align-right,
      .font-weight-property,
      .font-line-property,
      .font-italic-property {
        position: absolute;
        width: 2rem;
        height: 2rem;
        padding: 0.3rem;
        border-radius: 0.4rem;
        cursor: pointer;
        &:hover {
          background-color: #646464;
        }
      }
      .font-align-left,
      .font-weight-property {
        left: 0;
      }
      .font-align-right,
      .font-italic-property {
        right: 0;
      }
    }
  }
  .font-attribute-wrapper {
    width: 85%;
    .font-family-wrapper {
      height: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      position: relative;
      .font-family-text {
        position: absolute;
        color: #868686;
        width: 6rem;
        text-align: center;
        left: 0;
      }
      #font-family-select {
        position: absolute;
        right: 0;
        width: 4.5rem;
        background-color: #707070;
        font-size: 0.8rem;
        border: none;
        padding: 0.1rem;
      }
    }
    .font-size-wrapper {
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      height: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      .font-size-text {
        color: #868686;
        width: 6rem;
        text-align: center;
        position: absolute;
        left: 0;
      }
      .font-size-input {
        position: absolute;
        right: 0;
        width: 4rem;
        background: none;
        border: none;
        border-bottom: 1px solid #768ea7;
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
