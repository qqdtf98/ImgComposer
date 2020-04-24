<template>
  <div id="component-data" @mousedown.stop>
    <div class="component-basic-data">
      <div class="color-name-select">
        <button
          ref="chromePicker"
          class="chrome-picker"
          @click="activateChromePicker"
        />
        <input
          ref="compoName"
          class="component-name"
          @keyup.enter="setComponentName"
        />
      </div>
      <img class="component-data-add" src="@/assets/images/add.svg" />
      <img class="component-data-fold" src="@/assets/images/fold.svg" />
    </div>
    <div class="chrome-wrapper" @mouseup="setPickerValue">
      <chrome-color
        v-show="picker.isChromePicker"
        v-model="background.backgroundColor"
        class="picker"
        :value="background.backgroundColor"
        @input="getPickerValue"
      ></chrome-color>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { Chrome } from 'vue-color'
import { VueColor } from '@/types/vue-color'
import { useVuex, useNextTick } from '@/modules/vue-hooks'

export default defineComponent({
  components: { ChromeColor: Chrome },
  setup(props, ctx) {
    const nextTick = useNextTick(ctx)

    const picker = reactive({
      isChromePicker: false,
    })

    const background = reactive({
      backgroundColor: '#000',
    })

    function getPickerValue(color: VueColor) {
      pickerValue.value = color.hex
    }

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

    const componentName = ref('')

    function setComponentName(e: InputEvent) {
      e.preventDefault()
      const target = e.target as HTMLInputElement
      console.log(target.value)
      componentName.value = target.value
    }

    const chromePicker = ref<HTMLElement>(null)
    const compoName = ref<HTMLElement>(null)
    const pickerValue = ref('')

    function setPickerValue(e: MouseEvent) {
      console.log(pickerValue.value)
      if (!chromePicker.value) return
      if (!compoName.value) return
      chromePicker.value.style.backgroundImage = 'none'
      chromePicker.value.style.backgroundColor = pickerValue.value
      compoName.value.style.color = pickerValue.value
    }

    return {
      picker,
      background,
      getPickerValue,
      activateChromePicker,
      setComponentName,
      componentName,
      chromePicker,
      compoName,
      setPickerValue,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#component-data {
  margin-top: 0.5rem;
  .component-basic-data {
    display: flex;
    flex-direction: row;
    align-items: center;
    .color-name-select {
      display: flex;
      flex-direction: row;
      background-color: #fff;
      box-shadow: 0px 0px 1px 1px #888888;
      border-radius: 0.25rem;
      align-items: center;
      height: 2rem;

      .chrome-picker {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.3rem;
        margin-left: 0.5rem;
      }
      .component-name {
        height: 1.5rem;
        margin-left: 0.5rem;
        width: 4rem;
      }
    }
    .component-data-add,
    .component-data-fold {
      background-color: #fff;
      box-shadow: 0px 0px 1px 1px #888888;
      border-radius: 0.25rem;
      height: 2rem;
      width: 2rem;
      padding: 0.65rem;
      margin-left: 0.5rem;
      &:hover {
        cursor: pointer;
        background-color: #dfdfdf;
      }
    }
  }
  .chrome-wrapper {
    .picker {
      margin-top: 0.5rem;
    }
  }
}
</style>
