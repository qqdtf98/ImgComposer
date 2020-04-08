<template>
  <editor :project-id="projectId" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useRoute, useRouter } from '../modules/vue-hooks'
import Editor from '@/components/Editor/index.vue'

export default defineComponent({
  components: { Editor },
  setup(...args) {
    const ctx = args[1]
    const route = useRoute(ctx)
    const router = useRouter(ctx)

    // Extract project ID from the URL query
    const projectId = Number(route.query.projectId)

    if (process.client) {
      if (!projectId) {
        alert('프로젝트가 선택되지 않았습니다.')
        router.replace({ path: '/' })
      }
    }

    return {
      projectId,
    }
  },
})
</script>
