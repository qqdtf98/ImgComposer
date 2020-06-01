<template>
  <span ref="stylePanel">
    <div
      id="styles-panel"
      :class="mergeClassNames(state.collapsed && 'collapsed')"
    >
      <h1 class="header">
        <div class="styles-and-selector">
          <span>Styles</span>
          <div v-show="selectorSelected" class="selector-value">
            {{ selectorValue }}
          </div>
        </div>
        <button class="collapse-btn" @click="togglePanel">
          <i class="icon-arrowhead-right" />
        </button>
      </h1>
      <div class="wrapper">
        <div class="wrap1"></div>
        <div class="wrap2"></div>
        <div class="wrap3"></div>
      </div>
      <vue-custom-scrollbar class="layout-scroll-area">
        <StylesList class="layout-options" />
      </vue-custom-scrollbar>
      <FileListPanel />
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
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  watch,
} from '@vue/composition-api'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import FileListPanel from '@/components/Editor/FileListPanel/index.vue'
import StylesList from '@/components/Editor/StylesPanel/StylesList/index.vue'
import mergeClassNames from '@/modules/merge-class-names'
import { useVuex } from '@/modules/vue-hooks'
import { Cem } from '@/modules/custom-events-manager'

export default defineComponent({
  components: { vueCustomScrollbar, StylesList, FileListPanel },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const stylePanel = ref<HTMLElement>(null)

    const state = reactive({
      collapsed: false, // Whether the panel is collapsed or not
    })

    // Collapse/uncollapse the styles panel
    function togglePanel() {
      state.collapsed = !state.collapsed
    }

    onMounted(() => {
      // marker를 생성했을 때 styles 닫기
      Cem.addEventListener(
        'onmarkerschange',
        stylePanel.value as HTMLElement,
        (e) => {
          state.collapsed = true
        }
      )

      // marker를 해제했을 때 styles 닫기
      Cem.addEventListener(
        'deactivatecontext',
        stylePanel.value as HTMLElement,
        (e) => {
          state.collapsed = true
        }
      )

      // selector를 선택했을 때 styles 열기
      Cem.addEventListener(
        'openstyles',
        stylePanel.value as HTMLElement,
        (e) => {
          state.collapsed = false
          selectorSelected.value = true
          if (!vuex.editorInfo.selectedCssRule) return
          selectorValue.value = vuex.editorInfo.selectedCssRule.selectorText
        }
      )
    })

    const selectorValue = ref('')

    const selectorSelected = ref(false)

    return {
      state,
      mergeClassNames,
      togglePanel,
      vuex,
      stylePanel,
      selectorSelected,
      selectorValue,
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

  .styles-and-selector {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .header {
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid;
    @include auto-border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    min-height: 70px;

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

    .selector-value {
      font-size: 0.8rem;
      margin-top: 0.5rem;
      text-align: left;
    }
  }
  .layout-scroll-area {
    height: calc(100% - 115px);
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
