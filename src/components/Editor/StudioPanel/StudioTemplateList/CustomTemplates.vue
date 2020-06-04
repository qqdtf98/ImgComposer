<template>
  <div id="basic-template">
    <TemplateCompo
      v-for="(template, i) in vuex.templates.customTemplates"
      :key="i"
      :template="template"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '../../../../modules/vue-hooks'
import TemplateCompo from './TemplateCompo.vue'

export default defineComponent({
  components: { TemplateCompo },
  setup(props, ctx) {
    const vuex = useVuex(ctx)

    return {
      vuex,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#basic-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
