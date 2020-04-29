<template>
  <div class="vuex-store">
    <h1>Vuex Store</h1>

    <div class="section">
      <h2 class="header">state</h2>
      <textarea class="input"></textarea>
    </div>
    <div class="section">
      <h2 class="header">mutations</h2>
      <textarea class="input"></textarea>
    </div>
    <div class="section">
      <h2 class="header">actions</h2>
      <textarea class="input"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style lang="scss">
@use '@/assets/styles/component-composer/common-styles' as *;

.vuex-store {
  h1 {
    font-size: 17px;
    font-weight: 500;
  }

  .section {
    margin-top: 10px;

    .header {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .input {
      border: 1px solid #ababab;
      border-radius: 5px;
      padding: 10px;
      font-size: 13px;
      resize: none;
      width: 100%;
    }
  }
}
</style>
