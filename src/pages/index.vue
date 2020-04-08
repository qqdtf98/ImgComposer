<template>
  <hero />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Hero from '@/components/hero/Hero.vue'

export default defineComponent({
  components: { Hero },
})
</script>
