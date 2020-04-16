<template>
  <div id="file-list">
    <div class="file-path">
      Root >
    </div>
    <div class="project-data-list">
      <div
        v-for="(file, i) in vuex.fileData.fileList"
        :key="i"
        class="project-data-wrapper"
      >
        <img class="project-icon" src="@/assets/images/fileIcon.svg" />
        <div class="project-data">
          {{ `${file.fileName}.${file.fileType}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { useVuex } from '../../../modules/vue-hooks'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    return {
      vuex,
    }
  },
})
</script>

<style lang="scss">
#file-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 45px;

  .file-path {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    background-color: #4d4d4d;
    padding: 0.3rem;
    padding-right: 0.45rem;
    padding-left: 0.45rem;
    width: 85%;
    border-radius: 0.3rem;
    font-size: 0.95rem;
  }

  .project-data-list {
    width: 85%;

    .project-data-wrapper {
      display: flex;
      flex-direction: row;
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;

      .project-icon {
        margin-right: 0.5rem;
      }

      .project-data {
        width: 100%;
      }
    }
  }
}
</style>
