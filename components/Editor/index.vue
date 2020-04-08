<template>
  <div>
    <menu-bar />
    <sandbox />
    <styles-panel />
  </div>
</template>

<script lang="ts">
import MenuBar from './MenuBar/index.vue'
import StylesPanel from './StylesPanel/index.vue'
import Sandbox from '@/components/Editor/Sandbox/index.vue'

export default {
  components: { MenuBar, StylesPanel, Sandbox },
  setup() {
    return {}
  },
}
</script>
