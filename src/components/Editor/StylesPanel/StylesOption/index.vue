<template>
  <div id="layout-options">
    <div class="layout-list-box">
      <div class="layout-list">layout</div>
      <div class="nested">
        <OptionsLayout />
      </div>
    </div>
    <div class="layout-list-box">
      <div class="layout-list">background</div>
      <div class="nested">
        <OptionsBackground />
      </div>
    </div>
    <div class="layout-list-box">
      <div class="layout-list">font</div>
      <div class="nested">
        <OptionsFont />
      </div>
    </div>
    <div class="layout-list-box">
      <div class="layout-list">filter</div>
      <div class="nested">
        <OptionsFilter />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import OptionsFilter from './OptionsFilter.vue'
import OptionsBackground from './OptionsBackground.vue'
import OptionsFont from './OptionsFont.vue'
import OptionsLayout from './OptionsLayout.vue'

export default defineComponent({
  components: { OptionsBackground, OptionsFilter, OptionsFont, OptionsLayout },
  setup() {
    onMounted(() => {
      const toggler = document.getElementsByClassName('layout-list')
      let i
      let j
      for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function (e) {
          const target = e.target as HTMLElement
          if (target.parentElement) {
            if (target.parentElement.children[1] instanceof HTMLElement) {
              target.parentElement.children[1].style.transition =
                'all 300ms ease'
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

    return {}
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#layout-options {
  .layout-list-box {
    text-align: left;
    // margin: 0.3rem;
    border-top: 1px solid #333538;
    border-bottom: 1px solid #333538;
    padding: 0.5rem;
    .layout-list {
      margin-left: 0.4rem;
      @include auto-text-color;
      cursor: pointer;
      user-select: none; /* Prevent text selection */
      transition: all 300ms ease;
    }
    .layout-list::before {
      content: '\FF1E';
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
    .template {
      @include auto-text-color;
    }
    .template::before {
      margin-right: 0.2rem;
    }
  }
}
</style>
