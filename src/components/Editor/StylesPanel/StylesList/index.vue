<template>
  <div id="layout-options">
    <div v-for="(style, i) in styles" :key="i" class="layout-list-box">
      <div class="layout-list">
        <div class="layout-text">{{ style }}</div>
        <img class="layout-icon" src="@/assets/images/down.svg" />
      </div>
      <div class="nested">
        <OptionsDisplay v-if="style === 'Display'" />
        <OptionsPosition v-if="style === 'Position'" />
        <OptionsLayout v-if="style === 'Geometry'" />
        <OptionsBackground v-if="style === 'Background Color'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import OptionsFilter from './OptionsFilter.vue'
import OptionsBackground from './OptionsBackground.vue'
import OptionsFont from './OptionsFont.vue'
import OptionsPosition from './OptionsPosition.vue'
import OptionsDisplay from './OptionsDisplay.vue'
import OptionsLayout from './OptionsLayout.vue'

export default defineComponent({
  components: {
    OptionsBackground,
    OptionsFilter,
    OptionsFont,
    OptionsLayout,
    OptionsDisplay,
    OptionsPosition,
  },
  setup() {
    onMounted(() => {
      const toggler = document.getElementsByClassName('layout-list')
      let i
      let j
      for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function (e) {
          let target = e.target as HTMLElement
          if (target.className !== 'layout-list') {
            target = (e.target as HTMLElement).closest(
              '.layout-list'
            ) as HTMLElement
          }

          if (target.parentElement) {
            if (target.parentElement.children[1] instanceof HTMLElement) {
              target.parentElement.children[1].style.transition =
                'all 300ms ease'
              target.children[1].classList.toggle('icon-rotate')
              target.parentElement.children[1].classList.toggle('active')
              for (
                j = 0;
                j < target.parentElement.children[1].children.length;
                j++
              ) {
                target.parentElement.children[1].children[j].classList.add(
                  'template'
                )
              }
            }
          }
        })
      }
    })

    const styles: string[] = [
      'Position',
      'Display',
      'Geometry',
      'Background Color',
      'Border',
    ]

    return {
      styles,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#layout-options {
  .layout-list-box {
    text-align: left;
    border-bottom: 1px solid #000000;
    padding: 0.5rem;
    min-height: 50px;

    .layout-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 0.4rem;
      min-height: 30px;
      position: relative;
      @include auto-text-color;
      cursor: pointer;
      letter-spacing: 0.3px;
      font-weight: 450;
      user-select: none; /* Prevent text selection */
      transition: all 300ms ease;
      .layout-text {
        position: absolute;
        left: 0;
      }
      .layout-icon {
        width: 1rem;
        position: absolute;
        right: 0;
      }
    }
    .layout-list::before {
      @include auto-text-color;
      display: inline-block;
      margin-right: 6px;
    }
    .layout-list-down::before {
      transform: rotate(90deg);
    }
    .nested {
      display: none;
    }
    .active {
      display: flex;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .icon-rotate {
      transform: rotate(180deg);
    }
    .template {
      @include auto-text-color;
    }
    .template::before {
      margin-right: 0.2rem;
    }
  }
}
</style>
