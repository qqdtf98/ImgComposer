<template>
  <div id="layout-options">
    <div
      v-for="(style, i) in styles"
      :key="i"
      state="false"
      class="layout-list-box"
    >
      <div class="layout-list">
        <div class="layout-text">{{ style }}</div>
        <img class="layout-icon" src="@/assets/images/down.svg" />
      </div>
      <div class="nested active">
        <OptionsDisplay v-if="style === 'Display'" class="template" />
        <OptionsPosition v-if="style === 'Position'" class="template" />
        <OptionsGeometry v-if="style === 'Geometry'" class="template" />
        <OptionsBackground
          v-if="style === 'Background Color'"
          class="template"
        />
        <OptionsBorder v-if="style === 'Border'" class="template" />
        <OptionsOpacity v-if="style === 'Opacity'" class="template" />
        <OptionsShadow v-if="style === 'Shadow'" class="template" />
        <OptionsFilter v-if="style === 'Filter'" class="template" />
        <OptionsText v-if="style === 'Text'" class="template" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import OptionsFilter from './OptionsFilter.vue'
import OptionsBackground from './OptionsBackground.vue'
import OptionsText from './OptionsText.vue'
import OptionsPosition from './OptionsPosition.vue'
import OptionsDisplay from './OptionsDisplay.vue'
import OptionsGeometry from './OptionsGeometry.vue'
import OptionsBorder from './OptionsBorder.vue'
import OptionsOpacity from './OptionsOpacity.vue'
import OptionsShadow from './OptionsShadow.vue'

export default defineComponent({
  components: {
    OptionsBackground,
    OptionsFilter,
    OptionsText,
    OptionsGeometry,
    OptionsDisplay,
    OptionsPosition,
    OptionsBorder,
    OptionsOpacity,
    OptionsShadow,
  },
  setup() {
    onMounted(() => {
      const toggler = document.getElementsByClassName('layout-list')
      let i
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
              target.children[1].classList.toggle('icon-rotate')
              if (target.parentElement.getAttribute('state') === 'true') {
                target.parentElement.setAttribute('state', 'false')
                target.parentElement.style.height = '50px'
              } else {
                target.parentElement.setAttribute('state', 'true')
                let newHeight = 20
                let i
                for (i = 0; i < target.parentElement.children.length; i++) {
                  newHeight += target.parentElement.children[
                    i
                  ].getBoundingClientRect().height
                }
                target.parentElement.style.height = newHeight + 'px'
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
      'Opacity',
      'Shadow',
      'Filter',
      'Text',
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
    overflow: hidden;
    height: 50px;
    transition: height 0.3s ease;

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
        font-weight: 700;
        position: absolute;
        left: 0;
      }

      .layout-icon {
        height: 7px;
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
