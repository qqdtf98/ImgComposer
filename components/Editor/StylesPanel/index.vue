<template>
  <span>
    <div
      id="styles-panel"
      :class="mergeClassNames(state.collapsed && 'collapsed')"
    >
      <h1 class="header" @click="setStyleData">
        <span>Styles</span>
        <button class="collapse-btn" @click="togglePanel">
          <i class="icon-arrowhead-right" />
        </button>
      </h1>
      <div class="layout-tab-box">
        <div class="layout-tab" @click="changeTab">Options</div>
        <div class="layout-tab" @click="changeTab">Animation</div>
      </div>
      <vue-custom-scrollbar class="layout-scroll-area">
        <StylesAnimation v-if="!show.showOptions" />
        <StylesOption v-else class="layout-options" />
      </vue-custom-scrollbar>
    </div>

    <button
      class="uncollapse-btn"
      :class="state.collapsed && 'visible'"
      @click="togglePanel"
    >
      <i class="icon-arrowhead-left" />
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import StylesAnimation from './StylesAnimation/index.vue'
import StylesOption from './StylesOption/index.vue'
import mergeClassNames from '@/modules/merge-class-names'
import useVuex from '@/modules/vue/use-vuex'

export default defineComponent({
  components: { vueCustomScrollbar, StylesAnimation, StylesOption },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    function setStyleData(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target) {
        vuex.styleData.SET_STYLE_DATA(getComputedStyle(target))
        vuex.styleData.SET_TARGET(target)
      }
    }

    const state = reactive({
      collapsed: false, // Whether the panel is collapsed or not
    })

    // Collapse/uncollapse the styles panel
    function togglePanel() {
      state.collapsed = !state.collapsed
    }

    const show = reactive({
      showOptions: true,
    })

    onMounted(() => {
      const tab = document.querySelector('.layout-tab') as HTMLElement
      tab.style.backgroundColor = '#4e4e5c'
    })

    function changeTab(e: MouseEvent) {
      const tabs: NodeListOf<HTMLElement> = document.querySelectorAll(
        '.layout-tab'
      )
      const target = e.target
      if (target instanceof HTMLElement) {
        const trimmedString = target.textContent
          ? target.textContent.trim()
          : ''

        if (trimmedString === 'Options') {
          tabs[0].style.backgroundColor = '#4e4e5c'
          tabs[1].style.backgroundColor = '#292931'
          show.showOptions = true
        } else if (trimmedString === 'Animation') {
          tabs[1].style.backgroundColor = '#4e4e5c'
          tabs[0].style.backgroundColor = '#292931'
          show.showOptions = false
        }
      }
    }

    return {
      state,
      mergeClassNames,
      togglePanel,
      changeTab,
      show,
      vuex,
      setStyleData,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#styles-panel {
  position: fixed;
  top: $menu-bar-height;
  right: 0;
  bottom: 0;
  @include auto-bg-color;
  border-left: 1px solid;
  @include auto-border-color;
  width: 280px;
  transition: transform 300ms ease;

  &.collapsed {
    transform: translateX(100%);
  }

  .header {
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid;
    @include auto-border-color;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .collapse-btn {
      font-size: 20px;
      display: flex;
      @include auto-text-color;
      transition: background-color $default-transition-time ease;
      padding: 5px;
      border-radius: 5px;
      margin-right: -5px;

      &:hover {
        @include auto-distinct-bg-color;
      }
    }
  }
  .layout-tab-box {
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: row;
    .layout-tab {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      width: 5.5rem;
      text-align: center;
      padding-top: 0.4rem;
      height: 100%;
      &:hover {
        color: #d3d3d3;
        cursor: pointer;
      }
    }
  }
  .layout-scroll-area {
    height: calc(85% - 0.6rem);
    .layout-options {
      height: 100%;
    }
  }
}

.uncollapse-btn {
  position: fixed;
  top: $menu-bar-height;
  right: 0;
  display: none;
  @include auto-text-color;
  @include auto-distinct-bg-color;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: 0 0 0 5px;
  padding: 10px;
  transform: translateX(100%);
  transition: transform $default-transition-time ease;

  &.visible {
    transform: translateX(0%);
    transition-delay: $default-transition-time;
  }
}
</style>
