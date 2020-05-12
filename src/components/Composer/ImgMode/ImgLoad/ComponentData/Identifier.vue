<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { IdentifierType } from '@/interfaces/any-editor-file.ts'
import { useVuex } from '../../../../../modules/vue-hooks'

export default defineComponent({
  props: {
    identifier: Object,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    const { identifier } = props as {
      identifier: IdentifierType
    }

    return {}
  },
})
</script>

<style lang="scss" scoped>
.left-top,
.right-top,
.left-bottom,
.right-bottom {
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  background-color: black;
  border-radius: 2px;
  transform: translateX(-50%) translateY(-50%);
  cursor: pointer;
}
.left-top {
  left: 0;
  top: 0;
}
.right-top {
  right: 0;
  top: 0;
}
.left-bottom {
  left: 0;
  bottom: 0;
}
.right-bottom {
  right: 0;
  bottom: 0;
}
</style>
