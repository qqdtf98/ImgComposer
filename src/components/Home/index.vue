<template>
  <div id="main-select">
    <div class="editor-select">
      <div class="editor-mode" @click="composerMode">
        <div class="icon-wrapper">
          <img class="icon editor-icon" src="@/assets/images/composer.svg" />
        </div>
        <div class="editor-mode-text">Composer</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(...args) {
    const router = args[1].root.$router
    function composerMode() {
      router.push({
        path: '/composer',
      })
    }

    return {
      composerMode,
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

  .editor-select {
    height: 100%;
    width: 100%;
    background-color: #3a3a3c;
    display: flex;
    align-items: center;
    justify-content: center;

    .editor-mode {
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
