<template>
  <div id="options-filter">
    <div class="opacity-wrapper">
      <div class="opacity-text">{{ state.opacity.name }}</div>
      <!-- <range-slider
        v-model="$store.state.styleData.styleData[state.opacity.type]"
        class="filter-slider"
        min="state.opacity.min"
        max="state.opacity.max"
        step="state.opacity.step"
        name="state.opacity.name"
        submit-sorce-style="state.opacity.name"
        @input="state.opacity.onInput"
      />
      <input
        class="opacity-input"
        :placeholder="$store.state.styleData.styleData[state.opacity.type]"
      /> -->
    </div>
    <div v-for="(filter, i) in state.filters" :key="i" class="filter-wrapper">
      <div class="filter-text">{{ filter.name }}</div>
      <!-- <range-slider
        class="filter-slider"
        min="filter.min"
        max="filter.max"
        step="filter.step"
        name="filter.type"
        submit-sorce-style="filter.name"
        @input="filter.onInput"
      /> -->
      <input class="filter-input" :placeholder="filter.setValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      opacity: {
        name: 'Opacity',
        type: 'opacity',
        min: 0,
        max: 1,
        step: 0.01,
        vModel: '',
        onInput: () => {},
      },
      filters: [
        {
          name: 'Blur',
          type: 'filter',
          RegExp: /blur\((.*?)\)/g,
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Brightness',
          type: 'filter',
          RegExp: /filter\((.*?)\)/g,
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Constrast',
          type: 'filter',
          RegExp: /contrast\((.*?)\)/g,
          min: 0,
          max: 200,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Grayscale',
          type: 'filter',
          RegExp: /grayscale\((.*?)\)/g,
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Hue',
          type: 'filter',
          RegExp: /hue\((.*?)\)/g,
          min: 0,
          max: 360,
          step: 3,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Invert',
          type: 'filter',
          RegExp: /invert\((.*?)\)/g,
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Saturate',
          type: 'filter',
          RegExp: /saturate\((.*?)\)/g,
          min: 0,
          max: 200,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
        {
          name: 'Sepia',
          type: 'filter',
          RegExp: /sepia\((.*?)\)/g,
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {},
        },
      ],
    })

    return {
      state,
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
    margin-top: 0.3rem;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    .opacity-text {
      font-size: 0.9rem;
      text-align: center;
      width: 7rem;
      margin-right: 0.5rem;
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
      width: 3.5rem;
    }
  }

  .filter-wrapper {
    display: flex;
    margin-bottom: 0.3rem;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .filter-text {
      font-size: 0.9rem;
      text-align: center;
      width: 7rem;
      margin-right: 0.5rem;
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
      width: 3.5rem;
    }
  }
}
</style>
