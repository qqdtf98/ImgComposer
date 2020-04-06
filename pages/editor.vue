<template>
  <editor />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Editor from '@/components/Editor/index.vue'

export default defineComponent({
  components: { Editor },
  setup(...args) {
    const route = args[1].root.$route
    const router = args[1].root.$router

    // Extract project ID from the URL query
    const { projectId } = route.query

    if (process.client) {
      if (projectId === undefined) {
        alert('프로젝트가 선택되지 않았습니다.')
        router.replace({ path: '/' })
      }
    }

    return {}
  },
})
</script>
