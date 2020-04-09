<template>
  <div id="options-filter">
    <div class="opacity-wrapper">
      <div class="opacity-text">{{ opacityOptions.name }}</div>
      <range-slider
        v-model="opacityValues.opacity"
        class="filter-slider"
        :min="opacityOptions.min"
        :max="opacityOptions.max"
        :step="opacityOptions.step"
        :name="opacityOptions.name"
        submit-sorce-style="opacityOptions.name"
        @input="submitOpacityValue"
      />
      <input
        v-model="opacityValues.opacity"
        class="opacity-input"
        @keyup.enter="submitOpacityInputValue"
      />
    </div>
    <div v-for="(filter, i) in filters" :key="i" class="filter-wrapper">
      <div class="filter-text">{{ filter }}</div>
      <range-slider
        v-model="sliderValues[filter]"
        class="filter-slider"
        :min="filterOptions[filter].min"
        :max="filterOptions[filter].max"
        :step="filterOptions[filter].step"
        :name="filter"
        submit-sorce-style="filter"
        @input="submitFilterValue($event, filter)"
      />
      <input
        v-model="sliderValues[filter]"
        class="filter-input"
        @keyup.enter="submitFilterInputValue($event, filter)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import 'vue-range-slider/dist/vue-range-slider.scss'
import RangeSlider from 'vue-range-slider'
import { useVuex } from '@/modules/vue-hooks'

export default defineComponent({
  components: { RangeSlider },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    // opacity의 static한 값. slider에 사용됨.
    const opacityOptions = {
      name: 'opacity',
      min: 0,
      max: 1,
      step: 0.1,
    }

    // filter property의 static한 값. slider에 사용됨
    const filterOptions: Record<
      string,
      {
        regExp: RegExp
        min: number
        max: number
        step: number
      }
    > = {
      blur: {
        regExp: /blur\((.*?)\)/g,
        min: 0,
        max: 30,
        step: 1,
      },
      brightness: {
        regExp: /brightness\((.*?)\)/g,
        min: 0,
        max: 100,
        step: 5,
      },
      contrast: {
        regExp: /contrast\((.*?)\)/g,
        min: 0,
        max: 200,
        step: 5,
      },
      grayscale: {
        regExp: /grayscale\((.*?)\)/g,
        min: 0,
        max: 1,
        step: 0.1,
      },
      hue: {
        regExp: /hue\((.*?)\)/g,
        min: 0,
        max: 360,
        step: 3,
      },
      invert: {
        regExp: /invert\((.*?)\)/g,
        min: 0,
        max: 100,
        step: 1,
      },
      saturate: {
        regExp: /saturate\((.*?)\)/g,
        min: 0,
        max: 100,
        step: 1,
      },
      sepia: {
        regExp: /sepia\((.*?)\)/g,
        min: 0,
        max: 100,
        step: 1,
      },
    }

    const filters = Object.keys(filterOptions)

    // filter의 slider v-model로 사용됨. input에 따라 변한다.
    const sliderValues: Record<string, number> = reactive({
      blur: 0,
      brightness: 0,
      contrast: 0,
      grayscale: 0,
      hue: 0,
      invert: 0,
      saturate: 0,
      sepia: 0,
    })

    const sliders = Object.keys(sliderValues)

    // opacity의 slider v-model 변수로 사용.
    const opacityValues: Record<string, number> = reactive({
      opacity: 1,
    })

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
            // ?? 한번씩 번갈아가면서 바뀜
            console.log(
              filterOptions[filter].regExp.exec(vuex.styleData.styleData.filter)
            )
            sliderValues[filter] = value ? parseFloat(value[1]) : 0
          }
          opacityValues.opacity = vuex.styleData.styleData.opacity
            ? parseFloat(vuex.styleData.styleData.opacity)
            : 1
        } else {
          opacityValues.opacity = 1
          for (const slider in sliders) {
            sliderValues[sliders[slider]] = 0
          }
        }
      }
    )

    // range-slider를 사용하여 opacity값을 변경할 때 changedData 저장
    function submitOpacityValue(value: number) {
      const changedData = {
        payload: vuex.styleData.target,
        style: 'opacity',
        value,
      }
      vuex.styleData.SET_CHANGED_DATA(changedData)
    }

    // input을 사용하여 opacity값을 변경할 때 changedData 저장
    function submitOpacityInputValue(e: InputEvent) {
      const target = e.target as HTMLElement
      const changedData = {
        payload: vuex.styleData.target,
        style: 'opacity',
        value: (target as HTMLInputElement)?.value,
      }
      vuex.styleData.SET_CHANGED_DATA(changedData)
    }

    // range-slider를 사용하여 filter값을 변경할 때 filter 종류에 따라 changedData 저장
    function submitFilterValue(value: number, filter: string) {
      const changedData = {
        payload: vuex.styleData.target,
        style: filter,
        value,
      }
      vuex.styleData.SET_CHANGED_DATA(changedData)
    }

    // input을 사용하여 filter값을 변경할 때 filter 종류에 따라 changedData 저장
    function submitFilterInputValue(e: InputEvent, filter: string) {
      const target = e.target as HTMLElement
      const changedData = {
        payload: vuex.styleData.target,
        style: filter,
        value: (target as HTMLInputElement)?.value,
      }
      vuex.styleData.SET_CHANGED_DATA(changedData)
    }

    return {
      vuex,
      filterOptions,
      filters,
      sliderValues,
      opacityOptions,
      opacityValues,
      submitOpacityValue,
      submitFilterValue,
      submitOpacityInputValue,
      submitFilterInputValue,
    }
  },
})
</script>

<style lang="scss">
#options-filter {
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .opacity-wrapper {
    display: flex;
    margin-bottom: 0.3rem;
    justify-content: center;
    flex-direction: row;
    margin-top: 0.3rem;
    align-items: center;
    width: 100%;
    .opacity-text {
      font-size: 0.9rem;
      text-align: center;
      width: 7rem;
      color: #868686;
    }
    .filter-slider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 6rem);
      .range-slider-inner {
        width: 100%;
      }
      .range-slider-inner {
        width: 70%;
      }
      .range-slider-knob {
        width: 13px !important;
        height: 13px !important;
      }
    }
    .opacity-input {
      background: none;
      border: none;
      border-bottom: 1px solid #768ea7;
      width: 2.5rem;
    }
  }

  .filter-wrapper {
    display: flex;
    margin-bottom: 0.3rem;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-top: 0.3rem;
    width: 100%;
    .filter-text {
      font-size: 0.9rem;
      text-align: center;
      width: 7rem;
      color: #868686;
    }
    .filter-slider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 6rem);
      .range-slider-inner {
        width: 100%;
      }
      .range-slider-inner {
        width: 70%;
      }
      .range-slider-knob {
        width: 13px !important;
        height: 13px !important;
      }
    }
    .filter-input {
      background: none;
      border: none;
      border-bottom: 1px solid #768ea7;
      width: 2.5rem;
    }
  }
}
</style>
