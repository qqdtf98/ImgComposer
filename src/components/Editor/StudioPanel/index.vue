<template>
  <span>
    <div
      id="studio-panel"
      :class="mergeClassNames(state.collapsed && 'collapsed')"
    >
      <h1 class="header">
        <span>Studio</span>
        <button class="collapse-btn" @click="togglePanel">
          <i class="icon-arrowhead-left" />
        </button>
      </h1>
      <StudioTemplateList />
    </div>

    <button
      class="studio-uncollapsed-btn"
      :class="state.collapsed && 'visible'"
      @click="togglePanel"
    >
      <i class="icon-arrowhead-right" />
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import mergeClassNames from '@/modules/merge-class-names'
import StudioTemplateList from '@/components/Editor/StudioPanel/StudioTemplateList/index.vue'

export default defineComponent({
  components: {
    StudioTemplateList,
  },
  setup() {
    const state = reactive({
      collapsed: true,
    })

    function togglePanel() {
      state.collapsed = !state.collapsed
    }

    return { state, togglePanel, mergeClassNames }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#studio-panel {
  position: fixed;
  top: $menu-bar-height;
  bottom: 0;
  left: 0;
  @include auto-bg-color;
  border-right: 1px solid;
  @include auto-border-color;
  width: 280px;
  transition: transform 300ms ease;

  &.collapsed {
    transform: translateX(-100%);
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
  .studio-template {
    width: 100%;
  }
}
.studio-uncollapsed-btn {
  position: fixed;
  left: 0;
  display: none;
  @include auto-text-color;
  @include auto-distinct-bg-color;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: 0 0 5px 0;
  padding: 10px;
  transform: translateX(-100%);
  transition: transform $default-transition-time ease;

  &.visible {
    transform: translateX(0%);
    transition-delay: $default-transition-time;
  }
}
</style>
