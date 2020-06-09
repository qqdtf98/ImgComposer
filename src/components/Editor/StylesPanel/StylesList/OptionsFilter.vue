<template>
  <div id="options-filter">
    <div v-for="(filter, i) in filters" :key="i" class="filter-wrapper">
      <div class="filter-text">{{ filter }}</div>
      <input
        v-model="sliderValues[filter]"
        class="filter-input"
        :unit="filterOptions[filter].unit"
        @keyup.enter="submitFilterInputValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import 'vue-range-slider/dist/vue-range-slider.scss'
// import RangeSlider from 'vue-range-slider'
import { useVuex } from '@/modules/vue-hooks'
import replaceCssRules from '@/modules/replace-css-rules'

export default defineComponent({
  // components: { RangeSlider },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    // filter property의 static한 값. slider에 사용됨.
    // 각 filter에 따라 단위를 unit에 저장.
    const filterOptions: Record<
      string,
      {
        regExp: RegExp
        unit: string
      }
    > = {
      blur: {
        regExp: /blur\((.*?)\)/g,
        unit: 'px',
      },
      brightness: {
        regExp: /brightness\((.*?)\)/g,
        unit: '',
      },
      contrast: {
        regExp: /contrast\((.*?)\)/g,
        unit: '%',
      },
      grayscale: {
        regExp: /grayscale\((.*?)\)/g,
        unit: '%',
      },
      invert: {
        regExp: /invert\((.*?)\)/g,
        unit: '%',
      },
      saturate: {
        regExp: /saturate\((.*?)\)/g,
        unit: '%',
      },
      sepia: {
        regExp: /sepia\((.*?)\)/g,
        unit: '%',
      },
    }

    const filters = Object.keys(filterOptions)

    // filter의 slider v-model로 사용됨. input에 따라 변한다.
    const sliderValues: Record<string, number> = reactive({
      blur: 0,
      brightness: 0,
      contrast: 1,
      grayscale: 0,
      hue: 0,
      invert: 0,
      saturate: 1,
      sepia: 0,
    })

    const sliders = Object.keys(sliderValues)

    watch(
      () => vuex.styleData.styleData,
      () => {
        // iframe에서 element를 선택할 때마다 filter의 값을 변경함.
        if (vuex.styleData.styleData) {
          // filter의 property에 따라 value 설정
          for (const filter of filters) {
            const value = filterOptions[filter].regExp.exec(
              vuex.styleData.styleData.filter
            )

            // Regular Expression에는 state가 존재하기 때문에 exec가 중첩돼서 실행.
            // 매치되지 않을 때 null을 리턴하고 lastIndex가 초기화됩니다.
            // 임의로 0으로 리셋 가능.
            filterOptions[filter].regExp.lastIndex = 0
            if (
              filter === 'contrast' ||
              filter === 'saturate' ||
              filter === 'brightness'
            ) {
              sliderValues[filter] = value ? parseFloat(value[1]) : 1
            } else {
              sliderValues[filter] = value ? parseFloat(value[1]) : 0
            }
          }
        } else {
          for (const slider in sliders) {
            if (
              sliders[slider] === 'contrast' ||
              sliders[slider] === 'saturate' ||
              sliders[slider] === 'brightness'
            ) {
              console.log('??')
              sliderValues[sliders[slider]] = 1
            } else {
              sliderValues[sliders[slider]] = 0
            }
          }
        }
      }
    )

    /**
     * input을 사용하여 filter값을 변경할 때 filter 종류에 따라 css rule에 반영
     */
    function submitFilterInputValue(e: InputEvent) {
      if (vuex.styleData.target) {
        const inputValue = document.querySelectorAll(
          '.filter-input'
        ) as NodeListOf<HTMLInputElement>
        if (!vuex.editorInfo.selectedCssRule) return
        let i
        let filterValue = ''
        for (i = 0; i < inputValue.length; i++) {
          filterValue =
            filterValue + filters[i] + '(' + inputValue[i].value + ')' + ' '
        }
        // TODO filter 기능 수정 필요
        const beforeStatement = 'filter'
        vuex.editorInfo.selectedCssRule.style.filter = filterValue
        console.log(filterValue)
        const afterStatement = filterValue
        console.log(beforeStatement)
        console.log(afterStatement)
        replaceCssRules(beforeStatement, afterStatement)
      }
    }

    return {
      vuex,
      filterOptions,
      filters,
      sliderValues,
      submitFilterInputValue,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-filter {
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .filter-wrapper {
    display: flex;
    margin-bottom: 0.3rem;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-top: 0.3rem;
    position: relative;
    height: 1.2rem;
    width: 80%;
    .filter-text {
      position: absolute;
      left: 0;
      font-size: 0.9rem;
      text-align: left;
      width: 7rem;
      color: #868686;
    }
    .filter-input {
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
    }
  }
}
</style>
