<template>
  <div class="arrow-wrapper">
    <div class="arrow-top"></div>
    <div class="arrow-center"></div>
    <div class="arrow-bottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.arrow-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  position: fixed;
  .arrow-center {
    width: 100%;
    height: 7px;
    background-color: violet;
  }
  .arrow-top {
    position: absolute;
    height: 5px;
    width: 20px;
    right: 0;
    top: 0;
    background-color: violet;
    transform: rotate(45deg) translateX(30%);
  }
  .arrow-bottom {
    position: absolute;
    height: 5px;
    width: 20px;
    right: 0;
    bottom: 0;
    background-color: violet;
    transform: rotate(135deg) translateX(-30%);
  }
}
</style>
