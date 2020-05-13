<template>
  <div class="data-transfer-wrapper">
    <div class="left-data">
      <div
        class="component-name"
        :style="{
          color: transferData.startCompo.color,
        }"
      >
        {{ transferData.startCompo.compoName }}
      </div>
    </div>
    <img class="center-arrow" src="@/assets/images/arrow.svg" />
    <div class="right-data">
      <div
        class="component-name"
        :style="{
          color: transferData.endCompo.color,
        }"
      >
        {{ transferData.endCompo.compoName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { DataTransfer } from '@/interfaces/any-editor-file.ts'

export default defineComponent({
  props: {
    transferData: Object,
  },
  setup(props) {
    const { transferData } = props as {
      transferData: DataTransfer
    }
    if (!transferData.startCompo) return
    console.log(transferData.startCompo)
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;
@use '@/assets/styles/component-composer/common-styles.scss' as *;

.data-transfer-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-top: 10px;
  width: 100%;

  .left-data,
  .right-data {
    display: flex;
    flex-direction: row;
    @include tip-style;
    align-items: center;
    height: 32px;
    cursor: pointer;

    .component-name {
      font-family: inherit;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-weight: 600;
      font-size: 13px;
      user-select: none;
    }
  }

  .center-arrow {
    margin-right: 12px;
    margin-left: 12px;
  }
}
</style>
