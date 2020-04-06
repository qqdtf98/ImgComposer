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
          @click="selectProject(i)"
        >
          {{ project.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from '@vue/composition-api'
import Spinner from '@/components/global/Spinner.vue'

export default {
  components: { Spinner },
  setup(props, { root: { $router: router } }) {
    const state = reactive({
      projects: [
        {
          name: 'My Project',
        },
        {
          name: `Sungmin's Project`,
        },
        {
          name: 'Untitled',
        },
      ],
      isLoading: false,
    })

    function selectProject(projectId: number) {
      router.push({
        path: 'editor',
        query: {
          projectId: projectId.toString(),
        },
      })
    }

    onMounted(() => {
      state.isLoading = true

      // TODO: Load projects from the server

      setTimeout(() => {
        state.isLoading = false
      }, 1000)
    })

    return {
      state,
      selectProject,
    }
  },
}
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

.ae-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .projects-list {
    padding: 20px;
    border-radius: 10px;
    background-color: $ae-black;
    width: 100%;
    max-width: 400px;

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header {
      font-size: 40px;
      color: $ae-white;
      margin-bottom: 20px;
    }

    .separator {
      border-color: $ae-dark;
      border-width: 1px;
      margin: 5px 0;
    }

    .project-item {
      color: $ae-white;
      font-size: 15px;
      font-weight: 700;
      user-select: none;
      padding: 0 10px;
      height: 28px;
      margin: 0 -10px;
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 200ms ease;
      display: flex;
      align-items: center;
      line-height: 1;

      i {
        margin-right: 5px;
      }

      &:hover {
        background-color: $ae-blue;
      }
    }
  }
}
</style>
