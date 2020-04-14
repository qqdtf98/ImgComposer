<template>
  <div id="options-shadow">
    <div class="shadow-type-wrapper">
      <button
        v-for="(shadow, i) in shadowList"
        :key="i"
        class="shadow-type"
        @click="submitBoxShadowStyle($event, shadow)"
      >
        {{ shadow }}
      </button>
    </div>
    <div v-for="(value, i) in valueList" :key="i" class="shadow-value-wrapper">
      <div class="shadow-value">{{ shadowValues[value].name }}</div>
      <input
        v-model="shadowValues[value].property"
        class="shadow-input"
        @keyup.enter="submitBoxShadowValue"
      />
      <select v-model="shadowValues[value].selected" class="shadow-option">
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
      </select>
    </div>
    <div class="shadow-color-box">
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
import { defineComponent, reactive, watch, ref } from '@vue/composition-api'
import { useVuex, useNextTick } from '@/modules/vue-hooks'
import { Chrome } from 'vue-color'
import RangeSlider from 'vue-range-slider'
import { VueColor } from '@/types/vue-color'

export default defineComponent({
  components: { RangeSlider, ChromeColor: Chrome },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)
    const vuex = useVuex(ctx)
    const shadowTypes: Record<
      string,
      {
        state: boolean
      }
    > = reactive({
      default: {
        state: false,
      },
      inset: {
        state: false,
      },
    })

    const shadowList = Object.keys(shadowTypes)

    type BoxShadowProperty = {
      selected: string
      property: string
      name: string
    }

    const shadowValues: Record<
      'x' | 'y' | 'blur' | 'spread' | string,
      BoxShadowProperty
    > = reactive({
      x: {
        selected: 'px',
        property: '',
        name: 'X',
      },
      y: {
        selected: 'px',
        property: '',
        name: 'Y',
      },
      blur: {
        selected: 'px',
        property: '',
        name: 'Blur',
      },
      spread: {
        selected: 'px',
        property: '',
        name: 'Spread',
      },
    })

    const valueList = Object.keys(shadowValues)

    watch(
      () => vuex.styleData.styleData,
      () => {
        if (vuex.styleData.styleData) {
          if (vuex.styleData.styleData.boxShadow !== 'none') {
            const splited = vuex.styleData.styleData?.boxShadow
              .split(') ')[1]
              .split(' ')
            for (const value in valueList) {
              shadowValues[valueList[value]].property = splited[value].split(
                'px'
              )[0]
            }
          } else if (vuex.styleData.styleData.boxShadow === 'none') {
            for (const value in valueList) {
              shadowValues[valueList[value]].property = '0'
            }
          }
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

    const currentColor = ref('px')

    // boxShadow의 color를 colorpicker를 통해 선택한 후 css selector에 반영
    function submitPickerValue(color: VueColor) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const width = document.querySelector(
          '.border-width-input-value'
        ) as HTMLInputElement
        const rgba = color.rgba
        currentColor.value = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
        vuex.editorInfo.selectedCssRule.style.boxShadow =
          currentBoxShadow.value + currentColor.value + currentStyle.value
      }
    }

    const currentStyle = ref('')

    // boxshadow style을 currenStyle에 저장
    function submitBoxShadowStyle(e: MouseEvent, style: string) {
      if (vuex.styleData.target) {
        const btnList = document.querySelectorAll('.shadow-type') as NodeListOf<
          HTMLElement
        >
        const target = e.target as HTMLElement
        if (shadowTypes[style].state) {
          shadowTypes[style].state = false
          target.style.backgroundColor = '#000'
        } else {
          if (!vuex.editorInfo.selectedCssRule) return
          for (const i in shadowList) {
            shadowTypes[shadowList[i]].state = false
            btnList[i].style.backgroundColor = '#000'
          }
          shadowTypes[style].state = true
          target.style.backgroundColor = 'blue'

          currentStyle.value = style
        }
      }
    }

    const currentBoxShadow = ref('')

    // box shadow value를 css selector에 적용
    function submitBoxShadowValue(e: MouseEvent) {
      if (vuex.styleData.target) {
        if (!vuex.editorInfo.selectedCssRule) return
        const inputList = document.querySelectorAll(
          '.shadow-input'
        ) as NodeListOf<HTMLInputElement>
        let boxShadowValue = ''
        let i
        for (i = 0; i < inputList.length; i++) {
          boxShadowValue =
            boxShadowValue +
            inputList[i].value +
            shadowValues[valueList[i]].selected +
            ' '
        }
        currentBoxShadow.value = boxShadowValue
        vuex.editorInfo.selectedCssRule.style.boxShadow =
          boxShadowValue + currentColor.value + currentStyle.value
      }
    }

    return {
      shadowTypes,
      shadowList,
      shadowValues,
      valueList,
      vuex,
      submitBoxShadowValue,
      submitBoxShadowStyle,
      picker,
      background,
      activateChromePicker,
      submitPickerValue,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-shadow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 100%;
  .shadow-type-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    .shadow-type {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      width: 6.5rem;
      font-size: 0.9rem;
      text-align: center;
      padding: 0.5rem;
      border-radius: 0.4rem;
      margin-left: 0.4rem;
      margin-right: 0.4rem;
      &:hover {
        background-color: #1471ff;
        cursor: pointer;
      }
    }
  }
  .shadow-value-wrapper {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    .shadow-value {
      width: 30%;
      text-align: left;
      margin-right: 7%;
    }
    .shadow-input {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      width: 40%;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-right: 0.4rem;
      text-align: right;
      margin-right: 3%;
      font-size: 1.05rem;
      border-radius: 0.4rem;
    }
    .shadow-option {
      @include auto-text-color;
      @include auto-distinct-bg-color;
      border-radius: 0.4rem;
      padding: 0.4rem;
      width: 20%;
      border: none;
    }
  }
  .shadow-color-box {
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
