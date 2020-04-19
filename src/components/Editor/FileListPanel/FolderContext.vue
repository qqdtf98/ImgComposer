<template>
  <div id="folder-context">
    <div class="new-folder-menu">
      <img class="new-folder-icon" src="@/assets/images/newFolder.svg" />
      <div class="new-folder-text">새 폴더</div>
    </div>
    <div class="new-file-menu">
      <img class="new-file-icon" src="@/assets/images/newFile.svg" />
      <div class="new-file-text">새 파일</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#folder-context {
  @include auto-bg-color;
  position: fixed;
  border-radius: 0.3rem;
  .new-folder-menu,
  .new-file-menu {
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

    .new-folder-icon,
    .new-file-icon {
      margin-right: 0.5rem;
      width: 17px;
      user-select: none;
    }
    .new-folder-text,
    .new-file-text {
      font-size: 0.9rem;
      cursor: default;
    }
  }
  .new-file-menu {
    border-top: 1px solid black;
  }
}
</style>
