<template>
  <div>
    <menu-bar />
    <styles-panel />
  </div>
</template>

<script lang="ts">
import MenuBar from './MenuBar/index.vue'
import StylesPanel from './StylesPanel/index.vue'

export default {
  components: { MenuBar, StylesPanel },
  setup() {
    return {}
  },
}
</script>
