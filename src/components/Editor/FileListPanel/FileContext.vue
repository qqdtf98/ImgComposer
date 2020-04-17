<template>
  <div id="file-context">
    <div class="delete-file-menu" @click="deleteFile">
      <img class="delete-file-icon" src="@/assets/images/deleteFile.svg" />
      <div class="delete-file-text">삭제</div>
    </div>
    <div class="rename-file-menu" @click="renameFile">
      <img class="rename-file-icon" src="@/assets/images/renameFile.svg" />
      <div class="rename-file-text">이름 변경</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from '@vue/composition-api'
import FileService from '@/services/file-service.ts'
import { useVuex } from '@/modules/vue-hooks'

export default defineComponent({
  props: {
    fileId: {
      type: Number,
    },
    closeFileContext: {
      type: Function,
    },
    fileElem: {
      type: HTMLInputElement,
    },
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    function deleteFile() {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return
      }
      if (!props.fileId) return
      FileService.deleteFile(props.fileId).then((res) => {
        if (res.data.responseCode === 'SUCCESS') {
          if (props.closeFileContext) {
            props.closeFileContext()
            if (!props.fileId) return
            vuex.fileData.removeFile(props.fileId)
          }
        }
      })
    }

    function renameFile() {
      ctx.emit('enable-write')
    }

    return {
      deleteFile,
      renameFile,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#file-context {
  @include auto-bg-color;
  position: fixed;
  border-radius: 0.3rem;
  .delete-file-menu,
  .rename-file-menu {
    width: 110px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    &:hover {
      background-color: #525252bd;
      border-radius: 0.3rem;
    }

    .delete-file-icon,
    .rename-file-icon {
      margin-right: 0.5rem;
      width: 17px;
      user-select: none;
    }
    .delete-file-text,
    .rename-file-text {
      font-size: 0.9rem;
      cursor: default;
    }
    .delete-file-text {
      color: red;
    }
  }
  .rename-file-menu {
    border-top: 1px solid black;
  }
}
</style>
