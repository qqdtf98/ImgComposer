<template>
  <div>
    <menu-bar />
    <styles-panel />
    <studio-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import MenuBar from './MenuBar/index.vue'
import StylesPanel from './StylesPanel/index.vue'
import StudioPanel from './StudioPanel/index.vue'
import ProjectService from '@/services/project-service'

export default defineComponent({
  components: { MenuBar, StylesPanel, StudioPanel },
  props: {
    projectId: Number,
  },
  setup(props) {
    onMounted(() => {
      ProjectService.getProjectData(props.projectId).then((res) => {
        if (res.data.responseCode === 'SUCCESS') {
          // TODO set project data at store
        }
      })
    })
    return {}
  },
})
</script>
