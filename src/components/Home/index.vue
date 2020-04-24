<template>
  <div id="main-select">
    <div class="editor-select">
      <div class="editor-mode" @click="htmlEditMode">
        <div class="icon-wrapper">
          <img class="icon editor-icon" src="@/assets/images/editor.svg" />
        </div>
        <div class="editor-mode-text">Editor</div>
      </div>
    </div>
    <div class="composer-select">
      <div class="composer-mode" @click="componentDesignMode">
        <div class="icon-wrapper">
          <img class="icon composer-icon" src="@/assets/images/composer.svg" />
        </div>
        <div class="composer-mode-text">Composer</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(...args) {
    const router = args[1].root.$router
    function htmlEditMode() {
      router.push({
        path: '/editor/project',
      })
    }

    function componentDesignMode() {
      router.push({
        path: '/composer',
      })
    }

    return {
      htmlEditMode,
      componentDesignMode,
    }
  },
})
</script>

<style lang="scss">
#main-select {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  .editor-select,
  .composer-select {
    height: 100%;
    width: 50%;
    background-color: #3a3a3c;
    display: flex;
    align-items: center;
    justify-content: center;

    .editor-mode,
    .composer-mode {
      transform: scale(1);
      transition: transform 150ms ease;

      &:hover {
        transform: scale(1.05);
      }

      .icon-wrapper {
        height: 140px;
        display: flex;
        align-items: center;

        .icon {
          height: 140px;

          &.editor-icon {
            height: 108px;
          }
        }
      }

      .editor-mode-text,
      .composer-mode-text {
        color: #fff;
        text-align: center;
        font-weight: bold;
        font-size: 2rem;
        margin-top: 2.5rem;
      }
    }
  }
  .composer-select {
    background-color: #fff;

    .composer-mode {
      .composer-mode-text {
        color: #3a3a3c;
      }
    }
  }
}
</style>
