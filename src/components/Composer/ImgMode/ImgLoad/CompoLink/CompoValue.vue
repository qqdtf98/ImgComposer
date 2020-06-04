<template>
  <div class="link-list-box">
    <input
      ref="keyRef"
      placeholder="key"
      :value="linkData.key"
      class="link-key"
    />
    <input
      ref="valueRef"
      placeholder="value"
      :value="linkData.value"
      class="link-value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

export default defineComponent({
  props: {
    linkData: Object,
  },
  setup(props, ctx) {
    const { linkData } = props as {
      linkData: {
        key: string
        value: string
      }[]
    }

    const keyRef = ref<HTMLInputElement>(null)
    const valueRef = ref<HTMLInputElement>(null)

    // query, params의 key,value 저장
    onMounted(() => {
      if (!keyRef.value) return
      keyRef.value.addEventListener('blur', () => {
        ctx.emit('set-key', keyRef.value?.value)
      })
      if (!valueRef.value) return
      valueRef.value.addEventListener('blur', () => {
        ctx.emit('set-value', valueRef.value?.value)
      })
    })

    return {
      keyRef,
      valueRef,
    }
  },
})
</script>

<style lang="scss">
.link-list-box {
  border: 1px solid #ababab;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  height: 2.5rem;

  .link-key,
  .link-value {
    width: 50%;
    font-size: 17px;
  }

  .link-key {
    border-right: 1px solid #ababab;
  }

  .link-value {
    padding-left: 10px;
  }
}
</style>
