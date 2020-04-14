<template>
  <div id="options-border">
    <div class="radius-box">
      <div class="radius-input">radius</div>
      <input
        v-model="borderRadius"
        class="radius-input-value"
        name="borderRadius"
        @keydown.enter="submitLayoutValue"
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
        @keydown.enter="submitLayoutValue"
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
          v-for="(style, i) in styles"
          :key="i"
          class="position-style"
          @click="submitPositionValue(style)"
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

export default defineComponent({
  components: { ChromeColor: Chrome },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)
    const vuex = useVuex(ctx)

    const styles: string[] = ['solid', 'dotted', 'dashed']

    const widthSelected = ref('px')
    const radiusSelected = ref('px')
    const borderRadius = ''

    const state: Record<string, string> = reactive({
      width: '0',
      style: 'solid',
      color: 'black',
    })

    const borderState = Object.keys(state)

    watch(
      () => vuex.styleData.target,
      () => {
        if (vuex.styleData.target) {
          if (vuex.styleData.styleData) {
          }
        } else {
        }
      }
    )

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

    function submitPickerValue(color: VueColor) {
      // if (vuex.styleData.target) {
      //   const changedData = {
      //     style: 'backgroundColor',
      //     value: color.hex,
      //   }
      //   vuex.styleData.SET_CHANGED_DATA(changedData)
      // }
    }

    // TODO border radius, width 값 변경하는 함수 작성하기

    function submitLayoutValue() {
      if (vuex.styleData.target) {
        const widthValue = document.querySelector(
          '.radius-input-value'
        ) as HTMLElement
        const heightValue = document.querySelector(
          '.border-width-input-value'
        const rgba = color.rgba

        vuex.editorInfo.selectedCssRule.style.border =
          width.value +
          widthSelected.value +
          ' ' +
          currentStyle.value +
          ' ' +
          `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
        currentColor.value = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`

        // setTimeout(() => {
        //   changedData = {
        //     style: heightValue.getAttribute('name'),
        //     value:
        //       (heightValue as HTMLInputElement)?.value + radiusSelected.value,
        //   }
        //   vuex.styleData.SET_CHANGED_DATA(changedData)
        // }, 0)
      }
    }

    return {
      widthSelected,
      radiusSelected,
      state,
      picker,
      background,
      activateChromePicker,
      submitPickerValue,
      styles,
      borderRadius,
      submitLayoutValue,
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
