<template>
  <div id="ae-menu-bar">
    <div class="ae-mb-item app-title">
      <span class="menu-label">Any Editor</span>
    </div>

    <!-- Render menus -->
    <div
      v-for="(menu, i) in menus"
      :key="i"
      :class="`${menuItemClassName}${i === menuState.current ? ' active' : ''}`"
    >
      <span
        class="menu-label"
        @click="setCurrent(i)"
        @mouseover="mouseoverHandler(i)"
        >{{ menu.label }}</span
      >
      <div :class="subMenusContainerClassName">
        <div v-for="(subMenu, j) in menu.subMenus" :key="j" class="submenu">
          <label class="submenu-name">{{ subMenu.name }}</label>
          <label v-if="subMenu.shortcut" class="submenu-shortcut">{{
            subMenu.shortcut
          }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  onMounted,
  watch,
  defineComponent,
} from '@vue/composition-api'
import { isOutside } from '@/modules/is-outside'
import { classify } from '@/modules/classify'

export default defineComponent({
  setup() {
    const menus = [
      {
        label: '파일',
        subMenus: [
          { name: '새로 만들기', shortcut: 'N' },
          {
            name: '열기',
            shortcut: 'O',
          },
        ],
      },
      {
        label: '편집',
        subMenus: [
          {
            name: '복사하기',
            shortcut: 'C',
          },
          {
            name: '붙여넣기',
            shortcut: 'V',
          },
        ],
      },
    ]
    const menuItemClassName = 'ae-mb-item'
    const subMenusContainerClassName = 'submenus-container'

    const menuState: {
      current: number | null // Currently clicked menu index
    } = reactive({
      current: null,
    })

    function setCurrent(index: number | null) {
      if (menuState.current === index) {
        // When click active menu again
        menuState.current = null
      } else {
        // Set current menu index with the clicked one
        menuState.current = index
      }
    }

    function mouseoverHandler(index: number): void {
      if (menuState.current === null || menuState.current === index) return
      setCurrent(index)
    }

    onMounted(() => {
      // Process on the client side (onMounted)

      /**
       * Close menu when press `ESC`
       */
      function inactiveMenuOnKeydownHandler(e: KeyboardEvent): void {
        if (e.key === 'Escape') {
          setCurrent(null)
        }
      }

      /**
       * Close menu when click outside the performable menus
       */
      function inactiveMenuOnMouseDownHandler(e: MouseEvent): void {
        if (e.target === window) {
          setCurrent(null)
          return
        }

        if (!(e.target instanceof HTMLElement)) {
          return
        }

        if (
          isOutside(
            e.target,
            classify([menuItemClassName, subMenusContainerClassName])
          )
        ) {
          setCurrent(null)
        }
      }

      // Watch current menu state changes,
      // attach or detach menu close handlers for better performance
      watch(
        () => menuState.current,
        (current) => {
          if (current === null) {
            window.removeEventListener(
              'mousedown',
              inactiveMenuOnMouseDownHandler
            )
            window.removeEventListener('keydown', inactiveMenuOnKeydownHandler)
          } else {
            window.addEventListener('mousedown', inactiveMenuOnMouseDownHandler)
            window.addEventListener('keydown', inactiveMenuOnKeydownHandler)
          }
        }
      )
    })

    // Return variables to be used inside the template
    return {
      // Class names
      menuItemClassName,
      subMenusContainerClassName,
      // Constants
      menus,
      // States
      menuState,
      // Functions
      setCurrent,
      mouseoverHandler,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

$label-font-size: 14px;
$label-padding: 12px;

#ae-menu-bar {
  height: $menu-bar-height;
  border-bottom: 1px solid;
  @include auto-border-color;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;

  .ae-mb-item {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @include auto-text-color;
    font-size: $label-font-size;
    user-select: none;

    &.app-title {
      font-weight: 700;
    }

    .menu-label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0 $label-padding;
    }

    &:hover {
    }

    &.active {
      .menu-label {
        @include auto-blue-color;
      }
    }

    &.active .submenus-container {
      display: block;
    }
    .submenus-container {
      z-index: 9999;
      position: absolute;
      left: 0;
      top: calc(100% + 1px);
      white-space: nowrap;
      display: none;
      padding: 5px 0;
      border-radius: 0 0 5px 5px;
      @include auto-distinct-bg-color;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

      .submenu {
        padding: 0 $label-padding;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: $label-font-size;

        .submenu-name,
        .submenu-shortcut {
          line-height: 1;
        }

        .submenu-shortcut {
          margin-left: 20px;
          text-align: right;
        }

        &:hover {
          @include auto-blue-color;
        }
      }
    }
  }
}
</style>
