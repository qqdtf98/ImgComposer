<template>
  <div>
    <MenuBar />
    <Tabs />
    <Canvas />
    <StylesPanel />
    <StudioPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import MenuBar from './MenuBar/index.vue'
import Canvas from './Canvas/index.vue'
import Tabs from './Tabs/index.vue'
import StylesPanel from './StylesPanel/index.vue'
import StudioPanel from './StudioPanel/index.vue'
import ProjectService from '@/services/project-service'

export default defineComponent({
  components: { MenuBar, Canvas, Tabs, StylesPanel, StudioPanel },
  props: {
    projectId: Number,
  },
  setup(props) {
    onMounted(() => {
      const { projectId } = props

      if (!projectId) {
        alert('프로젝트 ID가 없습니다.')
        return
      }

      ProjectService.getProjectData(projectId).then((res) => {
        if (res.data.responseCode === 'SUCCESS') {
          // TODO set project data at store
        }
      })
    })
    return {}
  },
})
</script>
