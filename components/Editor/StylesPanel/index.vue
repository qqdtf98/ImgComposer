<template>
  <span>
    <div
      id="styles-panel"
      :class="mergeClassNames(state.collapsed && 'collapsed')"
    >
      <h1 class="header">
        <span>Styles</span>
        <button class="collapse-btn" @click="togglePanel">
          <i class="icon-arrowhead-right" />
        </button>
      </h1>

      <div class="tools-container"></div>
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
import { defineComponent, reactive } from '@vue/composition-api'
import mergeClassNames from '@/modules/merge-class-names'

export default defineComponent({
  setup() {
    const state = reactive({
      collapsed: false, // Whether the panel is collapsed or not
    })

    // Collapse/uncollapse the styles panel
    function togglePanel() {
      state.collapsed = !state.collapsed
    }

    return {
      state,
      mergeClassNames,
      togglePanel,
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
