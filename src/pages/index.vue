<template>
  <home />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Home from '@/components/Home/index.vue'

export default defineComponent({
  components: { Home },
})
</script>
