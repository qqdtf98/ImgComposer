<template>
  <div class="ae-hero">
    <div class="projects-list">
      <h1 class="header">Projects</h1>

      <div v-if="state.isLoading" class="loading">
        <spinner />
      </div>

      <div v-else>
        <div class="project-item new"><i class="icon-plus" /> 새 프로젝트</div>

        <!-- Separator between new project and existing projects list -->
        <hr v-if="state.projects.length > 0" class="separator" />

        <div
          v-for="(project, i) in state.projects"
          :key="i"
          class="project-item"
          @click="selectProject(project.seq)"
        >
          {{ project.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, defineComponent } from '@vue/composition-api'
import Spinner from '@/components/global/Spinner.vue'
import ProjectServcie from '@/services/project-service'

export default defineComponent({
  components: { Spinner },
  // setup(props, { root: { $router: router } }) {
  setup(...args) {
    const router = args[1].root.$router

    type Title = {
      seq: number
      title: string
    }

    const state: {
      projects: Title[]
      isLoading: boolean
    } = reactive({
      projects: [],
      isLoading: false,
    })

    function selectProject(projectId: number) {
      router.push({
        path: '/editor',
        query: {
          projectId: projectId.toString(),
        },
      })
    }

    onMounted(() => {
      state.isLoading = true

      // Project list 받아오기
      ProjectServcie.getProjectList().then((res) => {
        if (res.data.responseCode === 'SUCCESS') {
          let i
          state.projects = []
          for (i = 0; i < res.data.data.length; i++) {
            const title: Title = {
              seq: res.data.data[i].project_seq,
              title: res.data.data[i].project_name,
            }
            state.projects.push(title)
          }
        }
      })

      setTimeout(() => {
        state.isLoading = false
      }, 1000)
    })

    return {
      state,
      selectProject,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

.ae-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .projects-list {
    @include auto-distinct-bg-color;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header {
      font-size: 40px;
      margin-bottom: 20px;
    }

    .separator {
      border-color: $ae-dark;
      border-width: 1px;
      margin: 5px 0;
    }

    .project-item {
      font-size: 15px;
      user-select: none;
      padding: 0 10px;
      height: 28px;
      letter-spacing: 0.8px;
      margin: 0 -10px;
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 200ms ease, color 200ms ease;
      display: flex;
      align-items: center;
      line-height: 1;

      i {
        margin-right: 5px;
      }

      &:hover {
        @include auto-blue-color;
      }
    }
  }
}
</style>
