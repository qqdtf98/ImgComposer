<template>
  <Composer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Composer from '@/components/Composer/index.vue'

export default defineComponent({
  components: { Composer },
})
</script>
