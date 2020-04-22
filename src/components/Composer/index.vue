<template>
  <div>
    <div @click="htmlMode">html</div>
    <div @click="imgMode">img</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(...args) {
    const router = args[1].root.$router
    function htmlMode() {
      router.push({
        path: 'composer/html',
      })
    }
    function imgMode() {
      router.push({
        path: 'composer/img',
      })
    }

    return {
      htmlMode,
      imgMode,
    }
  },
})
</script>
