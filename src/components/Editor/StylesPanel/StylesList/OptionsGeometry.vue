<template>
  <div id="options-layout">
    <div class="margin-wrapper">
      <input
        v-model="state.marginLeft"
        class="margin-left"
        name="marginLeft"
        @keyup.enter="submitGeometryValue"
      />
      <input
        v-model="state.marginRight"
        class="margin-right"
        name="marginRight"
        @keyup.enter="submitGeometryValue"
      />
      <input
        v-model="state.marginTop"
        class="margin-top"
        name="marginTop"
        @keyup.enter="submitGeometryValue"
      />
      <input
        v-model="state.marginBottom"
        class="margin-bottom"
        name="marginBottom"
        @keyup.enter="submitGeometryValue"
      />
      <div class="padding-wrapper">
        <input
          v-model="state.paddingLeft"
          class="padding-left"
          name="paddingLeft"
          @keyup.enter="submitGeometryValue"
        />
        <input
          v-model="state.paddingRight"
          class="padding-right"
          name="paddingRight"
          @keyup.enter="submitGeometryValue"
        />
        <input
          v-model="state.paddingTop"
          class="padding-top"
          name="paddingTop"
          @keyup.enter="submitGeometryValue"
        />
        <input
          v-model="state.paddingBottom"
          class="padding-bottom"
          name="paddingBottom"
          @keyup.enter="submitGeometryValue"
        />
        <div class="empty-box"></div>
      </div>
    </div>
    <div class="dimension-wrapper">
      <div class="position-wrapper">
        <div class="x-position">X</div>
        <div class="x-position-value">
          {{
            vuex.styleData.target
              ? vuex.styleData.target.getBoundingClientRect().x.toFixed(0)
              : ''
          }}
        </div>
        <div class="y-position">Y</div>
        <div class="y-position-value">
          {{
            vuex.styleData.target
              ? vuex.styleData.target.getBoundingClientRect().y.toFixed(0)
              : ''
          }}
        </div>
      </div>
    </div>
    <div class="input-wrapper">
      <div class="width-box">
        <div class="width-input">Width</div>
        <input
          v-model="state.width.split('px')[0]"
          class="width-input-value"
          name="width"
          @keydown.enter="submitLayoutValue"
        />
        <select v-model="widthSelected" class="width-option">
          <option value="px">px</option>
          <option value="rem">rem</option>
          <option value="em">em</option>
        </select>
      </div>
      <div class="height-box">
        <div class="height-input">Height</div>
        <input
          v-model="state.height.split('px')[0]"
          class="height-input-value"
          name="height"
          @keydown.enter="submitLayoutValue"
        />
        <select v-model="heightSelected" class="height-option">
          <option value="px">px</option>
          <option value="rem">rem</option>
          <option value="em">em</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive, ref } from '@vue/composition-api'
import { useVuex } from '@/modules/vue-hooks'
import replaceCssRules from '@/modules/replace-css-rules'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    /**
     * input 태그를 사용해 value와 style을 css rule에 반영.
     *
     * width와 height 동시에 저장
     */
    function submitLayoutValue() {
      if (vuex.styleData.target) {
        const widthValue = document.querySelector(
          '.width-input-value'
        ) as HTMLElement
        const heightValue = document.querySelector(
          '.height-input-value'
        ) as HTMLElement

        if (!vuex.editorInfo.selectedCssRule) return
        let beforeStatement = 'width'
        vuex.editorInfo.selectedCssRule.style.width =
          (widthValue as HTMLInputElement)?.value + widthSelected.value
        let afterStatement = vuex.editorInfo.selectedCssRule.style.width
        replaceCssRules(beforeStatement, afterStatement)

        beforeStatement = 'height'
        vuex.editorInfo.selectedCssRule.style.height =
          (heightValue as HTMLInputElement)?.value + heightSelected.value
        afterStatement = vuex.editorInfo.selectedCssRule.style.height
        replaceCssRules(beforeStatement, afterStatement)
      }
    }

    // width,height의 v-model value
    const widthSelected = ref('px')
    const heightSelected = ref('px')

    const state: Record<string, string> = reactive({
      marginLeft: '',
      marginRight: '',
      marginTop: '',
      marginBottom: '',
      paddingLeft: '',
      paddingRight: '',
      paddingTop: '',
      paddingBottom: '',
      width: '',
      height: '',
    })

    const geometries = Object.keys(state)

    // vuex.styleData.target에 따라 margin, padding 값 셋팅
    watch(
      () => vuex.styleData.target,
      () => {
        if (vuex.styleData.target) {
          if (vuex.styleData.styleData) {
            for (const geo in geometries) {
              const styleProperty = geometries[geo]
              const styleData = vuex.styleData.styleData as Record<string, any>
              state[geometries[geo]] = styleData[styleProperty]
            }
          }
        } else {
          for (const geo in geometries) {
            state[geometries[geo]] = ''
          }
        }
      }
    )

    /**
     * margin, padding의 input value 값을 css selector에 반영
     */
    function submitGeometryValue(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!vuex.editorInfo.selectedCssRule) return
      const type = target.getAttribute('name')
      if (type) {
        let beforeStatement = ''
        switch (type) {
          case 'paddingLeft':
            beforeStatement = 'padding-left'
            break
          case 'paddingRight':
            beforeStatement = 'padding-right'
            break
          case 'paddingTop':
            beforeStatement = 'padding-top'
            break
          case 'paddingBottom':
            beforeStatement = 'padding-bottom'
            break
          case 'marginLeft':
            beforeStatement = 'margin-left'
            break
          case 'marginRight':
            beforeStatement = 'margin-right'
            break
          case 'marginTop':
            beforeStatement = 'margin-top'
            break
          case 'marginBottom':
            beforeStatement = 'margin-bottom'
            break
        }
        const styleRule = vuex.editorInfo.selectedCssRule.style as Record<
          string | number,
          any
        >
        styleRule[type] = (target as HTMLInputElement)?.value
        const afterStatement = styleRule[type]
        replaceCssRules(beforeStatement, afterStatement)
      }
    }

    return {
      submitLayoutValue,
      vuex,
      state,
      submitGeometryValue,
      geometries,
      widthSelected,
      heightSelected,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#options-layout {
  width: 100%;
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .margin-wrapper {
    background-color: #2e3743;
    width: 85%;
    height: 9rem;
    display: flex;
    margin-top: 0.3rem;

    border: 2px solid #4f4f86;
    border-radius: 0.5rem;
    justify-content: center;
    align-items: center;
    position: relative;
    .margin-left,
    .margin-right,
    .margin-top,
    .margin-bottom {
      color: #53bfff;
      position: absolute;
      width: 40px;
      text-align: center;
      font-size: 0.8rem;
    }
    .margin-right {
      right: 0rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .margin-left {
      left: 0rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .margin-top {
      top: 0rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .margin-bottom {
      bottom: 0rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .padding-wrapper {
      background-color: #333f3a;
      width: 65%;
      height: 5.5rem;
      display: flex;
      border: 2px solid #2f6534;
      border-radius: 0.5rem;
      justify-content: center;
      align-items: center;
      position: relative;
      .padding-left,
      .padding-right,
      .padding-top,
      .padding-bottom {
        color: #81c882;
        position: absolute;
        width: 30px;
        text-align: center;
        font-size: 0.8rem;
      }
      .padding-right {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .padding-left {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .padding-top {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .padding-bottom {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .empty-box {
        width: 55%;
        background-color: #292931;
        height: 2rem;
        border-radius: 0.4rem;
      }
    }
  }
  .dimension-wrapper {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    width: 75%;
    .position-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
      .x-position,
      .y-position {
        @include auto-text-color;
        height: 1.2rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
      .x-position-value,
      .y-position-value {
        font-weight: bold;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
    }
    .size-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .width-text,
      .height-text {
        @include auto-text-color;
        height: 1.2rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
      .width-value,
      .height-value {
        font-weight: bold;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
    }
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .width-box,
    .height-box {
      display: flex;
      align-items: center;
      justify-content: center;
      display: flex;
      width: 90%;
      flex-direction: row;
      height: 2rem;
      // position: relative;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      .width-input,
      .height-input {
        color: #868686;
        text-align: center;
        width: 30%;
        margin-right: 5%;
      }
      .width-input-value,
      .height-input-value {
        @include auto-text-color;
        @include auto-distinct-bg-color;
        width: 40%;
        border-radius: 0.4rem;
        padding: 0.4rem;
        margin-right: 2%;
        text-align: right;
      }
      .width-option,
      .height-option {
        @include auto-text-color;
        @include auto-distinct-bg-color;
        border-radius: 0.4rem;
        padding: 0.4rem;
        width: 23%;
        border: none;
      }
    }
  }
}
</style>
