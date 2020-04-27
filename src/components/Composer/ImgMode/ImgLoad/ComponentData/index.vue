<template>
  <div class="component-data-box">
    <div
      class="identifier-wrapper"
      :style="{
        left: identifier.left + 'px',
        top: identifier.top + 'px',
      }"
    >
      <Identifier
        class="component-identifier"
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + 'px',
          width: identifier.width + 'px',
          height: identifier.height + 'px',
          border: `2px solid ${identifier.color}`,
          backgroundColor: identifier.color + '38',
        }"
      />
      <IdData
        v-if="identifier.state"
        class="component-data"
        :style="{
          left: identifier.left + 'px',
          top: identifier.top + identifier.height + 'px',
        }"
        @set-color="setColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import { IdentifierType } from '@/interfaces/any-editor-file.ts'
import IdData from '@/components/Composer/ImgMode/ImgLoad/ComponentData/IdData/index.vue'
import Identifier from '@/components/Composer/ImgMode/ImgLoad/ComponentData/Identifier.vue'

export default defineComponent({
  components: { Identifier, IdData },
  props: {
    identifier: Object,
  },
  setup(props, ctx) {
    // TODO 컴포넌트 이름을 입력하지 않거나 size에 따라 생성한 identifier 삭제하기
    const { identifier } = props as {
      identifier: IdentifierType
    }

    provide('identifierIndex', identifier.index)

    function setColor(color: string) {
      ctx.emit('set-color', color)
    }

    return {
      setColor,
    }
  },
})
</script>

<style lang="scss">
.component-data-box {
  .identifier-wrapper {
    position: fixed;

    .component-identifier {
      border: 2px solid black;
      position: fixed;
      background-color: #00000066;
      border-radius: 0.4rem;
    }
    .component-data {
      position: fixed;
    }
  }
}
</style>
