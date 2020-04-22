<template>
  <div>
    <div @click="htmlEditMode">HTML 편집</div>
    <div @click="componentDesignMode">컴포넌트 설계</div>
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
