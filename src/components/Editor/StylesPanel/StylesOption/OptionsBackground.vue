<template>
  <div id="options-background">
    <div class="bg-color-wrapper">
      <div class="bg-color-box">
        <div class="bg-color-text">Background Color</div>
        <div
          class="bg-color-before"
          :style="{
            backgroundColor: vuex.styleData.styleData
              ? vuex.styleData.styleData.backgroundColor
              : '',
          }"
        ></div>
      </div>

      <div class="bg-color-list">
        <button
          name="backgroundColor"
          class="color-none"
          @click="submitDefaultValue"
        />
        <button
          v-for="i in 14"
          id="color-button"
          :key="`color-picker-${i}`"
          name="backgroundColor"
          class="color-choose"
          :class="'color' + i"
          @click="submitDefaultValue"
        />
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
    <div class="bg-img-wrapper">
      <div class="bg-img-text">Background Image</div>
      <button class="bg-img-input">Pick</button>
    </div>
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

    // default color box에서 선택하였을 때 chagnedData 저장
    function submitDefaultValue(e: MouseEvent) {
      const target = e.target
      let changedData
      if (vuex.styleData.target) {
        if (target instanceof HTMLElement) {
          if (target.className === 'color-none') {
            changedData = {
              style: 'backgroundColor',
              value: 'transparent',
            }
          } else {
            changedData = {
              style: 'backgroundColor',
              value: getComputedStyle(target).backgroundColor,
            }
          }
          vuex.styleData.SET_CHANGED_DATA(changedData)
        }
      }
    }

    const background = reactive({
      backgroundColor: '#fff',
    })

    // chrome-picker에서 선택하였을 때 chagnedData 저장
    function submitPickerValue(color: VueColor) {
      if (vuex.styleData.target) {
        const changedData = {
          style: 'backgroundColor',
          value: color.hex,
        }
        vuex.styleData.SET_CHANGED_DATA(changedData)
      }
    }

    return {
      picker,
      activateChromePicker,
      submitDefaultValue,
      background,
      submitPickerValue,
      vuex,
    }
  },
})
</script>

<style lang="scss">
#options-background {
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .bg-color-wrapper {
    width: 80%;
    .bg-color-box {
      display: flex;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      .bg-color-text {
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
        color: #868686;
        margin-right: 0.7rem;
      }
      .bg-color-before {
        width: 3.5rem;
        border-radius: 0.3rem;
        height: 2rem;
      }
    }

    .bg-color-list {
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
  .bg-img-wrapper {
    width: 80%;
    display: flex;
    flex-direction: row;
    .bg-img-text {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      color: #868686;
    }
    .bg-img-input {
    }
  }
}
</style>
