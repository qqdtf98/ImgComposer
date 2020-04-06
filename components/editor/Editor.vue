<template>
  <div>
    <menu-bar />
    <styles-panel />
  </div>
</template>

<script lang="ts">
import MenuBar from './menu-bar/MenuBar.vue'
import StylesPanel from './styles-panel/StylelsPanel.vue'

export default {
  components: { MenuBar, StylesPanel },
  setup() {
    return {}
  },
}
</script>
