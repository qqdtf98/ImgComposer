<template>
  <div id="options-opacity">
    <div class="opacity-wrapper">
      <div class="slider-wrapper" @mousemove="setValuePosition">
        <!-- TODO opacity값 소수점 한자리만 표시 -->
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
      </div>
      <div
        v-show="valueState"
        class="opacity-value"
        @keyup.enter="submitOpacityInputValue"
      >
        {{ opacityValues.opacity }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from '@vue/composition-api'
import { useVuex, useNextTick } from '@/modules/vue-hooks'
import RangeSlider from 'vue-range-slider'

export default defineComponent({
  components: { RangeSlider },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)
    const vuex = useVuex(ctx)

    // opacity의 static한 값. slider에 사용됨.
    const opacityOptions = {
      name: 'opacity',
      min: 0,
      max: 1,
      step: 0.1,
    }

    // opacity의 slider v-model 변수로 사용.
    const opacityValues: Record<string, string> = reactive({
      opacity: '1',
    })

    const valueState = ref(false)

    // range-slider에 마우스 오버 시 opacity-value 보이게 함
    function setValuePosition(e: MouseEvent) {
      if (vuex.styleData.target) {
        const target = e.target as HTMLElement
        const knob = target.querySelector('.range-slider-knob') as HTMLElement

        if (!knob) return
        if (vuex.styleData.target) {
          valueState.value = true
          const value = document.querySelector('.opacity-value') as HTMLElement
          const rect = knob.getBoundingClientRect()
          value.style.left = rect.left + 'px'
          value.style.top = rect.top + 20 + 'px'
        }
      }
    }

    watch(
      () => vuex.styleData.styleData,
      () => {
        // iframe에서 element를 선택할 때마다 filter의 값을 변경함.
        if (vuex.styleData.styleData) {
          opacityValues.opacity = vuex.styleData.styleData.opacity
            ? parseFloat(vuex.styleData.styleData.opacity).toFixed(1)
            : '1'
        } else {
          opacityValues.opacity = '1'
        }
      }
    )

    // range-slider를 사용하여 opacity값을 변경할 때 changedData 저장
    function submitOpacityValue(value: number) {
      const changedData = {
        style: 'opacity',
        value,
      }
      vuex.styleData.SET_CHANGED_DATA(changedData)
    }

    // input을 사용하여 opacity값을 변경할 때 changedData 저장
    function submitOpacityInputValue(e: InputEvent) {
      const target = e.target as HTMLElement
      const changedData = {
        style: 'opacity',
        value: (target as HTMLInputElement)?.value,
      }
      vuex.styleData.SET_CHANGED_DATA(changedData)
    }

    return {
      opacityValues,
      opacityOptions,
      submitOpacityValue,
      submitOpacityInputValue,
      valueState,
      setValuePosition,
    }
  },
})
</script>
<style lang="scss">
#options-opacity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 100%;

  .opacity-wrapper {
    display: flex;
    margin-bottom: 0.3rem;
    justify-content: center;
    flex-direction: row;
    margin-top: 0.3rem;
    align-items: center;
    width: 100%;

    .slider-wrapper {
      width: 100%;
      .filter-slider {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

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
    }

    .opacity-value {
      background: none;
      border: none;
      position: fixed;
      padding-right: 0.3rem;
      padding-left: 0.3rem;
      font-size: 0.9rem;
      border-radius: 0.2rem;
      border-bottom: 1px solid #768ea7;
      background-color: #8fcf65;
    }
  }
}
</style>
